import { PublishStatus } from '@prisma/client';

import { db } from '@/lib/db';

export type ContentBlockType =
  | 'Hero'
  | 'Benefits'
  | 'SocialProof'
  | 'Steps'
  | 'FAQ'
  | 'Pricing'
  | 'Form'
  | 'FooterCTA';

export type ContentBlock = {
  type: ContentBlockType;
  data?: Record<string, unknown>;
};

export const defaultPageBlocks: ContentBlock[] = [
  {
    type: 'Hero',
    data: {
      eyebrow: 'Featured',
      heading: 'Add a headline that converts',
      subheading: 'Summarize the key value visitors get from this page.',
      primaryCta: 'Primary CTA',
      secondaryCta: 'Secondary CTA',
    },
  },
  {
    type: 'Benefits',
    data: {
      heading: 'Benefits that matter',
      subheading: 'Share the outcomes your customers care about.',
      items: [
        { title: 'Benefit one', description: 'Describe the first benefit.' },
        { title: 'Benefit two', description: 'Describe the second benefit.' },
        { title: 'Benefit three', description: 'Describe the third benefit.' },
      ],
    },
  },
  {
    type: 'SocialProof',
    data: {
      heading: 'Trusted by growing teams',
      testimonials: [
        { quote: 'Share a standout customer result here.', name: 'Customer name' },
        { quote: 'Highlight another success story.', name: 'Customer name' },
      ],
    },
  },
  {
    type: 'Steps',
    data: {
      heading: 'How it works',
      steps: [
        { title: 'Step one', description: 'Explain the first step.' },
        { title: 'Step two', description: 'Explain the next step.' },
        { title: 'Step three', description: 'Explain the final step.' },
      ],
    },
  },
  {
    type: 'FAQ',
    data: {
      heading: 'Frequently asked questions',
      items: [
        { question: 'Add a question', answer: 'Add the answer.' },
        { question: 'Add another question', answer: 'Add the answer.' },
      ],
    },
  },
  {
    type: 'Pricing',
    data: {
      heading: 'Pricing plans',
      plans: [
        { name: 'Starter', price: '$99', description: 'Good for starting.' },
        { name: 'Growth', price: '$199', description: 'Scale with confidence.' },
        { name: 'Enterprise', price: 'Custom', description: 'Tailored for teams.' },
      ],
    },
  },
  {
    type: 'Form',
    data: {
      heading: 'Start the conversation',
      subheading: 'Collect leads and inquiries in one place.',
      submitLabel: 'Submit',
    },
  },
  {
    type: 'FooterCTA',
    data: {
      heading: 'Ready to get started?',
      subheading: 'Add a final call to action for visitors.',
      cta: 'Book a call',
    },
  },
];

export const defaultSiteBlocks: ContentBlock[] = [
  {
    type: 'Benefits',
    data: {
      heading: 'Homepage highlights',
      subheading: 'Use this section to highlight achievements or portfolio wins.',
      items: [
        { title: 'Achievement one', description: 'Add a short stat or win.' },
        { title: 'Achievement two', description: 'Add a short stat or win.' },
        { title: 'Achievement three', description: 'Add a short stat or win.' },
      ],
    },
  },
];

export const allowedBlockTypes: ContentBlockType[] = [
  'Hero',
  'Benefits',
  'SocialProof',
  'Steps',
  'FAQ',
  'Pricing',
  'Form',
  'FooterCTA',
];

export function parseBlocks(raw: string): { blocks: ContentBlock[]; error?: string } {
  if (!raw.trim()) {
    return { blocks: [] };
  }

  try {
    const parsed = JSON.parse(raw) as ContentBlock[];
    if (!Array.isArray(parsed)) {
      return { blocks: [], error: 'Blocks JSON must be an array.' };
    }

    const sanitized = parsed.map((block) => ({
      type: allowedBlockTypes.includes(block.type) ? block.type : 'Hero',
      data: block.data ?? {},
    }));

    return { blocks: sanitized };
  } catch (error) {
    return { blocks: [], error: 'Blocks JSON is invalid.' };
  }
}

export async function getPublishedPageBySlug(slug: string) {
  return db.page.findUnique({
    where: { slug },
    include: {
      publishedPointer: {
        include: {
          pageVersion: true,
        },
      },
    },
  });
}

export async function getPublishedSiteSectionByKey(key: string) {
  return db.siteSection.findUnique({
    where: { key },
    include: {
      publishedPointer: {
        include: {
          siteSectionVersion: true,
        },
      },
    },
  });
}

export async function ensureDraftPageVersion(pageId: string) {
  const existingDraft = await db.pageVersion.findFirst({
    where: { pageId, status: PublishStatus.DRAFT },
    orderBy: { updatedAt: 'desc' },
  });

  if (existingDraft) {
    return existingDraft;
  }

  const published = await db.publishedPointer.findUnique({
    where: { pageId },
    include: { pageVersion: true },
  });

  return db.pageVersion.create({
    data: {
      pageId,
      status: PublishStatus.DRAFT,
      blocks: published?.pageVersion.blocks ?? defaultPageBlocks,
    },
  });
}

export async function ensureDraftSiteSectionVersion(siteSectionId: string) {
  const existingDraft = await db.siteSectionVersion.findFirst({
    where: { siteSectionId, status: PublishStatus.DRAFT },
    orderBy: { updatedAt: 'desc' },
  });

  if (existingDraft) {
    return existingDraft;
  }

  const published = await db.sitePublishedPointer.findUnique({
    where: { siteSectionId },
    include: { siteSectionVersion: true },
  });

  return db.siteSectionVersion.create({
    data: {
      siteSectionId,
      status: PublishStatus.DRAFT,
      blocks: published?.siteSectionVersion.blocks ?? defaultSiteBlocks,
    },
  });
}
