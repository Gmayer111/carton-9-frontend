import { useQuery } from "@tanstack/react-query";
import { CollectionService } from "src/services/collection.service";

export const useCollections = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: () => CollectionService.getAll(),
  });

  return { data, error, isError, isLoading };
};
