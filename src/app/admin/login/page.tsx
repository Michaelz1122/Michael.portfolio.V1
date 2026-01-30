import { Suspense } from "react";

import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
          <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
            <p className="text-sm text-muted-foreground">Loading…</p>
          </div>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
