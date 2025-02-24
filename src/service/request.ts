import axios from "axios";
import { WordData } from "../@types";

export const getMeaning = async (word: string) => {
    return (await axios.get<WordData[]>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)).data
};
