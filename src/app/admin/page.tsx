import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col gap-4 px-6 py-12">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Signed in as {session?.user?.email ?? "admin"}.
      </p>
      <p className="text-sm text-muted-foreground">
        Phase 1 is complete. This area is now protected by NextAuth.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/admin/pages">Manage pages</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/site">Manage site sections</Link>
        </Button>
      </div>
    </div>
  );
}
