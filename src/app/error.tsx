'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 로깅
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Image
            src="/images/placelist-logo.png"
            alt="placelist"
            width={200}
            height={67}
            className="mx-auto mb-8"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            오류가 발생했습니다
          </h1>
          <p className="text-gray-600 mb-8">
            페이지를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="block w-full bg-[#007AFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0056CC] transition-colors duration-200"
          >
            다시 시도
          </button>
          
          <Link
            href="/ko"
            className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>
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