import { AxiosResponse } from "axios";
import { TServiceProperties, TServices } from "src/types/services";
import { TUser } from "src/types/user";
import { http } from "src/utils/http";

export const UserService: TServices<
  AxiosResponse<TUser[], any>,
  TServiceProperties
> = {
  create: (data) => {
    return http.post("/users", data);
  },
  update: (id, data) => {
    return http.put(`/users/${id}`, data);
  },
  delete: (id) => {
    return http.delete(`/users/${id}`);
  },
  getById: (id) => {
    return http.get(`/users/${id}`);
  },
  getAll: () => {
    return http.get("/users");
  },
};
