import { AUTH, USERS } from "@/api/const.url";
import { request } from "@/api/request-base";
import { ILogin, IToken } from "@/schema/response";

export const info_api = async (): Promise<{ id: string; exp: number }> => {
  return await request<{ id: string; exp: number }>({
    url: `${USERS}/profile`,
    method: "GET",
  });
};

export const login_api = async (dto: ILogin): Promise<IToken | null> => {
  return await request<IToken>({
    url: `${AUTH}/login`,
    method: "POST",
    body: dto,
  });
};
