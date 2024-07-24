import { apiEndpoint, apiServer } from "@/api-request/const";
import http from "@/lib/http";
import { ILogin, IToken, IUserInfo } from "@/schema/response";

export const authApi = {
  login: (body: ILogin) => http.post<IToken>(apiEndpoint.LOGIN, body),
  profile: (accessToken: string) =>
    http.get<IUserInfo>(apiEndpoint.PROFILE, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  auth: (body: IToken) => http.post(apiServer.AUTH, body, { baseUrl: "" }),
};
