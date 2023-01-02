import { NextApiRequest, NextApiResponse } from "next";

import { IncomingHttpHeaders } from "http";
import firebaseAdmin from "../../models/common/firebase_admin.model";
import validateParamWithData from "../../models/common/req_validator";
import { IMemberInfo } from "../../models/interface/members.type";
import * as MemberModels from "../../models/members/member.model";
import SchemaAddMember from "../../models/members/schema/member.add.schema";
import SchemaMemberFind from "../../models/members/schema/member.find.schema";
import debug from "../../utils/debug_log";
import getStringValueFromQuery from "../../utils/getValueFromQuery";

const log = debug("Server:controller:members");

/** 멤버 조회 */
async function find({
  query,
  res,
}: {
  query: NextApiRequest["query"];
  res: NextApiResponse;
}): Promise<void | NextApiResponse<any>> {
  log("find");
  const userId = getStringValueFromQuery({ query, field: "id" });
  if (userId === undefined) {
    return res.status(400).end();
  }
  // 요청한 값 확인
  const { success, data, error } = validateParamWithData<{ id: string }>({ id: userId }, SchemaMemberFind);
  if (success === false) {
    return res.status(400).end();
  }
  // db 조회
  const resp = await MemberModels.memberFind({ user_id: data.id });
  log(resp);
  if (resp === undefined || resp === null) {
    return res.status(404).end();
  }
  return res.json(resp);
}

/** 멤버 추가 */
async function add({
  headers,
  body,
  res,
}: {
  headers: IncomingHttpHeaders;
  body: IMemberInfo;
  res: NextApiResponse;
}): Promise<void | NextApiResponse<any>> {
  log("add");
  const token = headers.authorization;
  if (token === undefined) {
    return res.status(400).end();
  }
  try {
    await firebaseAdmin.Auth.verifyIdToken(token);
  } catch (err) {
    return res.status(400).end();
  }

  const { success, data, error } = validateParamWithData<IMemberInfo>(body, SchemaAddMember);

  if (success === false) {
    return res.status(400).end(error);
  }
  // 이미 사용자가 존재하는지 확인
  const findResp = await MemberModels.memberFind({ user_id: data.uid });
  if (!(findResp === undefined || findResp === null)) {
    return res.json(findResp);
  }
  log(body);

  // 새로 추가
  const addResp = await MemberModels.memberAdd({ ...body });
  if (addResp === null) {
    return res.status(500).end();
  }
  return res.json(addResp);
}

export default { find, add };
