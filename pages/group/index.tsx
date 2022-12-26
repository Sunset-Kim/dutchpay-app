import { useState } from "react";
import GroupList from "../../components/group/GroupList";
import { IGroup } from "../../types/Group.type";

export default function Groups() {
  const [groups, setGroups] = useState<IGroup[]>([]);

  // TODO: GROUP 삭제지원
  const onDelete = () => {
    console.log("group 삭제");
  };

  return <GroupList groups={[]} onDelete={onDelete} />;
}
