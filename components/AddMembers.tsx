import { Badge, Box, Button, FormControl, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react";
import { FormEventHandler, MouseEventHandler, useState } from "react";

type ErrorCategories = "duplicate" | "empty" | null;

const errorMessage: Record<Exclude<ErrorCategories, null>, string> = {
  duplicate: "멤버이름이 중복되었습니다.",
  empty: "멤버이름은 필수 입력값 입니다",
};

export default function AddMembers() {
  const [members, setMembers] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<ErrorCategories>(null);

  const checkValidate: (value: string) => ErrorCategories = (value) => {
    if (value.trim() === "") {
      return "empty";
    }
    if (members.includes(value)) {
      return "duplicate";
    }
    return null;
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const errorType = checkValidate(value);
    setError(errorType);
    if (errorType === null) {
      setMembers([...members, value]);
      console.log("asdf");
      setValue("");
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack direction="row">
        {members.length !== 0 && members.map((member) => <Badge key={member}>{member}</Badge>)}
      </Stack>
      <FormControl>
        <FormLabel>멤버입력</FormLabel>
        <Input type="text" placeholder="ex) 김영식" value={value} onChange={(e) => setValue(e.target.value)} />
        {error && <FormHelperText role="alertdialog">{errorMessage[error]}</FormHelperText>}
      </FormControl>

      <Button type="submit">추가</Button>
    </Box>
  );
}
