import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IGroup } from "../../types/Group.type";
import AddExpenseForm from "./AddExpenseForm";

const handleSubmit = jest.fn();
const renderComponent = (group: IGroup) => {
  render(<AddExpenseForm onSubmit={handleSubmit} group={group} />);

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

const DEFAULT_GROUP: IGroup = {
  id: "id1",
  name: "abc",
  members: ["김영식", "김민우"],
  ownerId: "id1",
};

describe("AddExpenseForm(정산정보 입력폼)", () => {
  it("비용, 설명, 비용자를 선택할 수 있는 input이 생긴다", () => {
    const { options, price, desc, calendarToggle } = renderComponent(DEFAULT_GROUP);
    expect(options).toHaveLength(3);
    expect(
      screen.getByRole("option", { name: "결제한 사람을 선택해주세요", selected: true }) as HTMLOptionElement
    ).not.toBeNull();
    expect(calendarToggle).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });

  it("캘린더 보기를 체크하면, 캘린더가 렌더링 된다", async () => {
    const { calendarToggle } = renderComponent(DEFAULT_GROUP);
    await userEvent.click(calendarToggle);
    expect(calendarToggle).toBeChecked();
    const input = screen.getByRole("textbox", { name: /날짜/ });
    expect(input).toBeInTheDocument();
  });

  describe("입력값을 입력했을 때", () => {
    it("require 값을 입력하지 않으면 에러메세지가 보인다", async () => {
      const { options, addBtn, price, desc, handleSubmit, calendarToggle } = renderComponent(DEFAULT_GROUP);
      expect(screen.queryAllByRole("alert")).toHaveLength(2);

      await userEvent.selectOptions(screen.getByRole("combobox"), options[1]);
      expect(options[1]).toBeInTheDocument();
      expect(screen.queryAllByRole("alert")).toHaveLength(1);

      await userEvent.type(price, "20000");
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
      await userEvent.click(addBtn);
      expect(handleSubmit).toBeCalled();

      await userEvent.click(calendarToggle);
      expect(screen.queryAllByRole("alert")).toHaveLength(2);
    });
    it("submit을 누르면 해당 input의 value값이 submit함수에 포함된다 ", async () => {
      const { options, price, desc, handleSubmit, addBtn, calendarToggle } = renderComponent(DEFAULT_GROUP);

      await userEvent.selectOptions(screen.getByRole("combobox"), options[1]);
      expect(options[0]).toBeInTheDocument();
      await userEvent.type(price, "20000");
      await userEvent.type(desc, "차비");
      await userEvent.click(addBtn);

      expect(handleSubmit).toBeCalled();

      await userEvent.click(calendarToggle);
      const input = screen.getByRole("textbox", { name: /날짜/ });

      await userEvent.click(input);
      expect(screen.getByTestId("calendar")).toBeInTheDocument();

      expect(handleSubmit).toBeCalled();
    });
  });
});
