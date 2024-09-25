import { AxiosResponse } from "axios";
import { TPublisher } from "src/types/publisher";
import { TService } from "src/types/services";
import { http } from "src/utils/http";

type TPublisherService = TService<AxiosResponse<TPublisher[], any>>;

export const PublisherService: TPublisherService = {
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
