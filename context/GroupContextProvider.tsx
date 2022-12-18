import { PropsWithChildren, useMemo, useState } from "react";
import { GroupContext, GroupControlAPI, GroupControlAPIContext } from "./GroupContext";

export default function GroupProvider({ children }: PropsWithChildren) {
  const [name, setName] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  const api: GroupControlAPI = useMemo(
    () => ({
      setGroupName: (newName: string) => {
        setName(newName);
      },
      addMember: (newMember: string) => {
        setMembers((prev) => [...prev, newMember]);
      },
      deleteMember: (memberName: string) => {
        setMembers((prev) => prev.filter((member) => member !== memberName));
      },
    }),
    [setName, setMembers]
  );

  return (
    <GroupContext.Provider value={{ name, members }}>
      <GroupControlAPIContext.Provider value={api}>{children}</GroupControlAPIContext.Provider>
    </GroupContext.Provider>
  );
}
