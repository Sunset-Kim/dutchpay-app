import { z, ZodSchema } from "zod";

const SchemaMemberFind: ZodSchema = z.object({
  id: z.string()
});

export type IFindMember = z.infer<typeof SchemaMemberFind>;

export default SchemaMemberFind;
