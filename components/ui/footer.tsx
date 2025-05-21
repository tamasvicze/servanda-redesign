"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Contact");

  return (
    <footer className="py-8 mt-auto z-20 relative">
      <p className="text-center text-sm text-gray-600">
        © 2025 {t("companyName")} &nbsp;&nbsp;&nbsp;&nbsp; {t("org")} 934118642
      </p>
    </footer>
  );
}
