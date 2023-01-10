import {
  TRANSACTION_TEST_ONE_PAYER_FOUR_MEMBERS,
  TRANSACTION_TEST_SAME_PRICE,
} from "@/fixture/expense/transaction_case";
import { getMinTransaction, TransactionProps } from "@/libs/calc/getMinTransactions";
import { render, screen } from "@testing-library/react";
import ExpenseResult from "./ExpenseResult";

const renderComponent = (data: TransactionProps) => {
  render(<ExpenseResult transactions={getMinTransaction({ ...data })} />);
};

describe("ExpenseResult", () => {
  it("transaction이 있으면 transaction 내역을 렌더링한다", () => {
    renderComponent(TRANSACTION_TEST_ONE_PAYER_FOUR_MEMBERS);

    expect(screen.getAllByText(/2,500를 송금해야합니다/)).toHaveLength(3);
  });

  it("transaction이 없다면 정산할 금액이 없다 는 정보를 렌더링한다", () => {
    renderComponent(TRANSACTION_TEST_SAME_PRICE);
    expect(screen.getByText(/아직 정산할 금액은 없네요!/));
  });
});
