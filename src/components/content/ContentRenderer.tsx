'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ContentBlock } from '@/lib/content-engine';

const blockTitles: Record<string, string> = {
  Hero: 'Hero',
  Benefits: 'Benefits',
  SocialProof: 'Social proof',
  Steps: 'Steps',
  FAQ: 'FAQ',
  Pricing: 'Pricing',
  Form: 'Form',
  FooterCTA: 'Footer CTA',
};

export default function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
        No content blocks yet. Add blocks in the admin editor to publish content.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {blocks.map((block, index) => {
        const title = blockTitles[block.type] ?? block.type;
        const data = block.data ?? {};

        switch (block.type) {
          case 'Hero':
            return (
              <section
                key={`${block.type}-${index}`}
                className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-8 text-white shadow-xl"
              >
                <p className="text-sm uppercase tracking-wide text-blue-100">{data.eyebrow ?? 'Featured'}</p>
                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">{data.heading ?? 'Headline goes here'}</h2>
                <p className="mt-4 max-w-2xl text-base text-blue-100 md:text-lg">
                  {data.subheading ?? 'Add a strong value proposition for this hero section.'}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="bg-white text-blue-700 hover:bg-blue-50">
                    {data.primaryCta ?? 'Primary CTA'}
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/20">
                    {data.secondaryCta ?? 'Secondary CTA'}
                  </Button>
                </div>
              </section>
            );
          case 'Benefits':
            return (
              <section key={`${block.type}-${index}`} className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {data.heading ?? 'Benefits that deliver'}
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    {data.subheading ?? 'Highlight the value customers receive.'}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {(data.items ?? [{ title: 'Benefit one' }, { title: 'Benefit two' }, { title: 'Benefit three' }]).map(
                    (item: { title?: string; description?: string }, itemIndex: number) => (
                      <Card key={itemIndex} className="border border-slate-200 dark:border-slate-800">
                        <CardHeader>
                          <CardTitle className="text-lg">{item.title ?? 'Benefit title'}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                          {item.description ?? 'Describe the benefit in a sentence or two.'}
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </section>
            );
          case 'SocialProof':
            return (
              <section key={`${block.type}-${index}`} className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
                <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {data.heading ?? 'Trusted by teams that ship'}
                </h3>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {(data.testimonials ?? [
                    { quote: 'Add a testimonial here.', name: 'Client name' },
                    { quote: 'Another glowing review.', name: 'Client name' },
                  ]).map((item: { quote?: string; name?: string }, itemIndex: number) => (
                    <Card key={itemIndex} className="border border-slate-200 dark:border-slate-800">
                      <CardContent className="pt-6 text-sm text-slate-700 dark:text-slate-300">
                        <p>“{item.quote ?? 'Testimonial quote'}”</p>
                        <p className="mt-4 font-semibold text-slate-900 dark:text-slate-100">{item.name ?? 'Client'}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            );
          case 'Steps':
            return (
              <section key={`${block.type}-${index}`} className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {data.heading ?? 'How it works'}
                  </h3>
                </div>
                <ol className="grid gap-4 md:grid-cols-3">
                  {(data.steps ?? [
                    { title: 'Step one', description: 'Describe the first step.' },
                    { title: 'Step two', description: 'Describe the second step.' },
                    { title: 'Step three', description: 'Describe the third step.' },
                  ]).map((item: { title?: string; description?: string }, itemIndex: number) => (
                    <li key={itemIndex} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Step {itemIndex + 1}</p>
                      <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {item.title ?? 'Step title'}
                      </h4>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        {item.description ?? 'Step description'}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case 'FAQ':
            return (
              <section key={`${block.type}-${index}`} className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {data.heading ?? 'Frequently asked questions'}
                  </h3>
                </div>
                <div className="space-y-4">
                  {(data.items ?? [
                    { question: 'Question goes here', answer: 'Add the answer here.' },
                    { question: 'Another question', answer: 'Answer the question concisely.' },
                  ]).map((item: { question?: string; answer?: string }, itemIndex: number) => (
                    <Card key={itemIndex} className="border border-slate-200 dark:border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-base">{item.question ?? 'Question'}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-slate-600 dark:text-slate-300">
                        {item.answer ?? 'Answer'}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            );
          case 'Pricing':
            return (
              <section key={`${block.type}-${index}`} className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {data.heading ?? 'Pricing plans'}
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {(data.plans ?? [
                    { name: 'Starter', price: '$99', description: 'Good for starting out.' },
                    { name: 'Growth', price: '$199', description: 'Scale with confidence.' },
                    { name: 'Enterprise', price: 'Custom', description: 'Tailored for large teams.' },
                  ]).map(
                    (
                      plan: { name?: string; price?: string; description?: string; highlight?: boolean },
                      planIndex: number
                    ) => (
                      <Card
                        key={planIndex}
                        className={`border ${
                          plan.highlight
                            ? 'border-blue-500 shadow-lg shadow-blue-200 dark:shadow-blue-500/20'
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">{plan.name ?? 'Plan'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                            {plan.price ?? '$0'}
                          </p>
                          <p>{plan.description ?? 'Plan description'}</p>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </section>
            );
          case 'Form':
            return (
              <section key={`${block.type}-${index}`} className="rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
                <p className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {data.heading ?? 'Get in touch'}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {data.subheading ?? 'Collect leads or inquiries with this form block.'}
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                    disabled
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                    disabled
                  />
                  <textarea
                    placeholder="How can we help?"
                    className="md:col-span-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                    rows={4}
                    disabled
                  />
                  <Button className="md:col-span-2" disabled>
                    {data.submitLabel ?? 'Submit'}
                  </Button>
                </div>
              </section>
            );
          case 'FooterCTA':
            return (
              <section
                key={`${block.type}-${index}`}
                className="rounded-3xl bg-slate-900 p-8 text-white shadow-xl"
              >
                <p className="text-sm uppercase tracking-wide text-slate-300">{title}</p>
                <h3 className="mt-2 text-2xl font-semibold">{data.heading ?? 'Ready to start?'}</h3>
                <p className="mt-2 text-slate-300">
                  {data.subheading ?? 'Add a final call to action for visitors.'}
                </p>
                <Button className="mt-6 bg-white text-slate-900 hover:bg-slate-100">
                  {data.cta ?? 'Book a call'}
                </Button>
              </section>
            );
          default:
            return (
              <section key={`${block.type}-${index}`} className="rounded-2xl border border-dashed border-slate-300 p-6">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
                <pre className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </section>
            );
        }
      })}
    </div>
  );
}
