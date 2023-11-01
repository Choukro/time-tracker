import * as React from "react";
import { isFunction } from "../utils/trackers.util.js";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });

  const setValue = React.useCallback(
    (value) => {
      if (typeof window !== "undefined") {
        setStoredValue(value);
        window.localStorage.setItem(
          key,
          JSON.stringify(isFunction(value) ? value(storedValue) : value)
        );
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

export default useLocalStorage;
