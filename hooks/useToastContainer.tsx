import { ReactNode, useEffect, useRef, useState } from "react";
import Toast, { ToastProps } from "../components/common/toast/Toast";
import { subscribe, unsubscribe } from "../libs/events/event";
import { ToastOptions } from "../libs/toast";
export const useToastContainer = () => {
  const [queue, setQueue] = useState<number[]>([]);
  const toastMap = useRef(new Map<number, ToastProps>()).current;

  useEffect(() => {
    subscribe("show", buildToast);
    subscribe("dismiss", dismissToast);

    return () => {
      unsubscribe("show", buildToast);
      unsubscribe("dismiss", dismissToast);
    };
  }, []);

  const dismissToast = (e: any) => {
    const { id } = e.detail;
    if (!id) return;
    deleteToast(id);
  };

  const buildToast = (e: any) => {
    const id = new Date().getTime();

    const props = e.detail;

    console.log(e);

    appendToast(id, props);
  };

  const appendToast = (id: number, props: ToastOptions) => {
    toastMap.set(id, { ...props, onClose: () => deleteToast(id) });

    setQueue((prev) => [...prev, id]);
  };

  const deleteToast = (id: number) => {
    if (!id) return;
    toastMap.delete(id);
    setQueue((ids) => ids.filter((toastId) => toastId !== id));
  };

  const renderToast = () => {
    const renderList: ReactNode[] = [];

    [...toastMap.entries()].forEach(([id, props]) => {
      if (queue.includes(id)) {
        const toast = <Toast key={id} {...props} />;
        renderList.push(toast);
      } else {
        toastMap.delete(id);
      }
    });

    return renderList;
  };

  return {
    renderToast,
  };
};
