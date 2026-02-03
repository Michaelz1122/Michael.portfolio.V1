import { notFound } from 'next/navigation';

import ContentRenderer from '@/components/content/ContentRenderer';
import type { ContentBlock } from '@/lib/content-engine';
import { getPublishedPageBySlug } from '@/lib/content-engine';

export default async function PublishedPage({ params }: { params: { slug: string } }) {
  const page = await getPublishedPageBySlug(params.slug);
  const blocks = page?.publishedPointer?.pageVersion?.blocks as ContentBlock[] | undefined;

  if (!page || !blocks || blocks.length === 0) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <ContentRenderer blocks={blocks} />
      </div>
    </main>
  );
}
