import { useQuery } from "@tanstack/react-query";
import { AuthorService } from "src/services/author.service";

export const useAuthors = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: () => AuthorService.getAll(),
  });

  return { data, error, isError, isLoading };
};
