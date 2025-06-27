# PlaceList - AI 기반 맞춤 공간 추천 서비스

PlaceList는 ChatGPT의 지도 버전으로, 사용자의 취향, 상황, 맥락을 이해하여 개인화된 공간을 추천하는 AI 기반 지도 서비스입니다.

## 🚀 주요 기능

- 🤖 **AI 기반 개인화**: 사용자의 취향과 상황을 학습하여 정확한 추천
- 🌍 **다국어 지원**: 한국어, 일본어, 영어 지원
- 📧 **자동 이메일 알림**: 미팅 신청 시 lia@hautrip.com으로 자동 알림
- 📊 **Google Sheets 연동**: 모든 신청 데이터가 자동으로 스프레드시트에 저장
- 📱 **반응형 디자인**: 모바일과 데스크톱에서 최적화된 경험
- **SEO 최적화**: 검색 엔진 최적화 및 오픈그래프 설정
- **접근성**: WCAG 가이드라인 준수

## 🛠 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **이메일**: Nodemailer + Gmail
- **데이터 저장**: Google Sheets API
- **국제화**: next-i18next
- **SEO**: Next.js Metadata API, Structured Data

## 📁 프로젝트 구조

```
placelist-mvp/
├── src/
│   ├── app/
│   │   ├── api/meeting-request/    # 미팅 신청 API
│   │   ├── [locale]/               # 다국어 라우팅
│   │   └── layout.tsx
│   └── components/
│       └── MeetingForm.tsx         # 미팅 신청 폼
├── public/
│   └── locales/                    # 번역 파일들
├── SETUP_GUIDE.md                  # 설정 가이드
└── test-api.js                     # API 테스트 스크립트
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **빌드**
   ```bash
   npm run build
   ```

4. **프로덕션 실행**
   ```bash
   npm start
   ```

## 🔍 SEO 최적화

### 구현된 SEO 기능

1. **메타데이터 최적화**
   - 동적 제목 및 설명
   - 키워드 최적화
   - 다국어 메타데이터

2. **오픈그래프 설정**
   - 소셜 미디어 공유 최적화
   - 이미지 및 설명 자동 생성
   - 다국어 오픈그래프

3. **구조화된 데이터**
   - JSON-LD 스키마 마크업
   - Organization, WebApplication, FAQ 스키마
   - 검색 엔진 이해도 향상

4. **기술적 SEO**
   - 사이트맵 자동 생성
   - 로봇 설정
   - 캐노니컬 URL
   - 언어 대안 링크

5. **성능 최적화**
   - 이미지 최적화 (WebP, AVIF)
   - 코드 분할
   - 압축 설정
   - 캐싱 전략

6. **접근성**
   - WCAG 가이드라인 준수
   - 스크린 리더 지원
   - 키보드 네비게이션
   - 포커스 표시

### SEO 검사 도구

- Google Search Console
- Google PageSpeed Insights
- Lighthouse
- GTmetrix

## 🌐 다국어 지원

### 지원 언어
- 한국어 (ko)
- 일본어 (ja)
- 영어 (en)

### 언어 감지
- 브라우저 언어 설정 기반 자동 감지
- 수동 언어 선택 가능

## 📱 PWA 지원

- 웹 앱 매니페스트
- 오프라인 지원 준비
- 설치 가능한 웹 앱

## 🔧 환경 설정

### 환경 변수

```env
NEXT_PUBLIC_SITE_URL=https://placelist.app
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### 배포 설정

1. **Vercel 배포** (권장)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **기타 플랫폼**
   - Netlify
   - AWS Amplify
   - Google Cloud Platform

## 📊 성능 모니터링

### Core Web Vitals
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

### 최적화 목표
- LCP: < 2.5초
- FID: < 100ms
- CLS: < 0.1

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

- 이메일: support@placelist.app
- 웹사이트: https://placelist.app

---

**PlaceList** - AI 기반 맞춤형 장소 추천 서비스
