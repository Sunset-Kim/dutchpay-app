import { z } from "zod";
import SchemaAddGroups from "./groups.add.schema";

const SchemaUpdateGroups = SchemaAddGroups.extend({
  id: z.string(),
});

export type IUpdateGroups = z.infer<typeof SchemaUpdateGroups>;

export default SchemaUpdateGroups;
