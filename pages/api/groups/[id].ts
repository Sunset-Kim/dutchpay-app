import { NextApiRequest, NextApiResponse } from "next";
import { find, remove } from "../../../controller/groups/groups.controller";
import debug from "../../../utils/debug_log";

const log = debug("api:groups/[id]");
const groupsApiMap: Record<string, any> = {
  GET: find,
  DELETE: remove,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  log(method);
  log(query);

  if (method === undefined || typeof groupsApiMap[method] !== "function") {
    return res.status(400).end();
  }

  return groupsApiMap[method]({ headers: req.headers, query: req.query, body: req.body, res });
}
