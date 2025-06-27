"use client";

export function generateStaticParams() {
  return [
    { locale: 'ko' },
    { locale: 'en' },
    { locale: 'ja' }
  ];
}

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { koTranslations, jaTranslations, enTranslations } from '../../locales/translations';
import MeetingForm from '../../components/MeetingForm';
import VideoPlayer from '../../components/VideoPlayer';
import CreatorCarousel from '../../components/CreatorCarousel';

const translations = {
  ko: koTranslations,
  ja: jaTranslations,
  en: enTranslations,
};

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = translations[locale as keyof typeof translations] || translations.ko;
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  
  // Hero 배경 이미지 슬라이드용 상태
  const heroImages = [
    "/images/hero-bg-1.png",
    "/images/hero-bg-2.png",
    "/images/hero-bg.png"
  ];
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center h-16">
              <Image
                src="/images/placelist-logo.png"
                alt="PlaceList"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Link href="/ko" className={`px-3 py-1 rounded-md text-sm font-semibold shadow transition-colors duration-200 ${locale === 'ko' ? 'bg-[#007AFF] text-white' : 'bg-black/60 text-white hover:bg-[#007AFF]'} `}>
                  {t.language_ko}
                </Link>
                <Link href="/ja" className={`px-3 py-1 rounded-md text-sm font-semibold shadow transition-colors duration-200 ${locale === 'ja' ? 'bg-[#007AFF] text-white' : 'bg-black/60 text-white hover:bg-[#007AFF]'} `}>
                  {t.language_ja}
                </Link>
                <Link href="/en" className={`px-3 py-1 rounded-md text-sm font-semibold shadow transition-colors duration-200 ${locale === 'en' ? 'bg-[#007AFF] text-white' : 'bg-black/60 text-white hover:bg-[#007AFF]'} `}>
                  {t.language_en}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 min-h-[520px] px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Images (슬라이드) */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              className={`object-cover transition-opacity duration-1500 ${heroIdx === idx ? 'opacity-100' : 'opacity-0'}`}
              priority={idx === 0}
            />
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
              {t.hero_subtitle.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-12 max-w-3xl mx-auto drop-shadow-xl whitespace-pre-line">
              {t.hero_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowMeetingForm(true)}
                className="bg-[#007AFF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0056CC] transition-colors duration-200 shadow-lg"
              >
                {t.meeting_request}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Highlight Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.meeting_title}</h2>
            <p className="text-xl text-gray-700 mb-6 whitespace-pre-line">{t.meeting_description}</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-4xl">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <VideoPlayer
                  src="/videos/Placelist_Video.mp4"
                  poster="/images/hero-cafe.jpg"
                  className="w-full h-full"
                  controls={true}
                  autoPlay={false}
                  muted={true}
                  thumbnailTime={1}
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <a 
              href="https://apps.apple.com/kr/app/placelist-%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4%EB%A6%AC%EC%8A%A4%ED%8A%B8-ai-%EC%A7%80%EB%8F%84/id6743530494"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#007AFF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0056CC] transition-colors duration-200 shadow-lg"
            >
              {t.cta_install}
            </a>
          </div>
        </div>
      </section>

      {/* Why PlaceList Section - Notion Style */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.innovation_title}</h2>
          <div className="mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <span className="text-lg font-semibold text-[#007AFF]">{t.innovation_desc_1}</span>
              <p className="text-gray-700 text-base leading-relaxed">{t.innovation_desc_1_detail}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <span className="text-lg font-semibold text-green-700">{t.innovation_desc_2}</span>
              <p className="text-gray-700 text-base leading-relaxed">{t.innovation_desc_2_detail}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <span className="text-lg font-semibold text-purple-700">{t.innovation_desc_3}</span>
              <p className="text-gray-700 text-base leading-relaxed">{t.innovation_desc_3_detail}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.use_cases_title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.use_case_1_title}</h3>
              <p className="text-gray-600">{t.use_case_1_desc}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.use_case_2_title}</h3>
              <p className="text-gray-600">{t.use_case_2_desc}</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.use_case_3_title}</h3>
              <p className="text-gray-600">{t.use_case_3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.gallery_recommend_title}</h2>
          </div>
          <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 hide-scrollbar">
            {/* 1. 모던 카페 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group min-w-[300px] mx-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/modern.png"
                  alt={t.gallery_cafe_modern}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gallery_cafe_modern}</h3>
                <p className="text-gray-600">{t.gallery_cafe_modern_desc}<br/><span className='text-gray-400 text-sm'>: {t.gallery_cafe_modern_detail}</span></p>
              </div>
            </div>
            {/* 2. 디저트 전문 카페 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group min-w-[300px] mx-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/dessert.png"
                  alt={t.gallery_cafe_dessert}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gallery_cafe_dessert}</h3>
                <p className="text-gray-600">{t.gallery_cafe_dessert_desc}<br/><span className='text-gray-400 text-sm'>: {t.gallery_cafe_dessert_detail}</span></p>
              </div>
            </div>
            {/* 3. 분위기 좋은 바 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group min-w-[300px] mx-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/bar.png"
                  alt={t.gallery_bar}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gallery_bar}</h3>
                <p className="text-gray-600">{t.gallery_bar_desc}<br/><span className='text-gray-400 text-sm'>: {t.gallery_bar_detail}</span></p>
              </div>
            </div>
            {/* 4. 동네 맛집 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group min-w-[300px] mx-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/food.png"
                  alt={t.gallery_food}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gallery_food}</h3>
                <p className="text-gray-600">{t.gallery_food_desc}<br/><span className='text-gray-400 text-sm'>: {t.gallery_food_detail}</span></p>
              </div>
            </div>
            {/* 5. 도심 속 건축명소 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group min-w-[300px] mx-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/modern.png"
                  alt={t.gallery_architecture}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gallery_architecture}</h3>
                <p className="text-gray-600">{t.gallery_architecture_desc}<br/><span className='text-gray-400 text-sm'>: {t.gallery_architecture_detail}</span></p>
              </div>
            </div>
            {/* 6. 여행 명소 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group min-w-[300px] mx-2">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/travel.png"
                  alt={t.gallery_travel}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.gallery_travel}</h3>
                <p className="text-gray-600">{t.gallery_travel_desc}<br/><span className='text-gray-400 text-sm'>: {t.gallery_travel_detail}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Collaboration Section */}
      <section className="relative py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex justify-center order-2 md:order-1">
            <CreatorCarousel />
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 whitespace-pre-line">{t.creator_section_subheading}</h2>
            <p className="text-xl text-gray-700 mb-4">{t.creator_section_subheading}</p>
            <p className="text-lg text-gray-600 mb-4">{t.creator_section_paragraph1}</p>
            <p className="text-lg text-gray-600">{t.creator_section_paragraph2}</p>
            <a
              href="https://link.inpock.co.kr/placelist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-[#007AFF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0056CC] transition-colors duration-200 shadow-lg"
            >
              {t.creator_ai_agent}
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team-bg.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{t.vacatio_vision}</h2>
            <p className="text-2xl font-bold text-white mb-4 tracking-widest">{t.vacatio_motto}</p>
            <p className="text-xl text-gray-200 mb-2">{t.vacatio_desc_1}</p>
            <p className="text-xl text-gray-200 mb-8">{t.vacatio_desc_2}</p>
            <a
              href="https://vacatio.career.greetinghr.com/ko/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#007AFF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0056CC] transition-colors duration-200 shadow-lg"
            >
              {t.vacatio_learn_more}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-bg.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{t.contact_title}</h2>
            <p className="text-xl text-gray-200 mb-4">{t.contact_subtitle}</p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t.contact_desc}</p>
          </div>
          <div className="text-center">
            <button 
              onClick={() => setShowMeetingForm(true)}
              className="bg-[#007AFF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#0056CC] transition-colors duration-200 shadow-lg"
            >
              {t.meeting_request}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/images/placelist-logo.png"
              alt="PlaceList"
              width={120}
              height={40}
              className="h-8 w-auto mx-auto mb-4"
            />
            <p className="text-gray-400">© 2025 Vacatio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Meeting Form Modal */}
      {showMeetingForm && (
        <MeetingForm t={t} onClose={() => setShowMeetingForm(false)} />
      )}
    </div>
  );
}
