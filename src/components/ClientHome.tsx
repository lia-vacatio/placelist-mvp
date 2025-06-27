"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { koTranslations, jaTranslations, enTranslations } from '../locales/translations';
import MeetingForm from './MeetingForm';
import VideoPlayer from './VideoPlayer';
import CreatorCarousel from './CreatorCarousel';

const translations = {
  ko: koTranslations,
  ja: jaTranslations,
  en: enTranslations,
};

export default function ClientHome({ locale }: { locale: string }) {
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
                <Link href="/ko" className={`px-3 py-1 rounded-md text-sm font-semibold shadow transition-colors duration-200 ${locale === 'ko' ? 'bg-[#007AFF] text-white' : 'bg-black/60 text-white hover:bg-[#007AFF]'}`}>{t.language_ko}</Link>
                <Link href="/ja" className={`px-3 py-1 rounded-md text-sm font-semibold shadow transition-colors duration-200 ${locale === 'ja' ? 'bg-[#007AFF] text-white' : 'bg-black/60 text-white hover:bg-[#007AFF]'}`}>{t.language_ja}</Link>
                <Link href="/en" className={`px-3 py-1 rounded-md text-sm font-semibold shadow transition-colors duration-200 ${locale === 'en' ? 'bg-[#007AFF] text-white' : 'bg-black/60 text-white hover:bg-[#007AFF]'}`}>{t.language_en}</Link>
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
              {t.hero_subtitle.split('\n').map((line: string, i: number) => (
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

      {/* Meeting Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.meeting_title}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto whitespace-pre-line">
              {t.meeting_description}
            </p>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.innovation_title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t.innovation_desc_1}
              </h3>
              <p className="text-gray-600">
                {t.innovation_desc_1_detail}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t.innovation_desc_2}
              </h3>
              <p className="text-gray-600">
                {t.innovation_desc_2_detail}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t.innovation_desc_3}
              </h3>
              <p className="text-gray-600">
                {t.innovation_desc_3_detail}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.gallery_recommend_title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/gallery-cafe.jpg"
                alt="Modern Cafe"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.gallery_cafe_modern}
                </h3>
                <p className="text-gray-600 mb-3">
                  {t.gallery_cafe_modern_desc}
                </p>
                <p className="text-sm text-gray-500">
                  {t.gallery_cafe_modern_detail}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/gallery-restaurant.jpg"
                alt="Premium Restaurant"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.gallery_restaurant}
                </h3>
                <p className="text-gray-600 mb-3">
                  {t.gallery_restaurant_desc}
                </p>
                <p className="text-sm text-gray-500">
                  {t.gallery_cafe_dessert_detail}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src="/images/gallery-workspace.jpg"
                alt="Workspace"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.gallery_workspace}
                </h3>
                <p className="text-gray-600 mb-3">
                  {t.gallery_workspace_desc}
                </p>
                <p className="text-sm text-gray-500">
                  {t.gallery_bar_detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.creator_section_subheading}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              {t.creator_section_paragraph1}
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              {t.creator_section_paragraph2}
            </p>
          </div>
          <CreatorCarousel />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.video_title}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              {t.video_subtitle}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <VideoPlayer src="/videos/Placelist_Video.mp4" />
          </div>
        </div>
      </section>

      {/* VACATIO Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.vacatio_vision}
            </h2>
            <p className="text-2xl font-light mb-8">
              {t.vacatio_motto}
            </p>
            <p className="text-lg text-gray-300 mb-8">
              {t.vacatio_desc_1}<br />
              {t.vacatio_desc_2}
            </p>
            <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              {t.vacatio_learn_more}
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t.contact_title}
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              {t.contact_desc}
            </p>
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

      {/* Meeting Form Modal */}
      {showMeetingForm && (
        <MeetingForm t={t} onClose={() => setShowMeetingForm(false)} />
      )}
    </div>
  );
} 