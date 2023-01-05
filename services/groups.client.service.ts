import firebaseAuthClient from "../models/common/firebase_auth_client.model";
import { IGroup } from "../types/Group.type";
import { getBaseUrl } from "../utils/getBaseUrl";
import { IAddGroups } from "./../models/groups/schema/groups.add.schema";
import { requester, Resp } from "./requester";

export default class GroupsClientService {
  private hostAndPort: string = getBaseUrl(false);
  private baseUrl: string = `${this.hostAndPort}/api/groups`;
  private static instance: GroupsClientService;

  private constructor() {}

  public static getInstance(): GroupsClientService {
    if (!GroupsClientService.instance) {
      GroupsClientService.instance = new GroupsClientService();
    }
    return GroupsClientService.instance;
  }

  async getAllGroups(): Promise<Resp<IGroup[] | null>> {
    const token = await firebaseAuthClient.Auth.currentUser?.getIdToken();

    try {
      const res = await requester<IGroup[]>({
        option: {
          url: this.baseUrl,
          method: "GET",
          headers: { authorization: token },
        },
      });

      return res;
    } catch (error) {
      return {
        status: 500,
      };
    }
  }

  async getGroup(args: { groupId: string }): Promise<Resp<IGroup | null>> {
    const { groupId } = args;
    const token = await firebaseAuthClient.Auth.currentUser?.getIdToken();
    const url = `${this.baseUrl}/${groupId}`;
    try {
      const res = await requester<IGroup>({
        option: {
          method: "GET",
          url,
          headers: { authorization: token },
        },
      });

      return res;
    } catch (error) {
      return {
        status: 500,
      };
    }
  }

  async addGroup(args: IAddGroups): Promise<Resp<{ groupId: string } | null>> {
    const token = await firebaseAuthClient.Auth.currentUser?.getIdToken();

    const url = `${this.baseUrl}`;
    try {
      const response = await requester<{ groupId: string }>({
        option: {
          method: "POST",
          headers: { authorization: token },
          url,
          data: args,
        },
      });

      return response;
    } catch (error) {
      return {
        status: 500,
      };
    }
  }

  async removeGroup({ groupId }: { groupId: string }): Promise<Resp<null>> {
    const token = await firebaseAuthClient.Auth.currentUser?.getIdToken();

    const url = `${this.baseUrl}/${groupId}`;

    try {
      const response = await requester<null>({
        option: {
          method: "DELETE",
          headers: { authorization: token },
          url,
        },
      });
      return response;
    } catch (error) {
      return {
        status: 500,
      };
    }
  }
}
