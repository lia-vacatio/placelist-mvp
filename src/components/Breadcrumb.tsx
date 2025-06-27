'use client';

import Link from 'next/link';

interface BreadcrumbProps {
  locale: string;
  items?: Array<{
    label: string;
    href?: string;
  }>;
}

export default function Breadcrumb({ locale, items = [] }: BreadcrumbProps) {
  const defaultItems = [
    { label: locale === 'ko' ? '홈' : locale === 'ja' ? 'ホーム' : 'Home', href: `/${locale}` },
    ...items
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {defaultItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {item.href ? (
              <Link 
                href={item.href}
                className="hover:text-[#007AFF] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 