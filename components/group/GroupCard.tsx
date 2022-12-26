import { ActionIcon, Badge, Button, Divider, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import Link from "next/link";
import { IGroup } from "../../types/Group.type";

export interface GroupCardProps {
  group: IGroup;
  onDelete?: (group: IGroup) => void;
  readonly?: boolean;
}

export default function GroupCard({ group, readonly = false, onDelete }: GroupCardProps) {
  const { name, members } = group;
  const handleClick = () => {
    onDelete && onDelete(group);
  };

  return (
    <Paper data-testid={"group-card"} maw={340} shadow="sm" p="lg" radius="md" withBorder>
      <Group position="apart" align={"center"} mb="xs">
        <Text size="lg" weight={700}>
          {name}
        </Text>
        {onDelete && (
          <ActionIcon title="delete group" size={"sm"} color="red" onClick={handleClick}>
            <IconTrash />
          </ActionIcon>
        )}
      </Group>

      <Divider />

      <SimpleGrid cols={2} mt={"xs"} spacing={"xs"} verticalSpacing="xs">
        {members.map((member, i) => (
          <Badge key={member + i} variant="light">
            {member}
          </Badge>
        ))}
      </SimpleGrid>

      {!readonly && (
        <Button mt="lg" w="100%" variant="light" color={"orange.5"} href={`group/${group.id}`} component={Link}>
          추가정산하기
        </Button>
      )}
    </Paper>
  );
}
