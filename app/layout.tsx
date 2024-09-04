
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  openGraph: {
    title: "E-commerce Platform",
    description: "A product listing platform built with Next.js, TypeScript, and Tailwind CSS",
    images: [
      {
        url: "https://res.cloudinary.com/ddxssowqb/image/upload/v1723657226/user_1_rsexod.png",
        width: 800,
        height: 600,
        alt: "Default Image",
      },
    ],
    url: "https://www.yoursite.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.yoursite.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

