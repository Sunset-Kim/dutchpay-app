import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import appConfig from "../../config";
import Localstorage from "../../libs/localstorage";
import { IGroup } from "../../types/Group.type";
import { GroupContext, GroupControlAPI, GroupControlAPIContext } from "./GroupContext";

export default function GroupProvider({ children }: PropsWithChildren) {
  const [groups, setGroups] = useState<Map<string, IGroup>>(new Map());

  useEffect(() => {
    const result = Localstorage.getItem(appConfig.localStorageKey, {
      defaultValue: new Map(),
    });
    setGroups(result);
  }, []);

  const api: GroupControlAPI = useMemo(
    () => ({
      addGroup: (group: IGroup) =>
        setGroups((prev) => {
          const result = new Map(prev);
          result.set(group.id, group);
          Localstorage.setItem(appConfig.localStorageKey, result);
          return result;
        }),
      deleteGroup: (group: IGroup) =>
        setGroups((prev) => {
          const result = new Map(prev);
          result.delete(group.id);
          Localstorage.setItem(appConfig.localStorageKey, result);
          return result;
        }),
      editGroupName: (group: IGroup, name: string) =>
        setGroups((prev) => {
          const result = new Map(prev);
          result.set(name, group);
          Localstorage.setItem(appConfig.localStorageKey, result);
          return result;
        }),
      addMember: (group: IGroup, member: string | string[]) => {
        const isMemberArary = Array.isArray(member);
        setGroups((prev) => {
          const result = new Map(prev);
          result.set(group.id, {
            ...group,
            members: isMemberArary ? [...group.members, ...member] : [...group.members, member],
          });
          Localstorage.setItem(appConfig.localStorageKey, result);
          return result;
        });
      },
      deleteMember: (group: IGroup, member: string) => {
        setGroups((prev) => {
          const result = new Map(prev);
          result.set(group.id, {
            ...group,
            members: group.members.filter((m) => m !== member),
          });

          Localstorage.setItem(appConfig.localStorageKey, result);
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
