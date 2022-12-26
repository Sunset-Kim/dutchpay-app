import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GroupCard, { GroupCardProps } from "./GroupCard";

const renderComponent = (props: GroupCardProps) => {
  return render(<GroupCard {...props} />);
};
describe("GroupCard", () => {
  const GROUP = {
    name: "group",
    members: ["a", "b"],
  };
  const onDelete = jest.fn();

  it("렌더링되면 멤버의이름과 그룹네임이보인다", () => {
    renderComponent({ group: GROUP });

    expect(screen.getByText("group")).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
  });

  it("onDelete를 주입하여 렌더링되면 멤버의이름과 그룹네임, 삭제버튼이 보인다", () => {
    renderComponent({ group: GROUP, onDelete });

    expect(screen.getByText("group")).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/ })).toBeInTheDocument();
  });

  it("삭제버튼을 누르면 onDelete가 호출된다", async () => {
    renderComponent({ group: GROUP, onDelete });
    const deleteBtn = screen.getByRole("button", { name: /delete/ });
    await userEvent.click(deleteBtn);
    expect(onDelete).toBeCalled();
  });
});
