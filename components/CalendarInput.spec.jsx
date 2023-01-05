import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalendeInput from "./CalendarInput";

const date = new Date();
const handleChange = jest.fn();
const renderComponent = ({ onChange }) => {
  render(<CalendeInput onChange={onChange} value={date} />);
  return {
    handleChange,
  };
};

beforeEach(() => {
  renderComponent({ onChange: handleChange });
});
describe("calender input", () => {
  it("render", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual(
      `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      }`
    );
  });

  it("when input click, calendar display", async () => {
    const input = screen.getByRole("textbox");

    await userEvent.click(input);

    const calendar = screen.getByTestId("calendar");
    expect(calendar).toBeInTheDocument();
  });

  it("when date button click, called with select Date", async () => {
    const input = screen.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.click(screen.getByText("15"));

    expect(handleChange).toBeCalledWith(new Date(date.getFullYear(), date.getMonth(), 15));
  });
});
