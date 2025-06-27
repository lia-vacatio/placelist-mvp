import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function Home() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // 브라우저 언어 감지
  let locale = 'ko'; // 기본값
  
  if (acceptLanguage.includes('ja') || acceptLanguage.includes('ja-JP')) {
    locale = 'ja';
  } else if (acceptLanguage.includes('en') || acceptLanguage.includes('en-US') || acceptLanguage.includes('en-GB')) {
    locale = 'en';
  }
  
  redirect(`/${locale}`);
  return null;
}
