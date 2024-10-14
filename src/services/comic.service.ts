import { AxiosResponse } from "axios";
import { TComic } from "src/types/comic";
import { TComicServices, TServices } from "src/types/services";
import { http } from "src/utils/http";

export const ComicService: TServices<
  AxiosResponse<TComic[], any>,
  TComicServices
> = {
  create: (comic, comicAssociations) => {
    return http.post("/comics", comic, comicAssociations);
  },
  update: (id, data) => {
    return http.put(`/comics/${id}`, data);
  },
  delete: (id) => {
    return http.delete(`/comics/${id}`);
  },
  getById: (id) => {
    return http.get(`/comics/${id}`);
  },
  getAll: () => {
    return http.get("/comics");
  },
  getComicAssociations: () => {
    return http.get("/comics/comic-associations");
  },
};
