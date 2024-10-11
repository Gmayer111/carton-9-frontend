import { AxiosResponse } from "axios";
import { TAuthor } from "src/types/author";
import { TServiceProperties, TServices } from "src/types/services";
import { http } from "src/utils/http";

export const AuthorService: TServices<
  AxiosResponse<TAuthor[], any>,
  TServiceProperties
> = {
  create: (data) => {
    return http.post("/authors", data);
  },
  update: (id, data) => {
    return http.put(`/authors/${id}`, data);
  },
  delete: (id) => {
    return http.delete(`/authors/${id}`);
  },
  getById: (id) => {
    return http.get(`/authors/${id}`);
  },
  getAll: () => {
    return http.get("/authors");
  },
};
