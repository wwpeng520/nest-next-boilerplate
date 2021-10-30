import { useEffect } from 'react';
import type { RefObject } from 'react';

// ref 节点相应节点外点击事件
function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
