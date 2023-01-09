import { z } from "zod";

const SchemaAddExpense = z.object({
  payer: z.string(),
  price: z.number().positive().int(),
  desc: z.string().optional(),
  date: z.string().optional(),
});

export default SchemaAddExpense;
export type AddExpense = z.infer<typeof SchemaAddExpense>;
