# 영상 파일 사용법

이 폴더에는 랜딩페이지에서 사용할 영상 파일을 저장합니다.

## 현재 사용 중인 영상
- `Placelist_Video.mp4` - PlaceList 소개 영상

## 지원하는 형식
- MP4 (권장)
- WebM (대안)

## 최적화 권장사항
- 해상도: 1920x1080 (Full HD) 또는 1280x720 (HD)
- 비트레이트: 2-5 Mbps
- 길이: 1-3분 권장
- 파일 크기: 웹 최적화를 위해 압축 권장

## 사용 예시
```jsx
// PlaceList 소개 영상 (컨트롤 표시)
<VideoPlayer
  src="/videos/Placelist_Video.mp4"
  poster="/images/hero-cafe.jpg"
  controls={true}
/>
``` 