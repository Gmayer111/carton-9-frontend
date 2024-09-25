import { useQuery } from "@tanstack/react-query";
import { PublisherService } from "src/services/publisher.service";

export const usePublishers = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: () => PublisherService.getAll(),
  });

  return { data, error, isError, isLoading };
};
