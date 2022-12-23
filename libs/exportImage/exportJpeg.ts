import { toPng } from "html-to-image";

interface Option {
  maxWidth: number;
}

export const exportPNG = async ($element: HTMLElement | null, option?: Option) => {
  if (!$element) {
    return;
  }

  try {
    const dataUrl = await toPng($element, {
      quality: 0.95,
      cacheBust: true,
      pixelRatio: option?.maxWidth ? option.maxWidth / $element.clientWidth : 1,
    });
    const link = document.createElement("a");
    link.download = "my-expense-summary.png";
    link.href = dataUrl;
    link.click();
  } catch (error) {
    throw Error("toPNG Error");
  }
};
