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
          <Text>๐ฑ ์์ง ๊ทธ๋ฃน์ด ์์ผ์๋ค์</Text>
          <Text>๊ทธ๋ฃน์ ์ถ๊ฐํ์๊ณ  ์ ์ฐ์ ๋ณด๋ฅผ ์๋ ฅํด๋ณด์ธ์</Text>
        </Box>
        <Divider mb="xs" display="block" />

        <Button variant="outline">
          <Link href={"/group/create"}>๊ทธ๋ฃน์์ฑํ๋ฌ ๊ฐ๊ธฐ</Link>
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
            <Text weight={"bold"}>๊ทธ๋ฃน์ถ๊ฐ</Text>
          </Group>
        }
      >
        <Box mb="xs">
          <Text>๐ฑ ๋ ์ ์ฐํ๊ณ  ์ถ์ ๊ทธ๋ฃน์ด ์๋์?</Text>
          <Text>๊ทธ๋ฃน์ ์ถ๊ฐํ์๊ณ  ์ ์ฐ์ ๋ณด๋ฅผ ์๋ ฅํด๋ณด์ธ์</Text>
        </Box>
        <Divider mb="xs" display="block" />

        <Button variant="outline">
          <Link href={"/group/create"}>๊ทธ๋ฃน์์ฑํ๋ฌ ๊ฐ๊ธฐ</Link>
        </Button>
      </NoContent>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} onDelete={onDelete}></GroupCard>
      ))}
    </SimpleGrid>
  );
}
