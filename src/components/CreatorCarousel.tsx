import Image from "next/image";
import { useState } from "react";

const images = [
  "/images/creator-1.png",
  "/images/creator-2.png",
  "/images/creator-3.png",
  "/images/creator-4.png",
  "/images/creator-5.png",
  "/images/creator-6.png",
];

export default function CreatorCarousel() {
  const [current, setCurrent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const total = images.length;

  const prev = () => {
    setCurrent((c) => (c - 1 + total) % total);
    setImageError(false);
  };
  
  const next = () => {
    setCurrent((c) => (c + 1) % total);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error(`Failed to load image: ${images[current]}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`Successfully loaded image: ${images[current]}`);
    setImageError(false);
  };

  return (
    <div className="relative w-full max-w-xs aspect-[9/16] flex items-center justify-center rounded-2xl">
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-black/70 transition"
        aria-label="이전 이미지"
      >
        &#8592;
      </button>
      <div className="w-full h-full relative">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            이미지를 불러올 수 없습니다
          </div>
        ) : (
          <Image
            src={images[current]}
            alt={`크리에이터 공간 ${current + 1}`}
            fill
            className="object-contain"
            priority={current === 0}
            onError={handleImageError}
            onLoad={handleImageLoad}
            unoptimized
          />
        )}
      </div>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 hover:bg-black/70 transition"
        aria-label="다음 이미지"
      >
        &#8594;
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <span
            key={i}
            className={`inline-block w-2 h-2 rounded-full ${i === current ? 'bg-[#007AFF]' : 'bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
} 