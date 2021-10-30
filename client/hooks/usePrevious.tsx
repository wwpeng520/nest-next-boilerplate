import { useEffect, useRef } from 'react';

function usePrevious(preValue: any) {
  const ref = useRef();

  useEffect(() => {
    ref.current = preValue;
  }, [preValue]);

  return ref.current;
}

export default usePrevious;
