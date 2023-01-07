import { ReactNode } from "react";
import { ToastCategories } from "../../components/common/toast/Toast";
import { publish } from "../events/event";

export interface ToastOptions {
  title?: string;
  duration: number;
  category: ToastCategories;
}

class Toast {
  static instance: Toast;
  private defaultToastOption: ToastOptions = {
    duration: 2000,
    category: "default",
  };
  private constructor() {}

  getDefaultCategoryOption = (category: ToastCategories) => ({ ...this.defaultToastOption, category });

  getToastOptions =
    (defaultOpt: ToastOptions) =>
    (option?: Partial<ToastOptions>): ToastOptions => {
      const opt = Object.keys(defaultOpt).reduce((obj, name) => {
        const key = name as keyof ToastOptions;
        //@ts-ignore
        obj[key] = option?.[key] || defaultOpt[key];
        return obj;
      }, {} as ToastOptions);

      return opt;
    };

  static getInstacne() {
    if (!Toast.instance) {
      Toast.instance = new Toast();
      return Toast.instance;
    }

    return Toast.instance;
  }

  success(content: ReactNode, options?: ToastOptions) {
    const defaultOption = this.getDefaultCategoryOption("success");

    publish("show", {
      children: content,
      ...this.getToastOptions(defaultOption)(options),
    });
  }

  error(content: ReactNode, options?: ToastOptions) {
    const defaultOption = this.getDefaultCategoryOption("error");
    publish("show", {
      children: content,
      ...this.getToastOptions(defaultOption)(options),
    });
  }
}
const toast = Toast.getInstacne();
export default toast;
