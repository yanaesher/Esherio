import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/getPosts";

export function usePosts(userId?: string) {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPosts(userId!),
    enabled: !!userId,
  });
}
