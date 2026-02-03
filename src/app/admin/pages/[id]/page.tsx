import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

import ContentEditor from '@/components/admin/ContentEditor';
import type { ContentBlock } from '@/lib/content-engine';
import { ensureDraftPageVersion, parseBlocks } from '@/lib/content-engine';
import { db } from '@/lib/db';

export default async function AdminPageEditor({ params }: { params: { id: string } }) {
  const page = await db.page.findUnique({
    where: { id: params.id },
    include: { publishedPointer: true },
  });

  if (!page) {
    notFound();
  }

  const draft = await ensureDraftPageVersion(page.id);

  const saveDraftAction = async (formData: FormData) => {
    'use server';

    const rawBlocks = String(formData.get('blocks') ?? '');
    const { blocks, error } = parseBlocks(rawBlocks);

    if (error) {
      return { message: error };
    }

    await db.pageVersion.update({
      where: { id: draft.id },
      data: { blocks },
    });

    revalidatePath(`/admin/pages/${page.id}`);
    return { message: 'Draft saved.' };
  };

  const publishAction = async (formData: FormData) => {
    'use server';

    const rawBlocks = String(formData.get('blocks') ?? '');
    const { blocks, error } = parseBlocks(rawBlocks);

    if (error) {
      return { message: error };
    }

    const publishedVersion = await db.pageVersion.update({
      where: { id: draft.id },
      data: {
        blocks,
        status: 'PUBLISHED',
      },
    });

    await db.publishedPointer.upsert({
      where: { pageId: page.id },
      update: { pageVersionId: publishedVersion.id },
      create: { pageId: page.id, pageVersionId: publishedVersion.id },
    });

    revalidatePath(`/p/${page.slug}`);
    revalidatePath(`/admin/pages/${page.id}`);
    return { message: 'Page published.' };
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col gap-8 px-6 py-12">
      <ContentEditor
        title={`Edit ${page.title}`}
        description={`Slug: /${page.slug}`}
        initialBlocks={(draft.blocks ?? []) as ContentBlock[]}
        saveDraftAction={saveDraftAction}
        publishAction={publishAction}
      />
    </div>
  );
}
