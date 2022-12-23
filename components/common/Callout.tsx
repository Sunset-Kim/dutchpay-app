import { Paper, ThemeIcon } from "@mantine/core";
import { IconBulb } from "@tabler/icons";
import { PropsWithChildren } from "react";

export default function Callout({ children }: PropsWithChildren) {
  return (
    <Paper p="xs" bg={"gray.1"} shadow="xs" mb="sm">
      <ThemeIcon
        color="yellow"
        mr="sm"
        sx={{
          float: "left",
        }}
      >
        <IconBulb />
      </ThemeIcon>
      {children}
    </Paper>
  );
}
