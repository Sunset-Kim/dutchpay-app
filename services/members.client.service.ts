import { IMemberInfo } from "../models/interface/members.type";
import { getBaseUrl } from "../utils/getBaseUrl";
import { requester, Resp } from "./requester";

export async function memberFind(args: { member_id: string; isServer: boolean }): Promise<Resp<IMemberInfo | null>> {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/members/${args.member_id}`;
  try {
    const resp = await requester<IMemberInfo | null>({
      option: {
        url,
        method: "get",
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}

export async function memberAdd(args: {
  data: IMemberInfo;
  token: string;
  isServer: boolean;
}): Promise<Resp<IMemberInfo | null>> {
  const { isServer } = args;
  const hostAndPort: string = getBaseUrl(isServer);
  const url = `${hostAndPort}/api/members`;
  try {
    const resp = await requester<IMemberInfo | null>({
      option: {
        url,
        method: "post",
        data: args.data,
        headers: { authorization: args.token },
      },
    });
    return resp;
  } catch (err) {
    return {
      status: 500,
    };
  }
}
