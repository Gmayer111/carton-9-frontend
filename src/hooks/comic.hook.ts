import { useQuery } from "@tanstack/react-query";
import { ComicService } from "src/services/comic.service";

export const useComics = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["comics"],
    queryFn: () => ComicService.getAll(),
  });

  return { data, error, isError, isLoading };
};

export const getComicAssociations = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["comic-associations"],
    queryFn: () => ComicService.getComicAssociations(),
  });

  return { data, error, isError, isLoading };
};
