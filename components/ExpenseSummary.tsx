import toast from "@/libs/toast";
import { ActionIcon, Button, Group, Stack } from "@mantine/core";
import { IconShare } from "@tabler/icons";
import { useRef } from "react";
import { convertExpenseListToMap } from "../libs/converter/convertExpenseListToMap";
import { exportPNG } from "../libs/exportImage/exportJpeg";
import { IGroup } from "../types/Group.type";

import ExpenseChart from "./ExpenseChart";
import ExpenseResult from "./ExpenseResult";

interface ExpenseSummaryProps {
  group: IGroup;
}

export default function ExpenseSummary({ group }: ExpenseSummaryProps) {
  const totalPrice = group.expenseList?.reduce((total, info) => (total += info.price), 0);
  const info = convertExpenseListToMap(group.expenseList, totalPrice);
  const container = useRef<HTMLDivElement>(null);

  const share = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: "더치페이 앱",
          text: "현재까지의 정산내역을 공유드립니다",
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
        <ExpenseChart ExpenseSegments={[...info.values()].sort((a, b) => b.price - a.price)} total={totalPrice} />
        <ExpenseResult data={[...info.values()].sort((a, b) => b.price - a.price)} members={group.members} />
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
