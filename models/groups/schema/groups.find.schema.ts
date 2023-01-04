import { z } from "zod";

const SchemaFindGroups = z.object({
  groupId: z.string(),
});

export type IFindGroups = z.infer<typeof SchemaFindGroups>;

export default SchemaFindGroups;
