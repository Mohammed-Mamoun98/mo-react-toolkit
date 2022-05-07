import { useState, useEffect } from 'react';

export const useDebounce = (dependancy = null, sleep = 800) => {
  const [value, setValue] = useState(dependancy);
  const [loading, setLoading] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
    if (!rendered) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setValue(dependancy);
      setLoading(false);
    }, [sleep]);

    return () => {
      clearTimeout(timer);
    };
  }, [dependancy]);

  return [value, loading, setValue];
};
