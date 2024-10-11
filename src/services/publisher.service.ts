import { AxiosResponse } from "axios";
import { TPublisher } from "src/types/publisher";
import { TServiceProperties, TServices } from "src/types/services";
import { http } from "src/utils/http";

export const PublisherService: TServices<
  AxiosResponse<TPublisher[], any>,
  TServiceProperties
> = {
  create: (data) => {
    return http.post("/publishers", data);
  },
  update: (id, data) => {
    return http.put(`/publishers/${id}`, data);
  },
  delete: (id) => {
    return http.delete(`/publishers/${id}`);
  },
  getById: (id) => {
    return http.get(`/publishers/${id}`);
  },
  getAll: () => {
    return http.get("/publishers");
  },
};
