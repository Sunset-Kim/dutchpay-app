import { render, screen } from "@testing-library/react";
import { EXPENSE_INFO_WITHOUT_DATE, EXPENSE_INFO_WITH_DATE } from "../fixture/expense";
import { ExpenseInfo } from "../types/Expense.type";
import ExpenseItem from "./ExpenseItem";

const renderComponent = ({ data }: { data: ExpenseInfo }) => {
  render(<ExpenseItem data={data} />);
};

describe("ExpenseItem", () => {
  it("should render with ExpenseInfo(without date)", () => {
    renderComponent({ data: EXPENSE_INFO_WITHOUT_DATE });
    const payer = screen.getByText(EXPENSE_INFO_WITHOUT_DATE.payer);
    const price = screen.getByText(EXPENSE_INFO_WITHOUT_DATE.price);
    expect(payer).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it("should render with ExpenseInfo(with date)", () => {
    renderComponent({ data: EXPENSE_INFO_WITH_DATE });
    const payer = screen.getByText(EXPENSE_INFO_WITH_DATE.payer);
    const price = screen.getByText(EXPENSE_INFO_WITH_DATE.price);
    const date = new Date(EXPENSE_INFO_WITH_DATE.date!);
    const dateFomart = screen.getByText(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    expect(payer).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(dateFomart).toBeInTheDocument();
  });
});
