import * as React from "react";
import { isFunction } from "../utils/trackers.util.js";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(initialValue);
  const [length, setLength] = React.useState(initialValue.length);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      const storedValue = item ? JSON.parse(item) : initialValue;
      setStoredValue(storedValue);
      const len = Array.isArray(storedValue)
        ? storedValue.length
        : initialValue.length;
      setLength(len);
      setLoading(false);
    }
  }, [key, initialValue]);

  const setValue = React.useCallback(
    (value) => {
      const newValue = isFunction(value) ? value(storedValue) : value;
      const len = Array.isArray(newValue)
        ? newValue.length
        : initialValue.length;
      setStoredValue(newValue);
      setLength(len);
      window.localStorage.setItem(key, JSON.stringify(newValue));
      window.localStorage.setItem(key + "_length", JSON.stringify(len));
    },
    [key, storedValue, initialValue]
  );

  return [storedValue, setValue, length, loading];
};

export default useLocalStorage;
