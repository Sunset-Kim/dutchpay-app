import { Group, Paper, PaperProps, Text } from "@mantine/core";

type NoContentProps = PaperProps & React.PropsWithChildren;

export default function NoContent({ children, ...props }: NoContentProps) {
  return (
    <Paper withBorder p="lg" radius="md" shadow="md" {...props}>
      <Group position="apart" mb="xs">
        <Text size="md" weight={500}>
          보여줄 내용이 없어요
        </Text>
      </Group>
      <Text color="dimmed" size="xs">
        {children}
      </Text>
    </Paper>
  );
}
