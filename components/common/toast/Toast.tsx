import { createStyles, DefaultMantineColor, keyframes, Notification, NotificationProps } from "@mantine/core";
import { IconAlertTriangle, IconCheck, IconUrgent } from "@tabler/icons";
import { ReactNode } from "react";
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
  success: "teal",
  error: "red",
  warning: "yellow",
};

const titleMap: Record<ToastCategories, string> = {
  default: "알림",
  success: "요청성공",
  error: "요청실패",
  warning: "경고",
};

const iconMap: Record<ToastCategories, ReactNode> = {
  default: undefined,
  success: <IconCheck />,
  error: <IconAlertTriangle />,
  warning: <IconUrgent />,
};

function getNotificationPorps(category: ToastCategories): NotificationProps {
  return {
    icon: iconMap[category],
    title: titleMap[category],
    color: colorMap[category],
  };
}

export default function Toast(props: ToastProps) {
  const { classes, cx } = useStyles({ duration: props.duration });
  const { isRuning, toastRef, props: toastProps } = useToast(props);

  return (
    <Notification
      {...toastProps}
      className={cx(classes.play, { [classes.pause]: !isRuning })}
      ref={toastRef}
      {...getNotificationPorps(props.category)}
    />
  );
}
