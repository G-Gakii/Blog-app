import { Request } from "express";

import { Document } from "mongoose";
import { Iuser } from "./user.interface";
export interface authorizedRequest extends Request {
  user?: Document<any, any, Iuser> & Iuser & { _id: string };
  payload?: any;
}
