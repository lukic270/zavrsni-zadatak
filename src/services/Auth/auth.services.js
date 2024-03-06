import HttpServices from "../http.service";

export default class AuthService extends HttpServices {
  static async register(data) {
    return await this.request({
      method: "POST",
      url: `/register`,
      data,
    });
  }
  static async login(data) {
    return await this.request({
      method: "POST",
      url: `/login`,
      data,
    });
  }
}