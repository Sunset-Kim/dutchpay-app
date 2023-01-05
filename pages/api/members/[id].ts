import type { NextApiRequest, NextApiResponse } from "next";
import membersController from "../../../controller/members/members.controller";
import debug from "../../../utils/debug_log";

const log = debug("Server:api:members:[id]");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allowMehtods: NextApiRequest["method"][] = ["get"];
  const method = req.method?.toLowerCase();

  log(method);

  if (!allowMehtods.includes(method)) {
    res.status(400).end();
  }

  if (method === "get") {
    await membersController.find({query: req.query, res});
  }
}
