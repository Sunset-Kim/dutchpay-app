import { PropsWithChildren, useMemo, useState } from "react";
import { IGroup } from "../../types/Group.type";
import { GroupContext, GroupControlAPI, GroupControlAPIContext } from "./GroupContext";

export default function GroupProvider({ children }: PropsWithChildren) {
  const [groups, setGroups] = useState<Map<string, IGroup>>(new Map());

  const api: GroupControlAPI = useMemo(
    () => ({
      addGroup: (group: IGroup) => setGroups((prev) => prev.set(group.name, group)),
      deleteGroup: (group: IGroup) =>
        setGroups((prev) => {
          const result = { ...prev };
          result.delete(group.name);
          return result;
        }),
      editGroupName: (group: IGroup, name: string) =>
        setGroups((prev) => {
          const result = { ...prev };
          result.set(name, group);
          return result;
        }),
      addMember: (group: IGroup, member: string | string[]) => {
        const isMemberArary = Array.isArray(member);
        setGroups((prev) => {
          const result = { ...prev };
          result.set(group.name, {
            ...group,
            members: isMemberArary ? [...group.members, ...member] : [...group.members, member],
          });
          return result;
        });
      },
      deleteMember: (group: IGroup, member: string) => {
        setGroups((prev) => {
          const result = { ...prev };
          result.set(group.name, {
            ...group,
            members: group.members.filter((m) => m !== member),
          });
          return result;
        });
      },
    }),
    [setGroups]
  );

  return (
    <GroupContext.Provider value={{ groups }}>
      <GroupControlAPIContext.Provider value={api}>{children}</GroupControlAPIContext.Provider>
    </GroupContext.Provider>
  );
}
