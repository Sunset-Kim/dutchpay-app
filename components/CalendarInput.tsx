import { Box, Card, Input, Portal, TextInput } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";

interface CalendarInputProps {
  value?: Date;
  onChange: (value: Date) => void;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export default function CalendarInput({ value, onChange, isError, errorMessage }: CalendarInputProps) {
  const [isModal, setIsModal] = useState(false);
  const closeModal = () => setIsModal(false);
  const handleChange = (value: Date) => {
    onChange(value);
    isModal && closeModal();
  };

  const toggleModal = () => setIsModal(!isModal);

  return (
    <>
      <TextInput
        label="날짜선택"
        value={value instanceof Date ? dayjs(value).format("YYYY-MM-DD") : ""}
        placeholder="날짜를 선택하세요"
        onClick={toggleModal}
        name="calendar"
        onChange={(e) => e.preventDefault()}
        error={isError ? "날짜가 입력되지 않았습니다" : false}
        readOnly
      />
      {isModal && (
        <Card w="fit-content" p="xs" mt={5} mx="auto" shadow="sm" radius="sm" withBorder>
          <Calendar data-testid="calendar" value={value} onChange={handleChange} />
        </Card>
      )}
    </>
  );
}
