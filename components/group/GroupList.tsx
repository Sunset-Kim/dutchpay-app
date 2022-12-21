import { Box, Button, Divider, SimpleGrid, Text } from "@mantine/core";
import Link from "next/link";
import { IGroup } from "../../types/Group.type";
import NoContent from "../common/NoContent";
import GroupCard from "./GroupCard";

export interface GroupListProps {
  groups: IGroup[];
  onDelete?: (id: string) => void;
}

export default function GroupList({ groups, onDelete }: GroupListProps) {
  if (groups.length === 0) {
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
      {groups.map((group, i) => (
        // TODO: unique key 변경
        <GroupCard key={"group" + i} group={group} onDelete={onDelete}></GroupCard>
      ))}
    </SimpleGrid>
  );
}