import { getExpenseSummary } from "@/libs/calc/getExpenseSummary";
import { getMinTransaction } from "@/libs/calc/getMinTransactions";
import { exportPNG } from "@/libs/exportImage/exportJpeg";
import toast from "@/libs/toast";
import { IGroup } from "@/types/Group.type";
import { ActionIcon, Button, Group, Stack } from "@mantine/core";
import { IconShare } from "@tabler/icons";
import { useRef } from "react";
import ExpenseChart from "./ExpenseChart";
import ExpenseResult from "./ExpenseResult";

interface ExpenseSummaryProps {
  group: IGroup;
}

export default function ExpenseSummary({ group }: ExpenseSummaryProps) {
  const { totalPrice, expenseMap } = getExpenseSummary(group.expenseList);
  const perPrice = totalPrice / group.members.length;

  const transactions = getMinTransaction({
    expenses: [...expenseMap.values()],
    members: group.members,
    totalPrice,
  });

  const container = useRef<HTMLDivElement>(null);
  const share = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "더치페이 앱",
          url: location.href,
        });
      } catch (error) {
        toast.error("공유 실패했습니다");
      }
    } else {
      try {
        await navigator.clipboard.writeText(location.href);
        toast.success("주소카피 완료! 채팅창에 주소를 공유해주세요!");
      } catch (error) {
        toast.error("주소카피 실패 직접 주소창을 복사해주세요");
      }
    }
  };

  return (
    <Stack>
      <Stack ref={container}>
        <ExpenseChart expenseList={[...expenseMap.values()]} totalPrice={totalPrice} perPrice={perPrice} />
        <ExpenseResult transactions={transactions} />
      </Stack>
      <Group spacing="xs">
        <Button variant="outline" onClick={() => exportPNG(container.current, { maxWidth: 320 })}>
          이미지로 내보내기
        </Button>
        <ActionIcon title="Share" onClick={share} size={36} variant="outline" color="blue" radius="sm">
          <IconShare />
        </ActionIcon>
      </Group>
    </Stack>
  );
}
