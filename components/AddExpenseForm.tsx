import { Button, Card, Group, NativeSelect, NumberInput, Stack, Switch, TextInput } from "@mantine/core";
import { FormEventHandler, ReactNode, useState } from "react";
import { AddExpense } from "../models/expense/schema/expense.add.schema";
import { IGroup } from "../types/Group.type";
import CalendarInput from "./CalendarInput";

const MIN_AMOUNT = 0;
const MAX_AMOUNT = 10_000_000;
interface AddExpenseFormProps {
  group: IGroup;
  onSubmit: (param: AddExpense) => void;
}

type SubmitError = "price" | "payer";

const errorCase: Record<SubmitError, (value: any) => ReactNode> = {
  payer: (payer: string) => (payer === "0" ? "멤버는 꼭 선택해야해요" : false),
  price: (price: number) => (price === 0 ? "금액은 꼭 입력해야해요" : false),
};

export default function AddExpenseForm({ group, onSubmit }: AddExpenseFormProps) {
  const { members } = group;
  const [payer, setPayer] = useState<string>("0");
  const [price, setPrice] = useState<number>(0);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date>();
  const [isCalendar, setIsCalender] = useState(false);
  const optionsData = members.map((member, index) => ({ value: (index + 1).toString(), label: member }));
  const isErrorPayer = errorCase.payer(payer);
  const isErrorPrice = errorCase.price(price);

  const isDisabled = isErrorPayer || isErrorPrice;

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (isDisabled) {
      return;
    }

    const expenseInfo = isCalendar
      ? {
          payer: members[Number(payer) - 1],
          price,
          desc,
          date: date?.toString(),
        }
      : {
          payer: members[Number(payer) - 1],
          price,
          desc,
        };

    onSubmit(expenseInfo);

    setPrice(0);
    setDesc("");
  };

  return (
    <Card w="full" shadow={"sm"} p="lg" withBorder>
      <Card.Section withBorder inheritPadding py="xs" sx={{ justifyContent: "flex-end" }}>
        <Group position="right">
          <Switch
            labelPosition="left"
            label="날짜입력 활성화"
            checked={isCalendar}
            onChange={(e) => setIsCalender(e.currentTarget.checked)}
          />
        </Group>
      </Card.Section>
      <Card.Section inheritPadding component="form" py="lg" onSubmit={handleSubmit}>
        <Stack>
          {isCalendar && <CalendarInput value={date} onChange={(value) => setDate(value)} isError={!date} />}
          <NativeSelect
            label="결제한 사람 선택"
            value={payer}
            onChange={(event) => setPayer(event.currentTarget.value)}
            error={isErrorPayer}
            data={[{ value: "0", label: "결제한 사람을 선택해주세요", disabled: true }, ...optionsData]}
            required
          />
          <NumberInput
            value={price}
            label="Price"
            name="price"
            hideControls
            step={100}
            parser={(value) => value?.replace(/\₩\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value!)) ? `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "₩ "
            }
            error={isErrorPrice}
            onChange={(value) => {
              if (!value) return;
              let amount;

              if (value > MAX_AMOUNT) {
                amount = MAX_AMOUNT;
              } else if (value < MIN_AMOUNT) {
                amount = MIN_AMOUNT;
              } else {
                amount = value;
              }

              setPrice(amount);
            }}
            required
          />

          <TextInput
            value={desc}
            label="Description"
            name="desc"
            onChange={(event) => setDesc(event.currentTarget.value)}
            placeholder="간략한 메모를 남겨주세요. ex) 치킨값"
          />

          <Button disabled={!!isDisabled} type="submit">
            추가
          </Button>
        </Stack>
      </Card.Section>
    </Card>
  );
}
