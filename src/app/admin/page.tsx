import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

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
    </div>
  );
}
