'use client';

import { useMemo, useState } from 'react';

import ContentRenderer from '@/components/content/ContentRenderer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { ContentBlock } from '@/lib/content-engine';

const blockTypes = [
  'Hero',
  'Benefits',
  'SocialProof',
  'Steps',
  'FAQ',
  'Pricing',
  'Form',
  'FooterCTA',
];

type ContentEditorProps = {
  title: string;
  description?: string;
  initialBlocks: ContentBlock[];
  saveDraftAction: (formData: FormData) => Promise<{ message: string } | void>;
  publishAction: (formData: FormData) => Promise<{ message: string } | void>;
};

export default function ContentEditor({
  title,
  description,
  initialBlocks,
  saveDraftAction,
  publishAction,
}: ContentEditorProps) {
  const [blocksJson, setBlocksJson] = useState(() => JSON.stringify(initialBlocks, null, 2));

  const { blocks, error } = useMemo(() => {
    try {
      const parsed = JSON.parse(blocksJson);
      if (!Array.isArray(parsed)) {
        return { blocks: [] as ContentBlock[], error: 'Blocks JSON must be an array.' };
      }
      return { blocks: parsed as ContentBlock[], error: '' };
    } catch (err) {
      return { blocks: [] as ContentBlock[], error: 'Blocks JSON is invalid.' };
    }
  }, [blocksJson]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Allowed blocks:</span>
            {blockTypes.map((type) => (
              <span key={type} className="rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">
                {type}
              </span>
            ))}
          </div>
          <Textarea
            className="min-h-[280px] font-mono text-xs"
            value={blocksJson}
            onChange={(event) => setBlocksJson(event.target.value)}
          />
          {error ? <p className="text-sm text-red-500">{error}</p> : null}
          <form className="flex flex-wrap gap-3" action={saveDraftAction}>
            <input type="hidden" name="blocks" value={blocksJson} />
            <Button type="submit">Save draft</Button>
            <Button type="submit" formAction={publishAction} variant="default">
              Publish
            </Button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Draft preview</h2>
          <p className="text-sm text-muted-foreground">Preview the current draft blocks below.</p>
        </div>
        <ContentRenderer blocks={blocks} />
      </div>
    </div>
  );
}
