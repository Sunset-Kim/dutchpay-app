import { Box, Button, Group, Input } from "@mantine/core";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

interface CreateGroupProps {
  onSubmit: (value: string) => void;
}

export default function CreateGroup({ onSubmit }: CreateGroupProps) {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => setValue(event.target.value);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      setIsError(true);
      return;
    }
    onSubmit(value);
  };

  return (
    <Box h="full" w="full" component="form" onSubmit={handleSubmit}>
      <Input.Wrapper label="그룹명" required>
        <Group spacing={0} mb="xs" grow>
          <Input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="ex) 2022 크리스마스 여행경비"
            sx={{
              flex: 1,
            }}
          />
          <Button w="full" type="submit" sx={{ flex: 0 }}>
            저장
          </Button>
        </Group>
        {isError && (
          <Input.Error data-isvalid={isError} role="alertdialog">
            그룹명은 필수입력값 입니다
          </Input.Error>
        )}
      </Input.Wrapper>
    </Box>
  );
}
