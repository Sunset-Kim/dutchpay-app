import { createContext } from "react";
import { IGroup } from "../../types/Group.type";
import { ExpenseInfo } from "./../../types/Expense.type";

export interface GroupState {
  groups: Map<string, IGroup>;
}

export interface GroupControlAPI {
  addGroup: (group: IGroup) => void;
  deleteGroup: (group: IGroup) => void;
  editGroupName: (group: IGroup, name: string) => void;

  addMember: (group: IGroup, member: string | string[]) => void;
  deleteMember: (group: IGroup, member: string) => void;

  addExpenseList: (group: IGroup, expenseInfo: ExpenseInfo) => void;
  deleteExpense: (group: IGroup, id: string) => void;
}

export const GroupContext = createContext<GroupState>({
  groups: new Map(),
});

export const GroupControlAPIContext = createContext<GroupControlAPI>({
  addGroup: () => {},
  deleteGroup: () => {},
  editGroupName: () => {},
  addMember: () => {},
  deleteMember: () => {},
  addExpenseList: () => {},
  deleteExpense: () => {},
});
