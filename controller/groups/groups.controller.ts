import validateParamWithData from "../../models/common/req_validator";
import { groupsModel } from "../../models/groups/groups.model";
import SchemaUpdateGroups, { IUpdateGroups } from "../../models/groups/schema/groups.update.schema";
import debug from "../../utils/debug_log";
import getStringValueFromQuery from "../../utils/getValueFromQuery";
import verifyToken from "../../utils/verify_token";
import { ControllerInput } from "../interface/controller_Input.type";
import SchemaAddGroups, { IAddGroups } from "./../../models/groups/schema/groups.add.schema";

const log = debug("controller:groups");

const add = async ({ headers, body, res }: Omit<ControllerInput<IAddGroups>, "query">) => {
  log("add");
  const token = headers.authorization;

  try {
    await verifyToken(token);
  } catch (error) {
    return res.status(401).end();
  }

  const { success, data, error } = validateParamWithData<IAddGroups>(body, SchemaAddGroups);
  if (success === false) {
    return res.status(400).json(error);
  }

  const findResp = await groupsModel.addGroups(data);
  if (!(findResp === null)) {
    log(findResp);
    return res.json(findResp);
  }
};

const remove = async ({ query, headers, res }: Omit<ControllerInput, "body">) => {
  log("remove");

  const token = headers.authorization;
  try {
    await verifyToken(token);
  } catch (error) {
    return res.status(401).end();
  }

  const id = getStringValueFromQuery({ query, field: "id" });

  if (id === undefined) {
    return res.status(400).end();
  }

  const findResp = await groupsModel.deleteGroup({ groupId: id });

  if (!(findResp === null)) {
    log(findResp);
    return res.status(204).end();
  }
};

const update = async ({ headers, body, res, query }: ControllerInput<IAddGroups>) => {
  log("update");
  const token = headers.authorization;
  try {
    await verifyToken(token);
  } catch (error) {
    return res.status(401).end();
  }

  const id = getStringValueFromQuery({ query, field: "id" });

  if (id === undefined) {
    return res.status(400).end();
  }

  const { success, data, error } = validateParamWithData<IUpdateGroups>({ id: query, ...body }, SchemaUpdateGroups);
  if (success === false) {
    return res.status(400).json(error);
  }

  const findResp = await groupsModel.updateGroup(data);
  if (!(findResp === null)) {
    log(findResp);
    return res.json(findResp);
  }
};

const findAll = async ({ headers, res }: Omit<ControllerInput, "body" | "query">) => {
  log("findAll");

  const token = headers.authorization;
  let id;
  try {
    id = (await verifyToken(token)).uid;
  } catch (error) {
    return res.status(401).end();
  }

  const findResp = await groupsModel.findAllGroups({ ownerId: id });
  if (!(findResp === null)) {
    log(findResp);
    return res.json(findResp);
  }
};

const find = async ({ headers, query, res }: Omit<ControllerInput, "body">) => {
  log("add");
  const token = headers.authorization;
  try {
    await verifyToken(token);
  } catch (error) {
    return res.status(401).end();
  }

  const groupId = getStringValueFromQuery({ query, field: "id" });

  if (groupId === undefined) {
    return res.status(400).end();
  }

  const findResp = await groupsModel.findGroup({ groupId });
  if (!(findResp === null)) {
    log(findResp);
    return res.json(findResp);
  }

  return res.status(404).end();
};

export { add, remove, update, findAll, find };
