import { EXPENSE_INFO_LIST } from "@/fixture/expense";
import { ExpenseInfo } from "@/types/Expense.type";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ExpenseList from "./ExpenseList";

beforeAll(() => {
  window.HTMLElement.prototype.scrollTo = function () {};
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

const onDelete = jest.fn();

const renderComponent = ({ list }: { list: ExpenseInfo[] }) => {
  return render(<ExpenseList expenseList={list} onDelete={onDelete} />);
};
describe("ExpenseList", () => {
  it("should render with no Data", () => {
    renderComponent({ list: [] });
    const noData = screen.getByText(/추가/);
    expect(noData).toBeInTheDocument();
  });

  it("should render with list data", async () => {
    // scroll area 가 resize observer를 뒤늦게 불러오기 때문에
    renderComponent({ list: EXPENSE_INFO_LIST });

    const items = screen.getAllByTestId("expenseItem");
    expect(items).toHaveLength(EXPENSE_INFO_LIST.length);
  });

  it("should click delete button", async () => {
    renderComponent({ list: EXPENSE_INFO_LIST });

    const deleteButtons = screen.getAllByRole("button", {
      name: /delete/,
    });
    expect(deleteButtons).toHaveLength(4);

    await userEvent.click(deleteButtons[0]);

    expect(onDelete).toBeCalled();
  });
});
