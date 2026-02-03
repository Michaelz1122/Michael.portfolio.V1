import PortfolioPage from '@/components/PortfolioPage';
import type { ContentBlock } from '@/lib/content-engine';
import { getPublishedSiteSectionByKey } from '@/lib/content-engine';

export default async function HomePage() {
  const siteSection = await getPublishedSiteSectionByKey('homepage');
  const blocks = (siteSection?.publishedPointer?.siteSectionVersion?.blocks ?? []) as ContentBlock[];

  return <PortfolioPage siteSectionBlocks={blocks} />;
}
