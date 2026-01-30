"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { translations } from "@/lib/translations";
import { inlineContent, useContentOverrides } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, ExternalLink, PencilLine, RefreshCcw, Search, Sparkles } from "lucide-react";

const isArrayValue = (value: string | string[]) => Array.isArray(value);

export default function DashboardPage(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const { overrides, updateOverride, clearOverride, resetOverrides } = useContentOverrides();

  const entries = useMemo(() => {
    const baseEntries = Object.entries({
      ...translations.en,
      ...inlineContent,
    });
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) {
      return baseEntries;
    }
    return baseEntries.filter(([key, value]) => {
      const valueText = Array.isArray(value) ? value.join(" ") : value;
      return (
        key.toLowerCase().includes(normalizedSearch) ||
        valueText.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                <Sparkles className="h-3.5 w-3.5" />
                Live Content Studio
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-white">Dashboard</h1>
              <p className="max-w-2xl text-sm text-slate-300">
                Control every English copy line instantly. Updates apply in real time to the live site and are stored locally
                for future visits.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="gap-2 rounded-full" variant="secondary">
                <Link href="/">
                  Open Website
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                className="gap-2 rounded-full border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                variant="outline"
                onClick={resetOverrides}
              >
                Reset All
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-200">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              Live edits enabled
            </div>
            <Badge variant="secondary" className="rounded-full bg-slate-800 text-slate-200">
              English only
            </Badge>
          </div>
        </header>

        <Card className="border-slate-800 bg-slate-900/70 text-slate-100 shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Content Controls</CardTitle>
                <CardDescription className="text-slate-400">
                  Search for any copy key and edit it instantly. Click reset to restore the default value.
                </CardDescription>
              </div>
              <div className="relative w-full max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by key or text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="border-slate-800 bg-slate-950 pl-9 text-slate-100 focus-visible:ring-emerald-500"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-3">
              <div className="space-y-6">
                {entries.map(([key, defaultValue]) => {
                  const overrideValue = overrides[key];
                  const value = overrideValue ?? defaultValue;
                  const isArray = isArrayValue(defaultValue as string | string[]);
                  const displayValue = isArray ? (value as string[]).join("\n") : (value as string);

                  return (
                    <div key={key} className="space-y-3 rounded-2xl border border-slate-800/70 bg-slate-950/70 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm font-semibold text-white">
                            <PencilLine className="h-4 w-4 text-emerald-300" />
                            {key}
                          </div>
                          <p className="text-xs text-slate-400">Default: {isArray ? "List" : "Text"}</p>
                        </div>
                        <Button
                          variant="ghost"
                          className="h-8 rounded-full text-xs text-slate-200 hover:bg-slate-800"
                          onClick={() => clearOverride(key)}
                          disabled={overrideValue === undefined}
                        >
                          Restore default
                        </Button>
                      </div>
                      <Separator className="bg-slate-800" />
                      {isArray ? (
                        <Textarea
                          value={displayValue}
                          onChange={(event) =>
                            updateOverride(
                              key,
                              event.target.value
                                .split("\n")
                                .map((line) => line.trim())
                                .filter(Boolean)
                            )
                          }
                          className="min-h-[140px] border-slate-800 bg-slate-950 text-slate-100 focus-visible:ring-emerald-500"
                        />
                      ) : (
                        <Input
                          value={displayValue}
                          onChange={(event) => updateOverride(key, event.target.value)}
                          className="border-slate-800 bg-slate-950 text-slate-100 focus-visible:ring-emerald-500"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
