import { Box, Button, Divider, Group, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import Link from "next/link";
import { IGroup } from "../../types/Group.type";
import NoContent from "../common/NoContent";
import GroupCard from "./GroupCard";

export interface GroupListProps {
  groups: IGroup[] | null | undefined;
  onDelete?: (id: string) => void;
}

export default function GroupList({ groups, onDelete }: GroupListProps) {
  if (groups == null || groups.length === 0) {
    return (
      <NoContent>
        <Box mb="xs">
          <Text>🐱 아직 그룹이 없으시네요</Text>
          <Text>그룹을 추가하시고 정산정보를 입력해보세요</Text>
        </Box>
        <Divider mb="xs" display="block" />

        <Button variant="outline">
          <Link href={"/group/create"}>그룹생성하러 가기</Link>
        </Button>
      </NoContent>
    );
  }

  return (
    <SimpleGrid w="100%" cols={2} spacing="xs" verticalSpacing="xs">
      <NoContent
        title={
          <Group spacing={"xs"}>
            <ThemeIcon radius="xl" variant="light" size={"lg"}>
              <IconPlus />
            </ThemeIcon>
            <Text weight={"bold"}>그룹추가</Text>
          </Group>
        }
      >
        <Box mb="xs">
          <Text>🐱 또 정산하고 싶은 그룹이 있나요?</Text>
          <Text>그룹을 추가하시고 정산정보를 입력해보세요</Text>
        </Box>
        <Divider mb="xs" display="block" />

        <Button variant="outline">
          <Link href={"/group/create"}>그룹생성하러 가기</Link>
        </Button>
      </NoContent>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} onDelete={onDelete}></GroupCard>
      ))}
    </SimpleGrid>
  );
}
