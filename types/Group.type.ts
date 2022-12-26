import { Member } from "./Member.type";

export interface IGroup {
  id: string;
  name: string;
  members: Member[];
}
