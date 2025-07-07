import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/getUserProfile";

export function useFetchUserProfile(userId: string) {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
  });
}
