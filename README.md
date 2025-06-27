# PlaceList - AI 기반 맞춤 공간 추천 서비스

PlaceList는 ChatGPT의 지도 버전으로, 사용자의 취향, 상황, 맥락을 이해하여 개인화된 공간을 추천하는 AI 기반 지도 서비스입니다.

## 주요 기능

- 🤖 **AI 기반 개인화**: 사용자의 취향과 상황을 학습하여 정확한 추천
- 🌍 **다국어 지원**: 한국어, 일본어, 영어 지원
- 📧 **자동 이메일 알림**: 미팅 신청 시 lia@hautrip.com으로 자동 알림
- 📊 **Google Sheets 연동**: 모든 신청 데이터가 자동으로 스프레드시트에 저장
- 📱 **반응형 디자인**: 모바일과 데스크톱에서 최적화된 경험

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **이메일**: Nodemailer + Gmail
- **데이터 저장**: Google Sheets API
- **국제화**: next-i18next

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수들을 설정하세요:

```env
# Gmail 설정
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password

# Google Sheets 설정
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----\n"
```

자세한 설정 방법은 [SETUP_GUIDE.md](./SETUP_GUIDE.md)를 참조하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 4. API 테스트

```bash
node test-api.js
```

## 프로젝트 구조

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

## 미팅 신청 시스템

사용자가 미팅 신청 폼을 제출하면:

1. **데이터 검증**: 필수 필드와 이메일 형식 검증
2. **Google Sheets 저장**: 모든 신청 데이터가 스프레드시트에 자동 저장
3. **이메일 알림**: lia@hautrip.com으로 상세한 신청 정보가 포함된 이메일 발송
4. **사용자 피드백**: 성공/실패 메시지 표시

### 저장되는 데이터

- 타임스탬프
- 이름
- 이메일
- 회사/조직
- 전화번호
- 미팅 목적
- 메시지

## 배포

### Vercel 배포

가장 쉬운 방법은 [Vercel Platform](https://vercel.com/new)을 사용하는 것입니다:

1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 연결
3. 환경변수 설정
4. 배포 완료

### 환경변수 설정 (배포 시)

Vercel 대시보드에서 다음 환경변수들을 설정하세요:
- `EMAIL_USER`
- `EMAIL_APP_PASSWORD`
- `GOOGLE_SHEET_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 연락처

- 이메일: lia@hautrip.com
- 프로젝트 링크: [https://github.com/your-username/placelist-mvp](https://github.com/your-username/placelist-mvp)
