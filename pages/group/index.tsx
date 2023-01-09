import { LoadingOverlay } from "@mantine/core";
import useSWR, { useSWRConfig } from "swr";
import NoAuth from "../../components/common/NoAuth";
import GroupList from "../../components/group/GroupList";
import { useAuth } from "../../context/auth/authContext";
import toast from "../../libs/toast";
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
      toast.success("그룹삭제 성공");
    } catch (error) {
      toast.success("그룹삭제 실패");
    }
  };

  if (authUser === null) {
    return <NoAuth />;
  }

  if (isLoading) {
    return <LoadingOverlay visible={isLoading} />;
  }

  return <GroupList groups={data} onDelete={onDelete} />;
}
