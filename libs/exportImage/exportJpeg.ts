import { toPng } from "html-to-image";

export const exportPNG = async ($element: HTMLElement | null) => {
  if (!$element) {
    return;
  }

  try {
    const dataUrl = await toPng($element, { quality: 0.95, cacheBust: true });
    const link = document.createElement("a");
    link.download = "my-expense-summary.png";
    link.href = dataUrl;
    link.click();
  } catch (error) {
    throw Error("toPNG Error");
  }
};
