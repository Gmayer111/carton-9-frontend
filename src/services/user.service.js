import { http } from "src/utils/http";

export const UserService = {
  create: (data) => {
    return http.post("/user", data);
  },
};
