import { Box, Card, Input, TextInput } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";

interface CalendarInputProps {
  value?: Date;
  onChange: (value: Date) => void;
}

export default function CalendarInput({ value, onChange }: CalendarInputProps) {
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
        label="날짜를 선택하세요"
        value={value instanceof Date ? dayjs(value).format("YYYY-MM-DD") : undefined}
        onClick={toggleModal}
        name="calendar"
      />
      {isModal && (
        <Card w="fit-content" p="md" mt={10} shadow="sm" radius="sm" withBorder>
          <Calendar data-testid="calendar" value={value} onChange={handleChange} />
        </Card>
      )}
    </>
  );
}
