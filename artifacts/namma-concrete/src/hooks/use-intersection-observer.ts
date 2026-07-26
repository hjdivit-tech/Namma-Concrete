import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = true,
}: UseIntersectionObserverOptions = {}): [
  (node: Element | null) => void,
  boolean,
] {
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  const ref = (node: Element | null) => {
    if (!node) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        if (freezeOnceVisible && isElementIntersecting) {
          setIntersecting(true);
          observerRef.current?.disconnect();
        } else if (!freezeOnceVisible) {
          setIntersecting(isElementIntersecting);
        }
      },
      { threshold, root, rootMargin }
    );

    observerRef.current.observe(node);
  };

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [ref, isIntersecting];
}
