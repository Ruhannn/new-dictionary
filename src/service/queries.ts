import { useMutation } from "@tanstack/react-query";
import { getMeaning } from "./request";

export const useMeaning = () => {
    return useMutation({
        mutationFn: (word: string) => getMeaning(word),
    })
};
