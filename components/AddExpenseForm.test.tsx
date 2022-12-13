import { render, screen } from "@testing-library/react";
import AddExpenseForm from "./AddExpenseForm";
import userEvent from "@testing-library/user-event";

const handleSubmit = jest.fn();
const renderComponent = (members: string[]) => {
  render(<AddExpenseForm onSubmit={handleSubmit} members={members} />);

  const options = screen.queryAllByRole("option");
  const price = screen.getByRole("textbox", { name: "Price" });
  const desc = screen.getByRole("textbox", { name: "Description" });
  const addBtn = screen.getByRole("button");
  const calendarToggle = screen.getByRole("checkbox");

  return {
    options,
    price,
    desc,
    addBtn,
    calendarToggle,
    handleSubmit,
  };
};

describe("AddExpenseForm(정산정보 입력폼)", () => {
  it("비용, 설명, 비용자를 선택할 수 있는 input이 생긴다", () => {
    const { options, price, desc, calendarToggle } = renderComponent(["김영식", "김민우"]);
    expect(options).toHaveLength(3);
    expect(
      screen.getByRole("option", { name: "결제한 사람을 선택해주세요", selected: true }) as HTMLOptionElement
    ).not.toBeNull();
    expect(calendarToggle).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });

  it("캘린더 보기를 체크하면, 캘린더가 렌더링 된다", async () => {
    const { calendarToggle } = renderComponent(["김영식", "김민우"]);
    await userEvent.click(calendarToggle);
    expect(calendarToggle).toBeChecked();
    const input = screen.getByRole("textbox", { name: /날짜/ });
    expect(input).toBeInTheDocument();
  });

  describe("입력값을 입력했을 때", () => {
    it("require 값을 입력하지 않으면 에러메세지가 보인다", async () => {
      const { options, addBtn, price, desc, handleSubmit, calendarToggle } = renderComponent(["김영식", "김민우"]);
      expect(screen.queryAllByRole("alert")).toHaveLength(2);
      await userEvent.click(addBtn);
      expect(handleSubmit).not.toBeCalled();

      await userEvent.selectOptions(screen.getByRole("combobox"), options[1]);
      expect(options[1]).toBeInTheDocument();
      expect(screen.queryAllByRole("alert")).toHaveLength(1);
      await userEvent.click(addBtn);
      expect(handleSubmit).not.toBeCalled();

      await userEvent.type(price, "20000");
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
      await userEvent.click(addBtn);
      expect(handleSubmit).toBeCalled();

      await userEvent.type(desc, "차비");
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
      expect(handleSubmit).toBeCalled();

      await userEvent.click(calendarToggle);
      expect(screen.queryAllByRole("alert")).toHaveLength(1);
    });
    it("submit을 누르면 해당 input의 value값이 submit함수에 포함된다 ", async () => {
      const { options, price, desc, handleSubmit, addBtn, calendarToggle } = renderComponent(["김영식", "김민우"]);

      await userEvent.selectOptions(screen.getByRole("combobox"), options[1]);
      expect(options[0]).toBeInTheDocument();
      await userEvent.type(price, "20000");
      await userEvent.type(desc, "차비");
      await userEvent.click(addBtn);

      expect(handleSubmit).toBeCalled();
      expect(handleSubmit).toBeCalledWith({
        payer: "김영식",
        price: 20000,
        desc: "차비",
      });

      await userEvent.click(calendarToggle);
      const input = screen.getByRole("textbox", { name: /날짜/ });

      await userEvent.click(input);
      expect(screen.getByTestId("calendar")).toBeInTheDocument();

      expect(handleSubmit).toBeCalled();
    });
  });
});
