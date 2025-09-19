import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import ProfileInitializer from "@/components/profile-initializer";

export const metadata: Metadata = {
  title: "BetterAuth Todo",
  description: "Learning how BetterAuth works",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProfileInitializer/>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
