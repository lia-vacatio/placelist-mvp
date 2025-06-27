'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  thumbnailTime?: number; // 썸네일 시간 (초)
}

export default function VideoPlayer({
  src,
  poster,
  className = '',
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  playsInline = false,
  thumbnailTime,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 썸네일 생성
  useEffect(() => {
    if (thumbnailTime && videoRef.current) {
      const video = videoRef.current;
      
      const generateThumbnail = () => {
        video.currentTime = thumbnailTime;
        video.addEventListener('seeked', () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
            setThumbnailUrl(thumbnail);
          }
        }, { once: true });
      };

      if (video.readyState >= 2) {
        generateThumbnail();
      } else {
        video.addEventListener('loadedmetadata', generateThumbnail, { once: true });
      }
    }
  }, [thumbnailTime]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnailUrl || poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline={playsInline}
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        <p className="text-center text-gray-600 p-8">
          브라우저가 비디오를 지원하지 않습니다.
          <a href={src} className="text-blue-600 hover:underline ml-2">
            직접 다운로드
          </a>
        </p>
      </video>
      
      {!controls && (
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying && (
            <button
              onClick={() => videoRef.current?.play()}
              className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function YouTubePlayer({ videoId, title, className = '' }: YouTubePlayerProps) {
  return (
    <div className={`relative ${className}`}>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title || "YouTube video player"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
} 