import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export default function useMeasure() {
  const ref = useRef<HTMLElement>();
  const [bounds, set] = useState<any>({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => new ResizeObserver(([entry]) => set(entry.contentRect)),
  );

  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [{ ref }, bounds];
}
