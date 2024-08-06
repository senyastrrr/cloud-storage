import { deleteRequest, post, put } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _queryKey, _root } from "./config";

export function useDeleteFile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteRequest(`${_root}/${id}`),
        onSettled: async (_, error) => {
            if (error)
                console.log(error);
            else
                await queryClient.invalidateQueries({ queryKey: [_queryKey] })
        }
    })
}