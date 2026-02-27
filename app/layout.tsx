import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import ChatwootWidget from '@/components/ChatwootWidget';

export const metadata: Metadata = {
    title: 'ParkPool - The Operating System for Valet Parking Companies',
    description: 'Digitize your operation, eliminate cash fraud, and reduce delivery times by 40%.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
                <ChatwootWidget />
            </body>
        </html>
    );
}
