import * as React from "react";

type UseAutoplayProgressOptions = {
  duration: number;
  onAdvance: () => void;
  containerRef: React.RefObject<Element | null>;
  isPaused?: boolean;
  prefersReducedMotion: boolean;
  /** When true, calls onAdvance via setInterval even when prefersReducedMotion. */
  advanceOnReducedMotion?: boolean;
  /** When true, saves progress position across pause/scroll interruptions. */
  resumeOnPause?: boolean;
};

type UseAutoplayProgressResult = {
  progress: number;
  progressRef: React.MutableRefObject<number>;
  inView: boolean;
  restart: () => void;
};

export function useAutoplayProgress({
  duration,
  onAdvance,
  containerRef,
  isPaused = false,
  prefersReducedMotion,
  advanceOnReducedMotion = false,
  resumeOnPause = false,
}: UseAutoplayProgressOptions): UseAutoplayProgressResult {
  const [inView, setInView] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [restartCount, forceRestart] = React.useReducer(
    (n: number) => n + 1,
    0,
  );
  const progressRef = React.useRef(0);
  const startTimeRef = React.useRef<number | null>(null);
  const onAdvanceRef = React.useRef(onAdvance);

  React.useEffect(() => {
    onAdvanceRef.current = onAdvance;
  });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [containerRef]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: onAdvance handled via ref; restartCount drives explicit resets
  React.useEffect(() => {
    const reset = () => {
      if (!resumeOnPause) {
        progressRef.current = 0;
        startTimeRef.current = null;
        setProgress(0);
      }
    };

    if (!inView) {
      reset();
      return;
    }
    if (isPaused) {
      reset();
      return;
    }
    if (prefersReducedMotion) {
      reset();
      if (advanceOnReducedMotion) {
        const id = setInterval(() => onAdvanceRef.current(), duration);
        return () => clearInterval(id);
      }
      return;
    }

    let raf: number;

    const tick = (now: number) => {
      if (startTimeRef.current === null) {
        const startOffset = (progressRef.current / 100) * duration;
        startTimeRef.current = now - startOffset;
      }
      const p = Math.min(((now - startTimeRef.current) / duration) * 100, 100);
      progressRef.current = p;
      setProgress(p);
      if (p >= 100) {
        progressRef.current = 0;
        startTimeRef.current = null;
        setProgress(0);
        onAdvanceRef.current();
        raf = requestAnimationFrame(tick);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [
    duration,
    isPaused,
    prefersReducedMotion,
    inView,
    resumeOnPause,
    advanceOnReducedMotion,
    restartCount,
  ]);

  const restart = React.useCallback(() => {
    progressRef.current = 0;
    startTimeRef.current = null;
    setProgress(0);
    forceRestart();
  }, []);

  return { progress, progressRef, inView, restart };
}
