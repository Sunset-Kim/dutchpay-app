import { Container as MantineContainer, ContainerProps } from "@mantine/core";
import { PropsWithChildren } from "react";

export default function Container({ children, ...props }: PropsWithChildren<ContainerProps>) {
  return (
    <MantineContainer
      sx={(theme) => ({
        minWidth: "360px",
        height: "100%",
        [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
          maxWidth: "480px",
        },
        [`@media (min-width: ${theme.breakpoints.md}px)`]: {
          maxWidth: "760px",
        },
      })}
      {...props}
    >
      {children}
    </MantineContainer>
  );
}
