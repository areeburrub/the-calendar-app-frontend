import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {
    ClerkProvider
} from '@clerk/nextjs'
import "./globals.css";
import ServiceWorkerRegister from "@/app/serviceWorkerRegister";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "The Calendar App",
    description: "A Calendar App to create events.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <ServiceWorkerRegister/>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
