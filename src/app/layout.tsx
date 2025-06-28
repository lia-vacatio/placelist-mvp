import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { dir } from 'i18next';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "placelist - AI 기반 맞춤형 장소 추천 서비스",
    template: "%s | placelist"
  },
  description: "AI가 맥락을 이해하여 당신에게 가장 적합한 장소를 추천해주는 placelist. 데이트, 비즈니스 미팅, 여행 등 모든 상황에 맞는 완벽한 공간을 찾아보세요.",
  keywords: ["장소 추천", "AI 추천", "데이트 장소", "비즈니스 미팅", "카페", "레스토랑", "여행", "플레이스리스트"],
  authors: [{ name: "placelist Team" }],
  creator: "placelist",
  publisher: "placelist",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://placelist.app'),
  alternates: {
    canonical: '/',
    languages: {
      'ko': '/ko',
      'ja': '/ja', 
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://placelist.app',
    siteName: 'placelist',
    title: 'placelist - AI 기반 맞춤형 장소 추천 서비스',
    description: 'AI가 맥락을 이해하여 당신에게 가장 적합한 장소를 추천해주는 placelist. 데이트, 비즈니스 미팅, 여행 등 모든 상황에 맞는 완벽한 공간을 찾아보세요.',
    images: [
      {
        url: '/images/placelist-logo.png',
        width: 1200,
        height: 630,
        alt: 'placelist - AI 기반 맞춤형 장소 추천 서비스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'placelist - AI 기반 맞춤형 장소 추천 서비스',
    description: 'AI가 맥락을 이해하여 당신에게 가장 적합한 장소를 추천해주는 placelist',
    images: ['/images/placelist-logo.png'],
    creator: '@placelist',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = 'ko'; // 기본값 설정
  
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#007AFF" />
        <meta name="msapplication-TileColor" content="#007AFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "placelist",
              "description": "AI 기반 맞춤형 장소 추천 서비스",
              "url": "https://placelist.app",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "iOS, Android",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "creator": {
                "@type": "Organization",
                "name": "placelist"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
