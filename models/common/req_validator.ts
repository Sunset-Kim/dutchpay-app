import { ZodSchema } from "zod";
import debug from "../../utils/debug_log";

const log = debug("models:req_validator");

function validateParamWithData<T>(param: unknown, schema: ZodSchema<T>) {
  log(param);
  const result = schema.safeParse(param);
  if (!result.success) {
    return {
      success: result.success,
      data: null,
      error: result.error.message,
    };
  } else {
    return {
      success: result.success,
      data: result.data,
      error: null,
    };
  }
}

export default validateParamWithData;
