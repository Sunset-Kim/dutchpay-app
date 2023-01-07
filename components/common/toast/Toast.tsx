import { createStyles, DefaultMantineColor, keyframes, Notification, NotificationProps } from "@mantine/core";
import { useToast } from "../../../hooks/useToast";

export type ToastCategories = "warning" | "error" | "default" | "success";

export interface ToastProps extends Pick<NotificationProps, "title" | "children" | "onClose"> {
  duration: number;
  category: ToastCategories;
}

export const fade = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const useStyles = createStyles((theme, { duration }: { duration: number }) => ({
  play: {
    animation: `${fade} 1000ms ease-in-out`,
    animationDelay: `${duration}ms`,
    animationFillMode: "both",
    animationPlayState: "running",
  },

  pause: {
    animationPlayState: "paused",
  },
}));

const colorMap: Record<ToastCategories, DefaultMantineColor> = {
  default: "dark",
  success: "blue",
  error: "red",
  warning: "yellow",
};

function getColorFromCategory(category: ToastCategories): DefaultMantineColor {
  return colorMap[category];
}

export default function Toast(props: ToastProps) {
  const { classes, cx } = useStyles({ duration: props.duration });
  const { isRuning, toastRef, props: toastProps } = useToast(props);

  return (
    <Notification
      {...toastProps}
      className={cx(classes.play, { [classes.pause]: !isRuning })}
      ref={toastRef}
      color={getColorFromCategory(toastProps.category)}
    />
  );
}
