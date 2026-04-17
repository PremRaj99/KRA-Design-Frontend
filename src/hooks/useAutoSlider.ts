import { useState, useEffect, useCallback } from 'react';

interface UseAutoSliderProps {
  totalSlides: number;
  intervalMs?: number;
}

export function useAutoSlider({ totalSlides, intervalMs = 2000 }: UseAutoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === totalSlides - 1 ? 0 : prevIndex + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [nextSlide, intervalMs, isPaused]);

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    setIsPaused,
  };
}