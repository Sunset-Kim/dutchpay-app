import { z } from "zod";

const SchemaAddGroups = z.object({
  name: z.string(),
  members: z.string().array(),
  ownerId: z.string(),
});

export type IAddGroups = z.infer<typeof SchemaAddGroups>;
export default SchemaAddGroups;
