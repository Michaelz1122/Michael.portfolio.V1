import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

import ContentEditor from '@/components/admin/ContentEditor';
import type { ContentBlock } from '@/lib/content-engine';
import { ensureDraftSiteSectionVersion, parseBlocks } from '@/lib/content-engine';
import { db } from '@/lib/db';

export default async function AdminSiteSectionEditor({ params }: { params: { id: string } }) {
  const section = await db.siteSection.findUnique({
    where: { id: params.id },
    include: { publishedPointer: true },
  });

  if (!section) {
    notFound();
  }

  const draft = await ensureDraftSiteSectionVersion(section.id);

  const saveDraftAction = async (formData: FormData) => {
    'use server';

    const rawBlocks = String(formData.get('blocks') ?? '');
    const { blocks, error } = parseBlocks(rawBlocks);

    if (error) {
      return { message: error };
    }

    await db.siteSectionVersion.update({
      where: { id: draft.id },
      data: { blocks },
    });

    revalidatePath(`/admin/site/${section.id}`);
    return { message: 'Draft saved.' };
  };

  const publishAction = async (formData: FormData) => {
    'use server';

    const rawBlocks = String(formData.get('blocks') ?? '');
    const { blocks, error } = parseBlocks(rawBlocks);

    if (error) {
      return { message: error };
    }

    const publishedVersion = await db.siteSectionVersion.update({
      where: { id: draft.id },
      data: {
        blocks,
        status: 'PUBLISHED',
      },
    });

    await db.sitePublishedPointer.upsert({
      where: { siteSectionId: section.id },
      update: { siteSectionVersionId: publishedVersion.id },
      create: { siteSectionId: section.id, siteSectionVersionId: publishedVersion.id },
    });

    revalidatePath('/');
    revalidatePath(`/admin/site/${section.id}`);
    return { message: 'Site section published.' };
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col gap-8 px-6 py-12">
      <ContentEditor
        title={`Edit ${section.name}`}
        description={`Key: ${section.key}`}
        initialBlocks={(draft.blocks ?? []) as ContentBlock[]}
        saveDraftAction={saveDraftAction}
        publishAction={publishAction}
      />
    </div>
  );
}
