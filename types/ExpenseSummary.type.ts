import { MantineColor } from "@mantine/core";

export interface ProgressSection extends React.ComponentPropsWithRef<"div"> {
  value: number;
  color: MantineColor;
  label?: string;
  tooltip?: React.ReactNode;
}

export interface ExpenseSegment {
  payer: string;
  price: number;
  part: number;
}
