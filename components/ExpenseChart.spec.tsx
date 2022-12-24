import { render, screen } from "@testing-library/react";
import ExpenseChart from "./ExpenseChart";

const default_data = [
  {
    payer: "a",
    price: 10000,
    part: 50,
  },
  {
    payer: "b",
    price: 10000,
    part: 50,
  },
];

const default_total = 20000;

const renderSummary = () => {
  render(<ExpenseChart ExpenseSegments={default_data} total={default_total} />);
};

describe("ExpenseSummary", () => {
  it("최종정산금액이 render 된다", () => {
    renderSummary();

    expect(screen.getByText(/최종정산금액/)).toBeInTheDocument();
    expect(screen.getByText(/20,000/)).toBeInTheDocument();
  });
});
