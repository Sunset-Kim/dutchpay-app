import { Group, LoadingOverlay, Text, ThemeIcon } from "@mantine/core";
import { IconKey } from "@tabler/icons";
import useSWR, { useSWRConfig } from "swr";
import NoContent from "../../components/common/NoContent";
import GroupList from "../../components/group/GroupList";
import { useAuth } from "../../context/auth/authContext";
import GroupsClientService from "../../services/groups.client.service";

const groupsService = GroupsClientService.getInstance();

const fetcher = async () => {
  const res = await groupsService.getAllGroups();
  if (res.status !== 200) {
    throw res.error;
  }
  return res.payload;
};

export default function Groups() {
  const { authUser } = useAuth();
  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWR(authUser ? "api/groups" : null, fetcher);

  const onDelete = async (groupId: string) => {
    try {
      await groupsService.removeGroup({ groupId });
      await mutate("api/groups");
    } catch (error) {
      console.log("삭제실패");
    }
  };

  if (authUser === null) {
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

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  return <GroupList groups={data} onDelete={onDelete} />;
}
