import { AxiosResponse } from "axios";
import { TCategory } from "src/types/category";
import { TServiceProperties, TServices } from "src/types/services";
import { http } from "src/utils/http";

export const CategoryService: TServices<
  AxiosResponse<TCategory[], any>,
  TServiceProperties
> = {
  create: (data) => {
    return http.post("/categories", data);
  },
  update: (id, data) => {
    return http.put(`/categories/${id}`, data);
  },
  delete: (id) => {
    return http.delete(`/categories/${id}`);
  },
  getById: (id) => {
    return http.get(`/categories/${id}`);
  },
  getAll: () => {
    return http.get("/categories");
  },
};
