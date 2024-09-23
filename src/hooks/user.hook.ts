import { useQuery } from "@tanstack/react-query";

import { UserService } from "src/services/user.service";

export const useUsers = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getAll(),
  });

  return { data, error, isError, isLoading };
};
