import { useEffect, useState } from 'react';

export const useTimer = (timeInSec = 0) => {
  const [seconds, setSeconds] = useState(timeInSec);

  useEffect(() => {
    setSeconds(timeInSec);
  }, [timeInSec]);

  const decreasTime = () => {
    if (seconds) setSeconds((sec) => sec - 1);
  };

  useEffect(() => {
    if (!seconds || seconds < 0) return;
    const interval = setInterval(() => {
      if (seconds) decreasTime();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  return [seconds];
};
