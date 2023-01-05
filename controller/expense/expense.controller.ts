import validateParamWithData from "../../models/common/req_validator";
import { expenseModel } from "../../models/expense/expense.model";
import SchemaAddExpense, { AddExpense } from "../../models/expense/schema/expense.add.schema";
import debug from "../../utils/debug_log";
import getStringValueFromQuery from "../../utils/getValueFromQuery";
import verifyToken from "../../utils/verify_token";
import { ControllerInput } from "../interface/controller_Input.type";

const log = debug("controller:expense");

async function add({ body, headers, res, query }: ControllerInput<AddExpense>) {
  const groupId = getStringValueFromQuery({ query, field: "groupId" });
  if (groupId === undefined) {
    return res.status(400).end();
  }

  const token = headers.authorization;

  try {
    await verifyToken(token);
  } catch (error) {
    return res.status(401).end();
  }

  const { success, data: expense, error } = validateParamWithData(body, SchemaAddExpense);
  if (success === false) {
    return res.status(400).json(error);
  }

  // 3. model 로 읽고 쓰기
  const addResp = await expenseModel.addExpense({ groupId, expense });

  if (!(addResp === null)) {
    log(addResp);
    return res.json(addResp);
  }
}
async function remove({ query, headers, res }: ControllerInput) {
  const groupId = getStringValueFromQuery({ query, field: "groupId" });
  const expenseId = getStringValueFromQuery({ query, field: "expenseId" });

  if (groupId === undefined || expenseId === undefined) {
    return res.status(400).end();
  }

  const token = headers.authorization;
  try {
    await verifyToken(token);
  } catch (error) {
    return res.status(401).end();
  }

  // 3. model 로 읽고 쓰기
  const deleteResp = await expenseModel.deleteExpense({ groupId, expenseId });

  if (!(deleteResp === null)) {
    log(deleteResp);
    return res.json(deleteResp);
  }
}

export { add, remove };
