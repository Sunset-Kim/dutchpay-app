import { Button, FormControl, FormHelperText, FormLabel, Input, Text } from "@chakra-ui/react";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";

interface CreateGroupProps {
  onSubmit: () => void;
}

export default function CreateGroup({ onSubmit }: CreateGroupProps) {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => setValue(event.target.value);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setIsError(true);
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text>1.그룹생성하기</Text>
      <FormControl>
        <FormLabel>그룹명</FormLabel>
        <Input type="text" value={value} onChange={handleChange} />
        {isError && (
          <FormHelperText data-isvalid={isError} role="alertdialog">
            그룹명은 필수입력값 입니다
          </FormHelperText>
        )}
      </FormControl>

      <Button type="submit">저장</Button>
    </form>
  );
}
