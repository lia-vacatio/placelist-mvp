import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다 | PlaceList',
  description: '요청하신 페이지를 찾을 수 없습니다. PlaceList 홈페이지로 돌아가세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Image
            src="/images/placelist-logo.png"
            alt="PlaceList"
            width={200}
            height={67}
            className="mx-auto mb-8"
          />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/ko"
            className="block w-full bg-[#007AFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0056CC] transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link href="/ko" className="text-[#007AFF] hover:underline">
              한국어
            </Link>
            <Link href="/ja" className="text-[#007AFF] hover:underline">
              日本語
            </Link>
            <Link href="/en" className="text-[#007AFF] hover:underline">
              English
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            문제가 지속되면{' '}
            <a 
              href="mailto:support@placelist.app" 
              className="text-[#007AFF] hover:underline"
            >
              고객지원
            </a>
            에 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  );
} 