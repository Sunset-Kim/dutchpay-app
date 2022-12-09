import { render, screen } from "@testing-library/react";
import AddMembers from "./AddMembers";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
  render(<AddMembers />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button");

  return {
    input,
    button,
  };
};
describe("AddMembers", () => {
  it("렌더링시 input과 button이 렌더링 된다", () => {
    const { input, button } = renderComponent();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("입력값이 없다면, 저장시 에러메세지가 뜬다", async () => {
    const { button } = renderComponent();

    await userEvent.click(button);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("입력값이 있다면, 저장시 멤버이름이 노출된다.(반복) ", async () => {
    const { button, input } = renderComponent();

    await userEvent.type(input, "유저1");
    await userEvent.click(button);
    expect(screen.getByText("유저1")).toBeInTheDocument();

    await userEvent.type(input, "유저2");
    await userEvent.click(button);
    expect(screen.getByText("유저2")).toBeInTheDocument();
  });

  it("입력값이 중복이라면 error 메세지가 노출되며 등록되지 않는다", async () => {
    const { button, input } = renderComponent();

    await userEvent.type(input, "유저1");
    await userEvent.click(button);
    expect(screen.getByText("유저1")).toBeInTheDocument();

    await userEvent.type(input, "유저1");
    await userEvent.click(button);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(screen.getAllByText("유저1")).toHaveLength(1);
  });
});
