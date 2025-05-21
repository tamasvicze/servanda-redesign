import type { Metadata } from "next";
import "@/components/ui/globals.css";
import { poppins } from "@/components/ui/fonts";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import NavigationMenuDemo from "@/components/ui/top-navigation-menu";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Servanda",
  description: "Nettsiden til Servanda AS.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/images/favicon.svg" sizes="any" />
      </head>
      <body className={`${poppins.className} antialiased bg-white text-black`}>
        {/* Decorative background lines - consistent layout, scaled for mobile */}
        <img
          src="/blue_line.png"
          alt="Blue decorative line top left"
          className="fixed left-0 top-[10vh] w-[60vw] md:top-0 md:w-auto md:h-[80vh] z-0 opacity-70 pointer-events-none select-none object-contain"
        />
        <img
          src="/orange_line.png"
          alt="Orange decorative line bottom right"
          className="fixed right-0 bottom-0 w-[40vw] md:w-auto md:h-[90vh] z-0 opacity-70 pointer-events-none select-none object-contain"
        />
        <img
          src="/blue_line.png"
          alt="Blue decorative line middle left"
          className="fixed left-[-10vw] top-1/3 w-[25vw] md:w-auto md:h-[40vh] z-0 opacity-50 pointer-events-none select-none rotate-12 object-contain"
        />
        <img
          src="/orange_line.png"
          alt="Orange decorative line middle right"
          className="fixed right-[-10vw] top-1/2 w-[25vw] md:w-auto md:h-[50vh] z-0 opacity-50 pointer-events-none select-none -rotate-12 object-contain"
        />
        <img
          src="/orange_line.png"
          alt="Orange decorative line bottom left small"
          className="fixed left-0 bottom-[-10vh] w-[18vw] md:w-auto md:h-[30vh] z-0 opacity-40 pointer-events-none select-none rotate-45 object-contain"
        />
        <img
          src="/blue_line.png"
          alt="Blue decorative line top right small"
          className="fixed right-0 top-[-10vh] w-[18vw] md:w-auto md:h-[30vh] z-0 opacity-40 pointer-events-none select-none -rotate-45 object-contain"
        />
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen w-full flex-col z-10">
            <header className="w-full bg-white shadow-sm z-10">
              <NavigationMenuDemo />
            </header>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
