import { AxiosResponse } from "axios";
import { TCollection } from "src/types/collection";
import { TService } from "src/types/services";
import { http } from "src/utils/http";

type TCollectionService = TService<AxiosResponse<TCollection[], any>>;

export const CollectionService: TCollectionService = {
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
