import { replacer } from "../json/replacer";
import { reviver } from "../json/reviver";

export interface LocalstroageOption<T> {
  onError?: () => void;
  onSucess?: (value: T) => T;
  defaultValue?: T;
}

export default class Localstorage {
  static getItem<T = any>(key: string, option?: LocalstroageOption<T>) {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return option?.onSucess ? option.onSucess(JSON.parse(item, reviver)) : (JSON.parse(item, reviver) as T);
      }
      return option?.defaultValue;
    } catch (error) {
      console.warn("localstorage:: parse 실패", error);

      if (option?.onError) {
        option.onError();
      }

      return option?.defaultValue;
    }
  }

  static setItem(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value, replacer));
    } catch (error) {
      console.warn("localstorage:: set 실패", error);
    }
  }

  static clearItem() {
    localStorage.clear();
  }

  static deleteItem(key: string) {
    localStorage.removeItem(key);
  }
}
