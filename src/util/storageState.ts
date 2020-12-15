import React, { Dispatch, SetStateAction } from 'react';

function getItem (sessionStorageKey: string,  storage: Storage) {
  const valueStr = storage.getItem(sessionStorageKey);
  if (valueStr == null) {
    return;
  }
  try {
    return JSON.parse(valueStr);
  } catch (e) {
    return valueStr;
  }
}

function useStateWithLocalStorage<S>(sessionStorageKey: string, initialState: S, storage: Storage) : [S, Dispatch<SetStateAction<S>>] {
  let state: S = initialState;
  if (getItem(sessionStorageKey, storage) != null) {
    state = getItem(sessionStorageKey, storage);
  }
  const [value, setValue] = React.useState(state);

  React.useEffect(() => {
    let valueStr;
    if (typeof value !== 'string') {
      valueStr = JSON.stringify(value);
    } else {
      valueStr = value;
    }
    storage.setItem(sessionStorageKey, valueStr);
  }, [storage, sessionStorageKey, value]);

  React.useEffect(() => {
    const i = getItem(sessionStorageKey, storage);
    if (i != null) {
      setValue(i);
    }
  }, [storage, sessionStorageKey]);
  return [value, setValue];
}

export default useStateWithLocalStorage;