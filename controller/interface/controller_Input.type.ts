import { IncomingHttpHeaders } from "http";
import { NextApiRequest, NextApiResponse } from "next";

export interface ControllerInput<T = null> {
  headers: IncomingHttpHeaders;
  query: NextApiRequest["query"];
  body: T;
  res: NextApiResponse;
}
