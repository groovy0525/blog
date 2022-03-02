import fetchData from "../api";
import { Auth, ReqFormData, User } from "../types";

export default class UserService {
  public static async login(reqData: ReqFormData) {
    const response = await fetchData<Auth>("/users/signin", "POST", reqData);
    return response;
  }

  public static async register(reqData: ReqFormData) {
    const response = await fetchData<Auth>("/users/signup", "POST", reqData);
    return response;
  }

  public static async check(token: string) {
    const response = await fetchData<User>("/users/check", "GET", null, token);
    return response;
  }
}
