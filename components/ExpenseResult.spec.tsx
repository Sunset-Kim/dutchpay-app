import { render, screen } from "@testing-library/react";
import { ExpenseSegment } from "../types/ExpenseSummary.type";
import ExpenseResult from "./ExpenseResult";

const default_total = 100000;
const default_data = [
  {
    payer: "a",
    price: 50000,
    part: 50,
  },
  {
    payer: "b",
    price: 30000,
    part: 30,
  },
  {
    payer: "c",
    price: 20000,
    part: 20,
  },
  {
    payer: "d",
    price: 10000,
    part: 10,
  },
];
const default_data_without_amount = [
  {
    payer: "a",
    price: 10000,
    part: 25,
  },
  {
    payer: "b",
    price: 10000,
    part: 25,
  },
  {
    payer: "c",
    price: 10000,
    part: 25,
  },
  {
    payer: "d",
    price: 10000,
    part: 25,
  },
];

const renderComponent = (data: ExpenseSegment[]) => {
  render(<ExpenseResult data={data} total={default_total} />);
};

describe("ExpenseResult", () => {
  it("정산결과를 렌더링한다", () => {
    renderComponent(default_data);

    expect(screen.getByText(/17,500를 송금해야합니다/));
    expect(screen.getByText(/5,000를 송금해야합니다/));
    expect(screen.getByText(/2,500를 송금해야합니다/));
  });

  it("정산결과가 동일하면 정산내용이 없다는 텍스트를 렌더링 한다", () => {
    renderComponent(default_data_without_amount);

    expect(screen.getByText(/아직 정산할 금액은 없네요!/));
  });
});
