import { EXPENSE_INFO_LIST } from "@/fixture/expense";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GROUPS } from "__mock__/constants";
import ExpenseSummary from "./ExpenseSummary";

const renderSummary = () => {
  render(<ExpenseSummary group={{ ...GROUPS[0], expenseList: EXPENSE_INFO_LIST }} />);
  const shareButton = screen.getByRole("button", { name: /Share/ });
  return {
    shareButton,
  };
};

describe("공유버튼", () => {
  it("렌더링 된다", () => {
    const { shareButton } = renderSummary();

    expect(shareButton).toBeInTheDocument();
  });

  describe("모바일에서", () => {
    beforeEach(() => {
      Object.assign(global.navigator, {
        share: jest.fn(),
      });
    });
    it("공유용 다이얼로그가 렌더된다", async () => {
      const { shareButton } = renderSummary();
      await userEvent.click(shareButton);

      expect(navigator.share).toBeCalledTimes(1);
    });
  });

  describe("데스크톱에서", () => {
    beforeEach(() => {
      Object.assign(global.navigator, {
        share: undefined,
        clipboard: {
          writeText: () => jest.fn(),
        },
      });
    });
    it("클립보드에 링크가 복사된다", async () => {
      const writeText = jest.spyOn(global.navigator.clipboard, "writeText");
      const { shareButton } = renderSummary();
      await userEvent.click(shareButton);

      expect(writeText).toBeCalled();
      expect(writeText).toHaveBeenCalledWith(window.location.href);
    });
  });
});
