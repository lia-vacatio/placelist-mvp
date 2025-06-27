'use client';

interface SEOStructuredDataProps {
  locale: string;
  type: 'organization' | 'webapplication' | 'faq';
}

type FAQItem = {
  question: string;
  answer: string;
};

export default function SEOStructuredData({ locale, type }: SEOStructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "PlaceList",
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
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "PlaceList",
          "description": locale === 'ko' 
            ? "AI가 맥락을 이해하여 당신에게 가장 적합한 장소를 추천해주는 PlaceList"
            : locale === 'ja'
            ? "AIが文脈を理解し、あなたに最適な場所を推薦するPlaceList"
            : "PlaceList uses AI to understand context and recommend the perfect places for you",
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
            "name": "PlaceList"
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
            question: "PlaceList는 어떤 서비스인가요?",
            answer: "PlaceList는 AI가 맥락을 이해하여 당신에게 가장 적합한 장소를 추천해주는 서비스입니다."
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
            question: "PlaceListはどのようなサービスですか？",
            answer: "PlaceListは、AIが文脈を理解し、あなたに最適な場所を推薦するサービスです。"
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
            question: "What is PlaceList?",
            answer: "PlaceList is a service that uses AI to understand context and recommend the perfect places for you."
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
          "@context": "https://schema.org",
          "@type": "FAQPage",
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
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
} 