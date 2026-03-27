import { useEffect, useRef } from "react";

function usePreventRefresh(
  message: string = "Are you sure you want to refresh?"
) {
  const enabledRef = useRef(true);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!enabledRef.current) return;
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [message]);

  const disable = () => {
    enabledRef.current = false;
  };

  return { disable };
}

export default usePreventRefresh;
