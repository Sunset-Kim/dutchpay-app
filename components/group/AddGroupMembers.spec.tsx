import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddMembers from "./AddGroupMembers";

const handleSubmit = jest.fn();
const onDelete = jest.fn();
const EMPTY_MEMBERS: string[] = [];
const MEMBERS = ["a", "b"];

const renderComponent = (members: string[]) => {
  render(<AddMembers members={members} onSubmit={handleSubmit} onDelete={onDelete} />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: /추가/ });

  return {
    input,
    button,
  };
};
describe("AddMembers", () => {
  it("렌더링시 input과 button이 렌더링 된다", () => {
    const { input, button } = renderComponent(MEMBERS);

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

  it("멤버가 있다면, 멤버를 렌더링 한다", () => {
    renderComponent(MEMBERS);

    expect(screen.getByText(MEMBERS[0])).toBeInTheDocument();
    expect(screen.getByText(MEMBERS[1])).toBeInTheDocument();
  });

  it("삭제 버튼을 누르면 해당 멤버가 삭제된다", async () => {
    renderComponent(MEMBERS);

    const deleteBtn = screen.getAllByRole("button", { description: /delete/ });

    await userEvent.click(deleteBtn[0]);
    expect(onDelete).toBeCalled();
  });
});
