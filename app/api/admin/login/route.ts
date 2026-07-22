import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getAdminCookieValue, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") || "");
  if (!verifyAdminPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }
  const token = getAdminCookieValue();
  if (!token) return NextResponse.redirect(new URL("/admin/login?error=config", request.url), 303);
  const response = NextResponse.redirect(new URL("/admin/orders", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
