import { render, screen } from "@testing-library/react";
import AddExpenseForm from "./AddExpenseForm";
import userEvent from "@testing-library/user-event";

const renderComponent = (members: string[]) => {
  const handleSubmit = jest.fn();
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
  it("렌더링되면 price, desc, 비용지불자가 렌더링된다", () => {
    const { options, price, desc } = renderComponent(["김영식", "김민우"]);
    expect(options).toHaveLength(3);
    expect(
      screen.getByRole("option", { name: "결제한 사람을 선택해주세요", selected: true }) as HTMLOptionElement
    ).not.toBeNull();
    expect(price).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
  });

  //TODO: Calendar Component 완성이후
  // it.todo("캘린더 보기를 선택하면, 캘린더가 렌더링 된다", async () => {
  //   const { calendarToggle } = renderComponent(["김영식", "김민우"]);
  //   await userEvent.click(calendarToggle);
  //   expect(screen.getByTestId("calendar")).toBeInTheDocument();
  // });

  it("input을 모두 입력하지 않으면 에러메세지가 나온다", async () => {
    const { options, addBtn, price, desc, handleSubmit } = renderComponent(["김영식", "김민우"]);
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
  });

  it("모든 값이 입력되고 저장을 누르면 onSubmit이 실행된다", async () => {
    const { options, price, desc, handleSubmit, addBtn } = renderComponent(["김영식", "김민우"]);

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
  });
});
