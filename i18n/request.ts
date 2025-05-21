import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "./config";
import { cookies } from "next/headers";

type Locale = "en" | "nb";

export default getRequestConfig(async () => {
  // Read the user locale from the cookie
  const cookieStore = cookies();
  const userLocale = cookieStore.get("NEXT_LOCALE")?.value;

  // Check if the userLocale matches the locales list
  const useSystem = !userLocale || !locales.includes(userLocale as Locale);

  // Ensure the locale is of type Locale
  const locale: Locale = useSystem ? defaultLocale : (userLocale as Locale);

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale,
  };
});
