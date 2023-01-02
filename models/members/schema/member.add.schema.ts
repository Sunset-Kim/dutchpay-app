import { z, ZodSchema } from "zod";

const SchemaAddMember: ZodSchema = z.object({
  uid: z.string(),
  displayName: z.string(),
  email: z.string(),
  photoURL: z.string(),
  phoneNumber: z.string().optional(),
});

export type IAddMember = z.infer<typeof SchemaAddMember>;

export default SchemaAddMember;
