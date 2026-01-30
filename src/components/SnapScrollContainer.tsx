'use client';

import { useEffect, useRef, useCallback, ReactNode } from 'react';

/* ========================================
   Constants
   ======================================== */

const SCROLL_DURATION = 800;
const SCROLL_COOLDOWN = 600;
const TOUCH_THRESHOLD = 100;
const SCROLL_COMPLETE_DELAY = 300;
const WHEEL_THRESHOLD = 30; // ホイールの最小deltaY
const MOBILE_BREAKPOINT = 768; // SP版のブレークポイント

/* ========================================
   Types
   ======================================== */

interface SnapScrollContainerProps {
  children: ReactNode;
}

/* ========================================
   Easing Functions
   ======================================== */

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/* ========================================
   Component
   ======================================== */

export default function SnapScrollContainer({ children }: SnapScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isScrolling = useRef(false);
  const currentIndexRef = useRef(0);
  const touchStartY = useRef(0);
  const lastWheelTime = useRef(0);

  /* ----------------------------------------
     Initialize Sections
     ---------------------------------------- */
  useEffect(() => {
    if (!containerRef.current) return;

    // ScrollRestoration コンポーネントで共通処理済み

    const sectionElements = containerRef.current.querySelectorAll<HTMLElement>(
      '[data-snap-section]'
    );
    sectionsRef.current = Array.from(sectionElements);
  }, []);

  /* ----------------------------------------
     Detect Current Section from Scroll Position
     ---------------------------------------- */
  const getCurrentSectionIndex = useCallback(() => {
    const sections = sectionsRef.current;
    if (sections.length === 0) return 0;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionTop = section.offsetTop;
      // セクションの上端がビューポートの半分より上にあれば、そのセクションにいる
      if (scrollY >= sectionTop - windowHeight / 2) {
        return i;
      }
    }
    return 0;
  }, []);

  /* ----------------------------------------
     Scroll Animation
     ---------------------------------------- */
  const scrollToSection = useCallback((index: number) => {
    const sections = sectionsRef.current;

    if (index < 0 || index >= sections.length || isScrolling.current) {
      return;
    }

    isScrolling.current = true;
    currentIndexRef.current = index;

    const targetElement = sections[index];
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION, 1);
      const easedProgress = easeOutQuart(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (elapsed < SCROLL_DURATION) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          isScrolling.current = false;
        }, SCROLL_COMPLETE_DELAY);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  /* ----------------------------------------
     Check if Past Last Section
     ---------------------------------------- */
  const isPastLastSection = useCallback(() => {
    const sections = sectionsRef.current;
    if (sections.length === 0) return false;

    const lastSection = sections[sections.length - 1];
    const lastSectionBottom = lastSection.getBoundingClientRect().bottom;

    return (
      currentIndexRef.current >= sections.length - 1 &&
      lastSectionBottom <= window.innerHeight
    );
  }, []);

  /* ----------------------------------------
     Wheel Event Handler
     ---------------------------------------- */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // SP版では通常スクロール
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        return;
      }

      const sections = sectionsRef.current;
      if (sections.length === 0) return;

      // スクロール中は無視
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      // 連続スクロール防止
      const now = Date.now();
      if (now - lastWheelTime.current < SCROLL_COOLDOWN) {
        e.preventDefault();
        return;
      }

      // 現在のセクションを正確に検出
      const currentIndex = getCurrentSectionIndex();
      currentIndexRef.current = currentIndex;

      // 最後のセクションを過ぎて下スクロール → 通常スクロール（Footer表示）
      if (isPastLastSection() && e.deltaY > 0) {
        return;
      }

      // 小さすぎるスクロールは無視（トラックパッドの慣性スクロール対策）
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      lastWheelTime.current = now;

      const isScrollingDown = e.deltaY > 0;

      if (isScrollingDown && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1);
      } else if (!isScrollingDown && currentIndex > 0) {
        scrollToSection(currentIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollToSection, isPastLastSection, getCurrentSectionIndex]);

  /* ----------------------------------------
     Touch Event Handlers
     ---------------------------------------- */
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // SP版では通常スクロール
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        return;
      }

      const sections = sectionsRef.current;
      if (sections.length === 0 || isScrolling.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      const isSwipingDown = diff > 0;

      // 現在のセクションを正確に検出
      const currentIndex = getCurrentSectionIndex();
      currentIndexRef.current = currentIndex;

      // 最後のセクションを過ぎて下スワイプ → 通常スクロール
      if (isPastLastSection() && isSwipingDown) {
        return;
      }

      // スワイプ距離がしきい値を超えた場合のみ発火
      if (Math.abs(diff) > TOUCH_THRESHOLD) {
        if (isSwipingDown && currentIndex < sections.length - 1) {
          scrollToSection(currentIndex + 1);
        } else if (!isSwipingDown && currentIndex > 0) {
          scrollToSection(currentIndex - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollToSection, isPastLastSection, getCurrentSectionIndex]);

  /* ----------------------------------------
     Render
     ---------------------------------------- */
  return <div ref={containerRef}>{children}</div>;
}
