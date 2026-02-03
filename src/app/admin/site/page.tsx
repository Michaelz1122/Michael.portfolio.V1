import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/db';
import { defaultSiteBlocks } from '@/lib/content-engine';

async function createSiteSection(formData: FormData) {
  'use server';

  const name = String(formData.get('name') ?? '').trim();
  const key = String(formData.get('key') ?? '').trim();

  if (!name || !key) {
    return;
  }

  const section = await db.siteSection.create({
    data: {
      name,
      key,
      versions: {
        create: {
          blocks: defaultSiteBlocks,
          status: 'DRAFT',
        },
      },
    },
  });

  redirect(`/admin/site/${section.id}`);
}

export default async function AdminSiteSections() {
  const sections = await db.siteSection.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { publishedPointer: true },
  });

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col gap-8 px-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Site sections</h1>
        <p className="text-sm text-muted-foreground">
          Control homepage sections like achievements, portfolio highlights, and other reusable blocks.
        </p>
      </div>

      <form action={createSiteSection} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Create new site section</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Input name="name" placeholder="Section name" required />
          <Input name="key" placeholder="homepage" required />
        </div>
        <Button type="submit" className="w-fit">
          Create section
        </Button>
      </form>

      <div className="grid gap-4">
        {sections.length === 0 ? (
          <p className="text-sm text-muted-foreground">No site sections yet.</p>
        ) : (
          sections.map((section) => (
            <div
              key={section.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{section.name}</p>
                <p className="text-sm text-muted-foreground">Key: {section.key}</p>
                <p className="text-xs text-muted-foreground">
                  {section.publishedPointer ? 'Published' : 'Draft only'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href={`/admin/site/${section.id}`}>Edit</Link>
                </Button>
                {section.publishedPointer && section.key === 'homepage' ? (
                  <Button asChild>
                    <Link href="/" target="_blank">
                      View homepage
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
