import { ActionIcon, Badge, Box, Button, Divider, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { IGroup } from "../../types/Group.type";

dayjs.extend(relativeTime).locale(ko);
export interface GroupCardProps {
  group: IGroup;
  onDelete?: (id: string) => void;
  readonly?: boolean;
}

export default function GroupCard({ group, readonly = false, onDelete }: GroupCardProps) {
  const { name, members, id, createdAt, updatedAt } = group;
  const handleClick = () => {
    onDelete && onDelete(id);
  };

  const relativeUpdateDate =
    updatedAt?._seconds &&
    dayjs(updatedAt._seconds * 1000)
      .locale("ko")
      .fromNow();

  return (
    <Paper data-testid={"group-card"} maw={340} shadow="sm" p="lg" radius="md" withBorder>
      <Box>
        <Group position="apart" align={"center"} mb={4}>
          <Text size="lg" weight={700}>
            {name}
          </Text>
          {onDelete && (
            <ActionIcon title="delete group" size={"md"} color="red" onClick={handleClick}>
              <IconTrash />
            </ActionIcon>
          )}
        </Group>

        <Divider />
        <Group pt={4} position="right">
          <Text size="sm" color="dimmed">
            {relativeUpdateDate && `${relativeUpdateDate} 수정됨`}
          </Text>
        </Group>
      </Box>

      <Paper>
        <SimpleGrid cols={2} mt={"xs"} spacing={"xs"} verticalSpacing="xs">
          {members.map((member, i) => (
            <Badge key={member + i} variant="light">
              {member}
            </Badge>
          ))}
        </SimpleGrid>
      </Paper>

      {!readonly && (
        <Button mt="lg" w="100%" variant="light" color={"orange.5"} href={`group/${group.id}`} component={Link}>
          추가정산하기
        </Button>
      )}
    </Paper>
  );
}
