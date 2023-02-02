import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (
  options: IntersectionObserverInit | undefined = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }
) => {
  const container = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callback: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const observed = container.current;
    if (observed) observer.observe(observed);
    return () => {
      if (observed) observer.unobserve(observed);
    };
  }, [container, options]);

  return { container, isVisible };
};
export default useIntersectionObserver;
