import { Badge } from "@mantine/core";
import React from "react";

interface PriceProps {
  value: number;
}
const Price = ({ value }: PriceProps) => {
  const price = new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW" }).format(value);

  return <Badge>{price}</Badge>;
};

export default Price;
