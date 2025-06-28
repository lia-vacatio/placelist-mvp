import type { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
}

export function generateSEOConfig(config: SEOConfig, locale: string): Metadata {
  const baseUrl = 'https://placelist.app';
  const defaultImage = '/images/placelist-logo.png';
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'placelist Team' }],
    creator: 'placelist',
    publisher: 'placelist',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.url || `${baseUrl}/${locale}`,
      languages: {
        'ko': '/ko',
        'ja': '/ja',
        'en': '/en',
      },
    },
    openGraph: {
      type: config.type || 'website',
      locale: locale === 'ko' ? 'ko_KR' : locale === 'ja' ? 'ja_JP' : 'en_US',
      url: config.url || `${baseUrl}/${locale}`,
      siteName: 'placelist',
      title: config.title,
      description: config.description,
      images: [
        {
          url: config.image || defaultImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [config.image || defaultImage],
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
  };
}

type FAQItem = {
  question: string;
  answer: string;
};

export function generateStructuredData(type: 'organization' | 'webapplication' | 'faq', locale: string) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type === 'organization' ? 'Organization' : type === 'webapplication' ? 'WebApplication' : 'FAQPage',
  };

  switch (type) {
    case 'organization':
      return {
        ...baseData,
        "name": "placelist",
        "url": "https://placelist.app",
        "logo": "https://placelist.app/images/placelist-logo.png",
        "description": locale === 'ko' 
          ? "AI 기반 맞춤형 장소 추천 서비스"
          : locale === 'ja'
          ? "AI駆動のパーソナライズされた場所推薦サービス"
          : "AI-Powered Personalized Place Recommendation Service",
        "sameAs": [
          "https://apps.apple.com/kr/app/placelist-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4%EB%A6%AC%EC%8A%A4%ED%8A%B8-ai-%EC%A7%80%EB%8F%84/id6743530494"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["Korean", "Japanese", "English"]
        }
      };
    
    case 'webapplication':
      return {
        ...baseData,
        "name": "placelist",
        "description": locale === 'ko' 
          ? "AI가 맥락을 이해하여 당신에게 가장 적합한 장소를 추천해주는 placelist"
          : locale === 'ja'
          ? "AIが文脈を理解し、あなたに最適な場所を推薦するplacelist"
          : "placelist uses AI to understand context and recommend the perfect places for you",
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
        },
        "featureList": [
          "AI 기반 장소 추천",
          "맥락 이해",
          "개인화된 추천",
          "다국어 지원"
        ]
      };
    
    case 'faq':
      const faqData: FAQItem[] = locale === 'ko' ? [
        {
          question: "placelist는 어떤 서비스인가요?",
          answer: "placelist는 AI가 맥락을 이해하여 당신에게 가장 적합한 장소를 추천해주는 서비스입니다."
        },
        {
          question: "어떤 상황에서 사용할 수 있나요?",
          answer: "데이트, 비즈니스 미팅, 여행, 친구들과의 만남 등 다양한 상황에서 사용할 수 있습니다."
        },
        {
          question: "언어는 어떤 것을 지원하나요?",
          answer: "한국어, 일본어, 영어를 지원합니다."
        }
      ] : locale === 'ja' ? [
        {
          question: "placelistはどのようなサービスですか？",
          answer: "placelistは、AIが文脈を理解し、あなたに最適な場所を推薦するサービスです。"
        },
        {
          question: "どのような場面で使用できますか？",
          answer: "デート、ビジネスミーティング、旅行、友達との待ち合わせなど、様々な場面で使用できます。"
        },
        {
          question: "どの言語をサポートしていますか？",
          answer: "韓国語、日本語、英語をサポートしています。"
        }
      ] : [
        {
          question: "What is placelist?",
          answer: "placelist is a service that uses AI to understand context and recommend the perfect places for you."
        },
        {
          question: "When can I use it?",
          answer: "You can use it for dates, business meetings, travel, meeting friends, and various other situations."
        },
        {
          question: "What languages are supported?",
          answer: "We support Korean, Japanese, and English."
        }
      ];

      return {
        ...baseData,
        "mainEntity": faqData.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      };
    
    default:
      return baseData;
  }
}

export function generateSitemapData() {
  const baseUrl = 'https://placelist.app';
  const currentDate = new Date();
  
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/ko`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ja`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];
} 