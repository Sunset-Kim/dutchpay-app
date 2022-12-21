import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddMembers from "./AddGroupMembers";

const handleSubmit = jest.fn();
const EMPTY_MEMBERS: string[] = [];

const renderComponent = (members: string[]) => {
  render(<AddMembers members={members} onSubmit={handleSubmit} />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button");

  return {
    input,
    button,
  };
};
describe("AddMembers", () => {
  it("렌더링시 input과 button이 렌더링 된다", () => {
    const { input, button } = renderComponent(EMPTY_MEMBERS);

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("입력값이 없다면, 저장시 에러메세지가 뜬다", async () => {
    const { button } = renderComponent(EMPTY_MEMBERS);

    await userEvent.click(button);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("입력값이 있다면, 입력값이 전달된다", async () => {
    const { button, input } = renderComponent(EMPTY_MEMBERS);

    await userEvent.type(input, "유저1");
    await userEvent.click(button);
    expect(handleSubmit).toBeCalledWith("유저1");
  });
});
