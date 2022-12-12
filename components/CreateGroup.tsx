import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from "react";

interface CreateGroupProps {
  onSubmit: () => void;
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
    onSubmit();
  };

  return (
    <Box h="full" w="full" as="form" onSubmit={handleSubmit}>
      <VStack w="full" h="full" justifyContent={"space-between"}>
        <FormControl>
          <FormLabel>그룹명</FormLabel>
          <Input type="text" value={value} onChange={handleChange} placeholder="ex) 2022 크리스마스 여행경비" />
          {isError && (
            <FormHelperText data-isvalid={isError} role="alertdialog">
              그룹명은 필수입력값 입니다
            </FormHelperText>
          )}
        </FormControl>

        <Button w="full" type="submit" colorScheme="orange">
          저장
        </Button>
      </VStack>
    </Box>
  );
}
