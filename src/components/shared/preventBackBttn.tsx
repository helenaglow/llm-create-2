import { useEffect } from "react";

export default function usePreventBack(
  message: string = "Are you sure you want to go back?",
  setHasPressedBack: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);

    const handlePopState = () => {
      alert(message);
      setHasPressedBack(true);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [message, setHasPressedBack]);
}
