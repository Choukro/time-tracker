import * as React from "react";
import { isFunction } from "../utils/trackers.util.js";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  const setValue = React.useCallback(
    (value) => {
      setStoredValue(value);
      window.localStorage.setItem(
        key,
        JSON.stringify(isFunction(value) ? value(storedValue) : value)
      );
    },
    [key, storedValue]
  );
  return [storedValue, setValue];
};

// const useLocalStorage = (key, initialValue) => {
//   const [storedValue, setStoredValue] = React.useState(initialValue);

//   React.useEffect(() => {
//     const item = window.localStorage.getItem(key);
//     if (item) {
//       setStoredValue(JSON.parse(item));
//     }
//   }, [key]);

//   const setValue = React.useCallback(
//     (value) => {
//       setStoredValue((prev) => {
//         const newValue = isFunction(value) ? value(prev) : value;
//         window.localStorage.setItem(key, JSON.stringify(newValue));
//         return newValue;
//       });
//     },
//     [key]
//   );

//   return [storedValue, setValue];
// };

export default useLocalStorage;
