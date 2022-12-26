import GroupList from "../../components/group/GroupList";
import useGroup from "../../hooks/useGroup";
import { IGroup } from "../../types/Group.type";

export default function Groups() {
  const { groups, deleteGroup } = useGroup();

  const onDelete = (group: IGroup) => {
    deleteGroup(group);
  };

  return <GroupList groups={groups} onDelete={onDelete} />;
}
