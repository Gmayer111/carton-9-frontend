import { AxiosResponse } from "axios";
import { TService } from "src/types/services";
import { TUser } from "src/types/user";
import { http } from "src/utils/http";

type TUserService = TService<AxiosResponse<TUser[], any>>;

export const UserService: TUserService = {
  create: (data) => {
    return http.post("/user", data);
  },
  update: (id, data) => {
    return http.put(`/user/${id}`, data);
  },
  delete: (id) => {
    return http.delete(`/user/${id}`);
  },
  getById: (id) => {
    return http.get(`/user/${id}`);
  },
  getAll: () => {
    return http.get("/user");
  },
};
