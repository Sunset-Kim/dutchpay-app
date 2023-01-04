import { NextApiRequest, NextApiResponse } from "next";
import * as ExpenseController from "../../../controller/expense/expense.controller";
import debug from "../../../utils/debug_log";

const log = debug("api:expense");

const expenseContollerMap: Record<string, any> = {
  POST: ExpenseController.add,
  DELETE: ExpenseController.remove,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers, query, body } = req;

  log(method);
  log(query);

  if (method === undefined || typeof expenseContollerMap[method] !== "function") {
    return res.status(400).end();
  }

  return expenseContollerMap[method]({ headers, query, body, res });
}
