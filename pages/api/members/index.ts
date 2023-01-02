import type { NextApiRequest, NextApiResponse } from "next";
import membersController from "../../../controller/members/members.controller";
import debug from "../../../utils/debug_log";

const log = debug("Server:api:members:index");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allowMehtods: NextApiRequest["method"][] = ["POST"];
  const method = req.method;

  log(method);

  if (!allowMehtods.includes(method)) {
    res.status(400).end();
  }

  if (method === "POST") {
    return await membersController.add({ headers: req.headers, body: req.body, res });
  }
}
