import {
  TRANSACTION_TEST_ONE_PAYER_FOUR_MEMBERS,
  TRANSACTION_TEST_ONE_PAYER_ONE_MEMBER,
  TRANSACTION_TEST_SAME_PRICE,
  TRANSACTION_TEST_WO_TRANSACTION,
} from "@/fixture/expense/transaction_case";
import { getMinTransaction } from "../getMinTransactions";

describe("getMinTransactions", () => {
  it("맴버가 1명, 결제자가 1명일때 0개의 송금리스트를 반환한다", () => {
    const result = getMinTransaction(TRANSACTION_TEST_ONE_PAYER_ONE_MEMBER);
    expect(result).toHaveLength(0);
  });
  it("맴버가 4명, 결제자가 1명일때 3개의 송금리스트를 반환한다", () => {
    const result = getMinTransaction(TRANSACTION_TEST_ONE_PAYER_FOUR_MEMBERS);
    expect(result).toHaveLength(3);
  });

  it("맴버모두가 같은 금액으로 결제했을때 0개의 송금리스트를 반환한다", () => {
    const result = getMinTransaction(TRANSACTION_TEST_SAME_PRICE);
    expect(result).toHaveLength(0);
  });

  it("결제내역이 입력되지 않으면 0개의 송금리스트를 반환한다", () => {
    const result = getMinTransaction(TRANSACTION_TEST_WO_TRANSACTION);
    expect(result).toHaveLength(0);
  });
});
