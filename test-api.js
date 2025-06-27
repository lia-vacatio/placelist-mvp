// API 테스트 스크립트
// 사용법: node test-api.js

const testData = {
  name: "테스트 사용자",
  email: "test@example.com",
  company: "테스트 회사",
  phone: "010-1234-5678",
  purpose: "사용자 인터뷰",
  message: "PlaceList에 대해 더 자세히 알아보고 싶습니다."
};

async function testAPI() {
  try {
    console.log('API 테스트 시작...');
    console.log('전송 데이터:', testData);
    
    const response = await fetch('http://localhost:3000/api/meeting-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log('응답 상태:', response.status);
    console.log('응답 데이터:', result);
    
    if (response.ok) {
      console.log('✅ API 테스트 성공!');
    } else {
      console.log('❌ API 테스트 실패!');
    }
  } catch (error) {
    console.error('❌ API 테스트 중 오류 발생:', error.message);
  }
}

// 서버가 실행 중인지 확인 후 테스트 실행
console.log('서버가 http://localhost:3000 에서 실행 중인지 확인하세요.');
console.log('npm run dev 명령어로 서버를 시작한 후 이 스크립트를 실행하세요.\n');

testAPI(); 