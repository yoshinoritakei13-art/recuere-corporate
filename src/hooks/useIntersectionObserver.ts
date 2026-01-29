import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
  onIntersect?: (isIntersecting: boolean) => void;
}

/**
 * IntersectionObserver を簡単に使うためのカスタムフック
 *
 * @param options - IntersectionObserverの設定
 * @returns [ref, isIntersecting] - 監視対象のrefと可視状態
 *
 * @example
 * // 基本的な使い方
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
 *
 * @example
 * // 一度だけトリガー（アニメーション用）
 * const [ref, isVisible] = useIntersectionObserver({
 *   threshold: 0.1,
 *   triggerOnce: true
 * });
 *
 * @example
 * // コールバック付き
 * const [ref, isVisible] = useIntersectionObserver({
 *   threshold: 0.5,
 *   onIntersect: (isIntersecting) => {
 *     if (isIntersecting) console.log('Element is visible!');
 *   }
 * });
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    onIntersect,
  } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // triggerOnceで既にトリガー済みなら何もしない
    if (triggerOnce && hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        // triggerOnceの場合、一度trueになったらそれ以降は更新しない
        if (triggerOnce) {
          if (isVisible && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setIsIntersecting(true);
            onIntersect?.(true);
            observer.disconnect();
          }
        } else {
          setIsIntersecting(isVisible);
          onIntersect?.(isVisible);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, onIntersect]);

  return [ref, isIntersecting];
}

/**
 * 既存のRefを使いたい場合のバージョン
 */
export function useIntersectionObserverWithRef<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseIntersectionObserverOptions = {}
): boolean {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    onIntersect,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (triggerOnce && hasTriggeredRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        if (triggerOnce) {
          if (isVisible && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setIsIntersecting(true);
            onIntersect?.(true);
            observer.disconnect();
          }
        } else {
          setIsIntersecting(isVisible);
          onIntersect?.(isVisible);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, triggerOnce, onIntersect]);

  return isIntersecting;
}

export default useIntersectionObserver;
