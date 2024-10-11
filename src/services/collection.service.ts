import { AxiosResponse } from "axios";
import { TCollection } from "src/types/collection";
import { TServiceProperties, TServices } from "src/types/services";
import { http } from "src/utils/http";

export const CollectionService: TServices<
  AxiosResponse<TCollection[], any>,
  TServiceProperties
> = {
  create: (data) => {
    return http.post("/collections", data);
  },
  update: (id, data) => {
    return http.put(`/collections/${id}`, data);
  },
  delete: (id) => {
    return http.delete(`/collections/${id}`);
  },
  getById: (id) => {
    return http.get(`/collections/${id}`);
  },
  getAll: () => {
    return http.get("/collections");
  },
};
