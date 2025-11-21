import { useEffect, useRef } from "react";

interface UseInactivityTimerProps {
  onInactive: () => void;
  delay?: number;
  enabled?: boolean;
}

export const useInactivityTimer = ({
  onInactive,
  delay = 30000,
  enabled = true,
}: UseInactivityTimerProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(onInactive, delay);
    };

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"];

    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [onInactive, delay, enabled]);
};
