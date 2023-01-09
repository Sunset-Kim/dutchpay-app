import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconKey } from "@tabler/icons";
import NoContent from "./NoContent";

export default function NoAuth() {
  return (
    <NoContent
      title={
        <Group>
          <ThemeIcon size="xl" variant="light" radius="xl" color="yellow">
            <IconKey />
          </ThemeIcon>
          <Text size="lg">로그인이 필요한 페이지 입니다</Text>
        </Group>
      }
    >
      상단의 버튼을 이용해서 로그인을 진행해주세요. 저장한 정보는 안전하게 보관됩니다.
    </NoContent>
  );
}
