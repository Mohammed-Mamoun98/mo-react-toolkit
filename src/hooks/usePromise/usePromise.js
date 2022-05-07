import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createNotification } from '../../redux/actions/uiActions';

/**
 *  const promiseFunc = () => new Promise((resolve,reject) => resolove({ count : 1 }))
 *
 *  const [
 *  getData: fucntion, // initiate the request by calling this func.
 *  data: any,    // the resolved promise data => { count : 1 }
 *  loading: boolean,  // promise resolving loading
 *  error: Error,  // error object in case promise rejected
 * ] = usePromise(promiseFunction)
 *
 */

const DEFAULT_ERROR = 'Internal Server Error';

const sleep = (ms = 10) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms),
  );

export const usePromise = (promiseFunction = () => {}, baseConfig = {}) => {
  const dispatch = useDispatch();
  const [hookState, setHookState] = useState({
    response: baseConfig?.defaultRes,
    loading: false,
    error: '',
  });

  const updateHookState = (newState = {}) => {
    setHookState({ ...hookState, ...newState });
  };

  const updateResponse = (res) => updateHookState({ response: res });

  function executePromise(...params) {
    updateHookState({ loading: true });
    return new Promise((resolve, reject) => {
      try {
        const onSuccess = params?.find((param) => param?.onSuccess)?.onSuccess || baseConfig?.onSuccess;

        return promiseFunction(...params)
          .then(async (value) => {
            await sleep(baseConfig.sleep);
            if (baseConfig.showSuccess) dispatch(createNotification('success', baseConfig.showSuccess, 4000));
            updateHookState({ response: value, loading: false });
            onSuccess?.(value);
            resolve(value);
          })
          .catch((err) => {
            const errorMessage = err?.error?.message || err?.message || err || DEFAULT_ERROR;
            if (baseConfig.showError) dispatch(createNotification('error', errorMessage, 4000));
            updateHookState({ error: err, loading: false });
            baseConfig.onError?.(errorMessage);
            reject(err);
          });
      } catch (error) {
        updateHookState({ error, loading: false });
        const errorMessage = error?.message || error || DEFAULT_ERROR;
        if (baseConfig.showError) dispatch(createNotification('error', errorMessage, 4000));
        reject(error);
      }
    });
  }
  useEffect(() => {
    if (baseConfig.initReq) executePromise();
  }, []);

  const { response, loading, error, reqCount = 0 } = hookState;
  return [executePromise, response, loading, error, reqCount, updateResponse];
};
