import { render, screen, within } from "@testing-library/react";
import { EXPENSE_INFO_LIST } from "../fixture/expense";
import { ExpenseInfo } from "../types/Expense.type";
import ExpenseList from "./ExpenseList";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  };
});

const renderComponent = ({ list }: { list: ExpenseInfo[] }) => {
  return render(<ExpenseList expenseList={list} />);
};
describe("ExpenseList", () => {
  it("should render with no Data", () => {
    renderComponent({ list: [] });
    const noData = screen.getByText(/추가/);
    expect(noData).toBeInTheDocument();
  });

  it("should render with list data", async () => {
    // scroll area 가 resize observer를 뒤늦게 불러오기 때문에
    const { container } = renderComponent({ list: EXPENSE_INFO_LIST });

    const items = within(container).getAllByTestId("expenseItem");
    expect(items).toHaveLength(EXPENSE_INFO_LIST.length);
  });
});
