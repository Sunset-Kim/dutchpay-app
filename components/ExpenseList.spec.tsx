import { getAllByTestId, render, screen } from "@testing-library/react";
import { EXPENSE_INFO_LIST } from "../fixture/expense";
import { ExpenseInfo } from "../types/Expense.type";
import ExpenseList from "./ExpenseList";

const renderComponent = ({ list }: { list: ExpenseInfo[] }) => {
  render(<ExpenseList list={list} />);
};
describe("ExpenseList", () => {
  it("should render with no Data", () => {
    renderComponent({ list: [] });
    const noData = screen.getByText(/추가/);
    expect(noData).toBeInTheDocument();
  });

  it("should render with list data", () => {
    renderComponent({ list: EXPENSE_INFO_LIST });
    const items = screen.getAllByTestId("expenseItem");
    expect(items).toHaveLength(EXPENSE_INFO_LIST.length);
  });
});
