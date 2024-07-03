import { LoginSchema, TokenSchema } from "@/schema/dto";
import { z } from "zod";

export type IToken = z.TypeOf<typeof TokenSchema>;
export type ILogin = z.TypeOf<typeof LoginSchema>;
