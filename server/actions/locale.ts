"use server";

import { cookies } from "next/headers";
import type { Locale } from "@/i18n/config";

export async function setUserLocale(locale: Locale) {
  cookies().set("NEXT_LOCALE", locale, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function deleteUserLocale() {
  cookies().delete("NEXT_LOCALE");
}

export async function getUserLocale(): Promise<Locale | undefined> {
  const cookieStore = cookies();
  return cookieStore.get("NEXT_LOCALE")?.value as Locale | undefined;
}
