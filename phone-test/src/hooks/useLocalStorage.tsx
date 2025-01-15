import { useCallback, useMemo } from 'react';

export const useLocalStorage = <T,>(keyName: string, defaultValue?: T) => {
  const storedValue = useMemo(() => {
    const value = window.localStorage.getItem(keyName);

    if (value) return JSON.parse(value);
    else return defaultValue;
  }, [keyName, defaultValue]);

  const setStoredValue = useCallback(
    (newValue: any, shouldDispatchEvent: boolean) => {
      if (newValue) window.localStorage.setItem(keyName, JSON.stringify(newValue));
      else window.localStorage.removeItem(keyName);

      if (shouldDispatchEvent)
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: keyName,
            newValue
          })
        );
    },
    [keyName]
  );

  return [storedValue, setStoredValue];
};
