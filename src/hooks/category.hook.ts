import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "src/services/category.service";

export const useCategoriess = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAll(),
  });

  return { data, error, isError, isLoading };
};
