import { render, screen } from "@testing-library/react";
import CreateGroup from "./CreateGroup";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
  const onSubmit = jest.fn();
  render(<CreateGroup onSubmit={onSubmit} />);
  const input = screen.getByRole("textbox");
  const saveBtn = screen.getByRole("button");

  return {
    input,
    saveBtn,
    onSubmit,
  };
};

describe("CreateGroup", () => {
  it("그룹이름 입력 컴포넌트가 렌더링 된다", () => {
    const { input, saveBtn } = renderComponent();

    expect(input).toBeInTheDocument();
    expect(saveBtn).toBeInTheDocument();
  });

  it("이름을 입력하지 않으면 Error Message가 노출된다", async () => {
    const { saveBtn } = renderComponent();
    await userEvent.click(saveBtn);

    expect(screen.queryByRole("alertdialog")).not.toBeNull();
  });

  it("이름을 입력 후 저장 버튼을 누르면, 저장성공", async () => {
    const { input, saveBtn } = renderComponent();
    await userEvent.type(input, "테스트");
    await userEvent.click(saveBtn);

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});
