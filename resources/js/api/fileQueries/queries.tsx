import { get } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { _queryKey, _root } from "./config";

export function useFile(id: number) {
    return useQuery({
        queryKey: [_queryKey, id],
        queryFn: () => get(`${_root}/${id}`)
    })
}

export function useFiles() {
    const { data, isLoading, refetch } = useQuery({
      queryKey: [_queryKey],
      queryFn: () => get(_root),
      refetchOnWindowFocus: false,
    });
  
    return { data, isLoading, refetch };
  }
