import { NativeSelect, TextInput, NumberInput, Switch, Button, Box, Card, Stack, Group } from "@mantine/core";
import React, { FormEventHandler, ReactNode, useState } from "react";
import { ExpenseInfo } from "../types/Expense.type";
import CalendarInput from "./CalendarInput";

interface AddExpenseFormProps {
  members: string[];
  onSubmit: (param: ExpenseInfo) => void;
}

type SubmitError = "price" | "payer";

const errorCase: Record<SubmitError, (value: any) => ReactNode> = {
  payer: (payer: string) => (payer === "0" ? "option을 선택해야합니다" : false),
  price: (price: number) => (price === 0 ? "금액을 입력해야합니다" : false),
};

export default function AddExpenseForm({ members, onSubmit }: AddExpenseFormProps) {
  const [payer, setPayer] = useState<string>("0");
  const [price, setPrice] = useState<number>(0);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date>();
  const [isCalendar, setIsCalender] = useState(false);

  const optionsData = members.map((member, index) => ({ value: (index + 1).toString(), label: member }));

  const isErrorPayer = errorCase.payer(payer);
  const isErrorPrice = errorCase.price(price);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (isErrorPayer || isErrorPrice) {
      return;
    }

    isCalendar
      ? onSubmit({
          payer: members[Number(payer) - 1],
          price,
          desc,
          date,
        })
      : onSubmit({
          payer: members[Number(payer) - 1],
          price,
          desc,
        });
  };

  return (
    <Card w="full" shadow={"md"} p="lg" maw={360} mx="auto">
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
            data={[{ value: "0", label: "결제한 사람을 선택해주세요" }, ...optionsData]}
            required
          />
          <NumberInput
            value={price}
            label="Price"
            name="price"
            hideControls
            step={100}
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
            formatter={(value) =>
              !Number.isNaN(parseFloat(value!)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "$ "
            }
            error={isErrorPrice}
            onChange={(val) => {
              setPrice(val ?? 0);
            }}
            required
          />

          <TextInput
            value={desc}
            label="Description"
            name="desc"
            onChange={(event) => setDesc(event.currentTarget.value)}
          />

          <Button type="submit">추가</Button>
        </Stack>
      </Card.Section>
    </Card>
  );
}
