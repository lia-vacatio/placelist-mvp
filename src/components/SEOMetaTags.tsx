'use client';

import Head from 'next/head';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export default function SEOMetaTags({
  title,
  description,
  keywords = [],
  image = '/images/placelist-logo.png',
  url,
  type = 'website',
  locale = 'ko',
  noindex = false,
  nofollow = false,
}: SEOMetaTagsProps) {
  const baseUrl = 'https://placelist.app';
  const fullUrl = url ? `${baseUrl}${url}` : `${baseUrl}/${locale}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Head>
      {/* 기본 메타 태그 */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="PlaceList" />
      <meta property="og:locale" content={locale === 'ko' ? 'ko_KR' : locale === 'ja' ? 'ja_JP' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@placelist" />
      
      {/* 추가 메타 태그 */}
      <meta name="author" content="PlaceList Team" />
      <meta name="robots" content={noindex || nofollow ? `${noindex ? 'noindex' : ''}${noindex && nofollow ? ',' : ''}${nofollow ? 'nofollow' : ''}` : 'index,follow'} />
      <meta name="googlebot" content={noindex || nofollow ? `${noindex ? 'noindex' : ''}${noindex && nofollow ? ',' : ''}${nofollow ? 'nofollow' : ''}` : 'index,follow'} />
      
      {/* 언어 및 지역화 */}
      <meta name="language" content={locale === 'ko' ? 'Korean' : locale === 'ja' ? 'Japanese' : 'English'} />
      <meta name="geo.region" content={locale === 'ko' ? 'KR' : locale === 'ja' ? 'JP' : 'US'} />
      
      {/* 캐노니컬 URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* 언어 대안 */}
      <link rel="alternate" hrefLang="ko" href={`${baseUrl}/ko`} />
      <link rel="alternate" hrefLang="ja" href={`${baseUrl}/ja`} />
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ko`} />
      
      {/* 추가 SEO 메타 태그 */}
      <meta name="application-name" content="PlaceList" />
      <meta name="apple-mobile-web-app-title" content="PlaceList" />
      <meta name="theme-color" content="#007AFF" />
      <meta name="msapplication-TileColor" content="#007AFF" />
      
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PlaceList",
            "description": description || "AI 기반 맞춤형 장소 추천 서비스",
            "url": fullUrl,
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
            }
          })
        }}
      />
    </Head>
  );
} 