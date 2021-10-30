import { useEffect, useRef, useState } from 'react';

type useCountdownParams = {
  seconds: number; // 倒计时总数
  hintText: string;
  format?: string; // '%c秒后重试'
  onCompleted?: VoidFunction; // 倒计时结束时回调
};

/**
 * @name useCountdown
 * @description React hook countdown timer.
 * @param seconds required 倒计时的总数
 * @param hintText required 非倒计时阶段显示文本
 * @param format 返回显示文字格式：「'%c」会全局被替换为剩余时间秒数
 * @param onCompleted 倒计时结束回调
 * @returns
 */
const useCountdown = ({
  seconds = 0,
  hintText = '',
  format = '%c秒后重试',
  onCompleted,
}: useCountdownParams) => {
  const id = useRef(0);
  const initTime = seconds * 1000;

  const [remainingTime, setRemainingTime] = useState(initTime);
  const [returnText, setReturnText] = useState(hintText);
  const [isRunning, setIsRunning] = useState(false);

  const calculateRemainingTime = () => {
    setRemainingTime((time) => {
      if (time - 1000 <= 0) {
        clearInterval(id.current);
        onCompleted?.();
        setIsRunning(false);
        setRemainingTime(initTime);
        return 0;
      }

      return time - 1000;
    });
  };

  useEffect(() => {
    return () => window.clearInterval(id.current);
  }, []);

  useEffect(
    () => {
      if (isRunning) {
        id.current = window.setInterval(calculateRemainingTime, 1000);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRunning],
  );

  useEffect(() => {
    if (remainingTime - 1000 < 0 || !isRunning) {
      setReturnText(hintText);
    } else if (format.includes('%c')) {
      setReturnText(format.replace(/%c/g, `${remainingTime / 1000}`));
    } else {
      setReturnText(`${remainingTime / 1000}`);
    }
  }, [isRunning, remainingTime, hintText, format]);

  // 开始倒计时
  const begin = isRunning ? () => {} : () => setIsRunning(true);
  // 取消倒计时
  const cancel = () => {
    clearInterval(id.current);
    setIsRunning(false);
    setRemainingTime(initTime);
  };

  return {
    count: remainingTime / 1000,
    text: returnText,
    begin,
    cancel,
    isRunning,
  };
};

export default useCountdown;
