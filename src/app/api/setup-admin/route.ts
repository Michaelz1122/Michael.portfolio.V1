import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const setupToken = process.env.SETUP_TOKEN;

  if (!setupToken || token !== setupToken) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { ok: false, message: "Missing admin configuration" },
      { status: 500 }
    );
  }

  const existingAdmin = await db.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    return NextResponse.json({ ok: true, message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await db.user.create({
    data: {
      email: adminEmail,
      name: "Admin",
      password: hashedPassword,
    },
  });

  return NextResponse.json({ ok: true, message: "Admin created" });
}
