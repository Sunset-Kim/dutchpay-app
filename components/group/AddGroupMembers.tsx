import { Badge, Box, Button, Group, Input } from "@mantine/core";
import { FormEventHandler, useState } from "react";

type ErrorCategories = "duplicate" | "empty" | null;

const errorMessage: Record<Exclude<ErrorCategories, null>, string> = {
  duplicate: "멤버이름이 중복되었습니다.",
  empty: "멤버이름은 필수 입력값 입니다",
};

interface AddMemberProps {
  members: string[];
  onSubmit: (value: string) => void;
}

export default function AddMembers({ members, onSubmit }: AddMemberProps) {
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
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Input.Wrapper required label="멤버입력">
        <Group spacing={0} grow>
          <Input type="text" placeholder="ex) 김영식" value={value} onChange={(e) => setValue(e.target.value)} />
          <Button
            type="submit"
            sx={{
              flexGrow: 0,
            }}
          >
            추가
          </Button>
        </Group>

        {error && <Input.Error role="alertdialog">{errorMessage[error]}</Input.Error>}
      </Input.Wrapper>
      <Group mt="sm" spacing={"xs"}>
        {members && members.length !== 0 && members.map((member) => <Badge key={member}>{member}</Badge>)}
      </Group>
    </Box>
  );
}
