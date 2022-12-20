import { Badge, Divider, Group, Paper, Stack, Text } from "@mantine/core";

interface GroupProps {
  members: string[];
  name: string;
}

export default function SelectedGroup({ members, name }: GroupProps) {
  return (
    <Paper maw={340} shadow="sm" p="lg" radius="md" withBorder>
      <Text size="lg" mb="md" weight={500}>
        {name}
      </Text>

      <Divider />

      <Stack py="lg" spacing={0}>
        <Group spacing="xs">
          {members.map((member, i) => (
            <Badge key={member + i} variant="light">
              {member}
            </Badge>
          ))}
        </Group>
      </Stack>
    </Paper>
  );
}
