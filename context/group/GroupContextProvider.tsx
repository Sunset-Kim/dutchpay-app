import { PropsWithChildren, useMemo, useState } from "react";
import { IGroup } from "../../types/Group.type";
import { GroupContext, GroupControlAPI, GroupControlAPIContext } from "./GroupContext";

export default function GroupProvider({ children }: PropsWithChildren) {
  const [groups, setGroups] = useState<IGroup[]>([]);

  const api: GroupControlAPI = useMemo(
    () => ({
      addGroup: (group: IGroup) => setGroups((prev) => [...prev, group]),
      deleteGroup: (group: IGroup) => setGroups((prev) => prev.filter((g) => g !== group)),
      editGroupName: (group: IGroup, name: string) =>
        setGroups((prev) =>
          prev.map((g) => {
            if (g.name === group.name) {
              return { ...g, name };
            }
            return g;
          })
        ),
      addMember: (group: IGroup, member: string | string[]) => {
        const isMemberArary = Array.isArray(member);
        setGroups((prev) =>
          prev.map((g) => {
            if (g === group) {
              return {
                ...g,
                members: isMemberArary ? [...g.members, ...member] : [...g.members, member],
              };
            }

            return g;
          })
        );
      },
      deleteMember: (group: IGroup, member: string) => {
        setGroups((prev) =>
          prev.map((g) => {
            if (g === group) {
              return {
                ...g,
                members: g.members.filter((m) => m !== member),
              };
            }
            return g;
          })
        );
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
