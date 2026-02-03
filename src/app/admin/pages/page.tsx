import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/db';
import { defaultPageBlocks } from '@/lib/content-engine';

async function createPage(formData: FormData) {
  'use server';

  const title = String(formData.get('title') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();

  if (!title || !slug) {
    return;
  }

  const page = await db.page.create({
    data: {
      title,
      slug,
      versions: {
        create: {
          blocks: defaultPageBlocks,
          status: 'DRAFT',
        },
      },
    },
  });

  redirect(`/admin/pages/${page.id}`);
}

export default async function AdminPagesList() {
  const pages = await db.page.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { publishedPointer: true },
  });

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col gap-8 px-6 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Pages</h1>
        <p className="text-sm text-muted-foreground">Create, edit, and publish landing pages.</p>
      </div>

      <form action={createPage} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Create new page</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Input name="title" placeholder="Page title" required />
          <Input name="slug" placeholder="slug-for-url" required />
        </div>
        <Button type="submit" className="w-fit">
          Create page
        </Button>
      </form>

      <div className="grid gap-4">
        {pages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pages yet.</p>
        ) : (
          pages.map((page) => (
            <div
              key={page.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{page.title}</p>
                <p className="text-sm text-muted-foreground">/{page.slug}</p>
                <p className="text-xs text-muted-foreground">
                  {page.publishedPointer ? 'Published' : 'Draft only'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href={`/admin/pages/${page.id}`}>Edit</Link>
                </Button>
                {page.publishedPointer ? (
                  <Button asChild>
                    <Link href={`/p/${page.slug}`} target="_blank">
                      View live
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
