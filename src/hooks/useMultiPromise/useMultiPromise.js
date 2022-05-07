import { useState } from 'react';

export const useMultiPromise = () => {
  const [hookState, setHookState] = useState({
    loading: false,
    error: '',
    response: [],
  });
  const updateHookState = (newState = {}) => {
    setHookState({ ...hookState, ...newState });
  };
  function executePromise(promises = []) {
    updateHookState({ loading: true });
    Promise.allSettled(promises)
      .then((reposnses = []) => {
        const values = reposnses.filter((res) => res.status).map((promise) => promise.value);
        updateHookState({ response: values });
      })
      .catch(() => {
        updateHookState({ loading: false });
      });
  }
  const { response, loading, error } = hookState;
  return [executePromise, response, loading, error];
};
