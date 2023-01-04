import { NextApiRequest, NextApiResponse } from "next";
import { add, findAll } from "../../../controller/groups/groups.controller";
import debug from "../../../utils/debug_log";

const log = debug("api:groups:index");

const groupsApimap: Record<string, any> = {
  GET: findAll,
  POST: add,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const method = req.method?.toUpperCase();
  log(method);

  if (method === undefined || typeof groupsApimap[method] !== "function") {
    return res.status(400).end();
  }

  await groupsApimap[method]({ headers: req.headers, query: req.query, body: req.body, res });
  return;
}
