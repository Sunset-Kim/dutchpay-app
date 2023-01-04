import useSWR, { useSWRConfig } from "swr";
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
  const { data } = useSWR(authUser ? "api/groups" : null, fetcher);

  const onDelete = async (groupId: string) => {
    try {
      await groupsService.removeGroup({ groupId });
      await mutate("api/groups");
    } catch (error) {
      console.log("삭제실패");
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return <GroupList groups={data} onDelete={onDelete} />;
}
