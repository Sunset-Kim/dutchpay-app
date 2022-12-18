import { createContext } from "react";

export interface GroupState {
  name: string;
  members: string[];
}

export interface GroupControlAPI {
  setGroupName: (name: string) => void;
  addMember: (name: string) => void;
  deleteMember: (name: string) => void;
}

export const GroupContext = createContext<GroupState>({
  name: "",
  members: [],
});

export const GroupControlAPIContext = createContext<GroupControlAPI>({
  setGroupName: () => {},
  addMember: () => {},
  deleteMember: () => {},
});
