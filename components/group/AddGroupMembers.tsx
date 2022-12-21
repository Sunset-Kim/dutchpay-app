import { ActionIcon, Badge, Box, Button, Group, Input, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { FormEventHandler, useState } from "react";

type ErrorCategories = "duplicate" | "empty" | null;

const errorMessage: Record<Exclude<ErrorCategories, null>, string> = {
  duplicate: "멤버이름이 중복되었습니다.",
  empty: "멤버이름은 필수 입력값 입니다",
};

interface AddMemberProps {
  members: string[];
  onSubmit: (value: string | string[]) => void;
  onDelete: (member: string) => void;
}

export default function AddMembers({ members, onSubmit, onDelete }: AddMemberProps) {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<ErrorCategories>(null);

  const checkValidate: (value: string | string[]) => ErrorCategories = (value) => {
    const isArrayMember = Array.isArray(value);

    let result,
      i = 0;

    if (isArrayMember) {
      while (!result && i < value.length) {
        result = checkValidate(value[i]);
        i++;
      }

      return result ?? null;
    }

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
    const isMembers = value.includes(",");
    const result = isMembers ? value.split(",").map((word) => word.trim()) : value.trim();
    const errorType = checkValidate(result);

    if (errorType) {
      setError(errorType);
      return;
    }

    onSubmit(result);
    setValue("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Input.Wrapper required label="멤버입력">
        <Group spacing={0} mb={8} grow>
          <Input type="text" placeholder="ex) 김영식" value={value} onChange={(e) => setValue(e.target.value)} />
          <Button type="submit" name="add" sx={{ flex: 0 }}>
            추가
          </Button>
        </Group>

        {error && <Input.Error role="alertdialog">{errorMessage[error]}</Input.Error>}
      </Input.Wrapper>
      <Group mt="sm" spacing={"xs"}>
        {members &&
          members.length !== 0 &&
          members.map((member) => (
            <Badge key={member}>
              <Group spacing={4}>
                <Text>{member}</Text>
                <ActionIcon size={"xs"} color="red" title="delete member" onClick={() => onDelete(member)}>
                  <IconX />
                </ActionIcon>
              </Group>
            </Badge>
          ))}
      </Group>
    </Box>
  );
}
