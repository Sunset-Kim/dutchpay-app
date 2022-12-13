import { Box, Card, Input } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useState } from "react";

interface CalendarInputProps {
  value: Date;
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
      <Input value={dayjs(value).format("YYYY-MM-DD")} onClick={toggleModal} readOnly />
      {isModal && (
        <Card w="fit-content" p="md" mt={10} shadow="sm" radius="sm" withBorder>
          <Calendar data-testid="calendar" value={value} onChange={handleChange} />
        </Card>
      )}
    </>
  );
}
