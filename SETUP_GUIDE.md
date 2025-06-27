# PlaceList 미팅 신청 시스템 설정 가이드

## 1. Gmail 설정

### 1.1 Gmail 앱 비밀번호 생성
1. Google 계정 설정으로 이동: https://myaccount.google.com/
2. "보안" 탭 클릭
3. "2단계 인증" 활성화 (아직 안 되어있다면)
4. "앱 비밀번호" 생성
5. "메일" 선택 후 비밀번호 생성
6. 생성된 16자리 비밀번호를 복사

### 1.2 환경변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=your-16-digit-app-password
```

## 2. Google Sheets API 설정

### 2.1 Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "라이브러리" 이동
4. "Google Sheets API" 검색 후 활성화

### 2.2 서비스 계정 생성
1. "API 및 서비스" > "사용자 인증 정보" 이동
2. "사용자 인증 정보 만들기" > "서비스 계정" 선택
3. 서비스 계정 이름 입력 (예: "placelist-sheets")
4. "키 만들기" > "JSON" 선택하여 키 파일 다운로드

### 2.3 Google Sheets 생성 및 공유
1. [Google Sheets](https://sheets.google.com/)에서 새 스프레드시트 생성
2. 첫 번째 시트 이름을 "Sheet1"로 설정
3. A1:G1에 다음 헤더 추가:
   ```
   타임스탬프 | 이름 | 이메일 | 회사/조직 | 전화번호 | 미팅목적 | 메시지
   ```
4. 스프레드시트를 서비스 계정 이메일과 공유 (편집 권한)

### 2.4 환경변수 추가
`.env.local` 파일에 다음 내용 추가:

```env
GOOGLE_SHEET_ID=your-spreadsheet-id-from-url
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key From JSON File\n-----END PRIVATE KEY-----\n"
```

**참고:** 
- 스프레드시트 ID는 URL에서 추출: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
- 개인 키는 JSON 파일의 `private_key` 값을 복사하여 사용

## 3. 최종 환경변수 파일 예시

```env
# Gmail 설정
EMAIL_USER=your-gmail@gmail.com
EMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Google Sheets 설정
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
GOOGLE_SERVICE_ACCOUNT_EMAIL=placelist-sheets@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

## 4. 테스트

설정 완료 후:
1. `npm run dev`로 개발 서버 실행
2. 웹사이트에서 미팅 신청 폼 테스트
3. lia@hautrip.com으로 이메일 수신 확인
4. Google Sheets에 데이터 추가 확인

## 5. 문제 해결

### 이메일 발송 실패
- Gmail 앱 비밀번호가 올바른지 확인
- 2단계 인증이 활성화되어 있는지 확인
- Gmail 계정에서 "보안 수준이 낮은 앱의 액세스" 허용

### Google Sheets 연동 실패
- 서비스 계정이 스프레드시트에 공유되어 있는지 확인
- API 키가 올바른지 확인
- Google Sheets API가 활성화되어 있는지 확인

## 6. 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- 서비스 계정 키는 안전하게 보관하세요
- 프로덕션 환경에서는 환경변수를 서버 설정에서 관리하세요 