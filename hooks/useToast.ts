import { useEffect, useRef, useState } from "react";
import { ToastProps } from "../components/common/toast/Toast";
export const useToast = (props: ToastProps) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [isRuning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    onOpen();
    if (toastRef.current) {
      toastRef.current.addEventListener("animationend", end);
      toastRef.current.addEventListener("mouseover", pause);
      toastRef.current.addEventListener("mouseout", play);
    }
    return () => {
      if (toastRef.current) {
        toastRef.current.removeEventListener("animationend", end);
        toastRef.current.removeEventListener("mouseover", pause);
        toastRef.current.removeEventListener("mouseout", play);
      }
    };
  }, []);

  const onOpen = () => {
    setIsRunning(true);
  };

  const play = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const end = () => {
    props.onClose && props.onClose();
  };

  return {
    end,
    isRuning,
    toastRef,
    props: {
      ...props,

      onClose: end,
    },
  };
};
