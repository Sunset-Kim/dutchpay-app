import { Group, Paper, PaperProps, Text } from "@mantine/core";
import { ReactNode } from "react";

interface NoContentProps extends PaperProps {
  title?: string | ReactNode;
}

export default function NoContent({ title, children, ...props }: NoContentProps) {
  return (
    <Paper withBorder p="lg" radius="md" shadow="md" {...props}>
      <Group position="apart" mb="xs">
        <Text size="md" weight={500}>
          {title ?? "보여줄 내용이 없어요"}
        </Text>
      </Group>
      <Text color="dimmed" size="xs">
        {children}
      </Text>
    </Paper>
  );
}
