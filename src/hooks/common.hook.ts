import { MutableRefObject, useEffect } from "react";

export const useClickOutside = ({
  ref,
  callback,
}: {
  ref: MutableRefObject<any>;
  callback: VoidFunction;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);
};
