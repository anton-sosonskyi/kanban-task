import { useState } from 'react';

export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const saveData = (data: T) => {
    setValue(data);
    sessionStorage.setItem(key, JSON.stringify(data));
  };

  return [value, saveData];
}
