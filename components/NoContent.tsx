import { Button, CloseButton, Group, Paper, Text } from "@mantine/core";

interface NoContentProps extends React.PropsWithChildren {}

export default function NoContent({ children }: NoContentProps) {
  return (
    <Paper withBorder p="lg" radius="md" shadow="md" maw={340} mx="auto">
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
