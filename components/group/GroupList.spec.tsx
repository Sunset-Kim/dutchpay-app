import { render, screen } from "@testing-library/react";
import GroupList, { GroupListProps } from "./GroupList";

const renderComponent = (props: GroupListProps) => {
  return render(<GroupList {...props} />);
};
describe("GroupCard", () => {
  const GROUPS = {
    group: {
      id: "testid",
      name: "group",
      members: ["a", "b"],
    },
    group2: {
      id: "testid2",
      name: "group2",
      members: ["a1", "b2"],
    },
  };

  it("그룹이 주어지면 그룹카드가 렌더링된다", () => {
    renderComponent({ groups: new Map(Object.entries(GROUPS)) });
    expect(screen.getAllByTestId("group-card")).toHaveLength(2);
  });

  it("그룹이 주어지지 않으면 그룹생성으로 갈수있는 버튼이 렌더링 된다", () => {
    renderComponent({ groups: new Map() });
    expect(screen.queryByTestId("group-card")).not.toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/group/create");
  });
});
