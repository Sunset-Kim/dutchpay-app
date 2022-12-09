import { NativeSelect, TextInput, NumberInput, Switch, Button, Box } from "@mantine/core";
import { FormEventHandler, useState } from "react";

interface PayInfo {
  payer: string;
  price: number;
  desc?: string;
}
interface AddExpenseFormProps {
  members: string[];
  onSubmit: (param: PayInfo) => void;
}

export default function AddExpenseForm({ members, onSubmit }: AddExpenseFormProps) {
  const [payer, setPayer] = useState<string>("0");
  const [price, setPrice] = useState<number>(0);
  const [desc, setDesc] = useState("");
  const [isCalendar, setIsCalender] = useState(false);
  const optionsData = members.map((member, index) => ({ value: (index + 1).toString(), label: member }));

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit({
      payer: members[Number(payer) - 1],
      price,
      desc,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Switch checked={isCalendar} onChange={(e) => setIsCalender(e.currentTarget.checked)} />
      <NativeSelect
        value={payer}
        onChange={(event) => setPayer(event.currentTarget.value)}
        error={payer === "0" && "선택해요"}
        data={[{ value: "0", label: "결제한 사람을 선택해주세요" }, ...optionsData]}
      />
      <NumberInput
        value={price}
        label="Price"
        name="price"
        hideControls
        parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value!)) ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "$ "
        }
        error={price === 0 && "0은 절대 아니됩니다"}
        onChange={(val) => setPrice(val ?? 0)}
      />
      <TextInput
        value={desc}
        label="Description"
        name="desc"
        onChange={(event) => setDesc(event.currentTarget.value)}
      />

      <Button type="submit">추가</Button>
    </Box>
  );
}
