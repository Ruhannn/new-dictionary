import { create } from "zustand";

export const useStore = create<{ value: string | undefined; setValue: (value: string) => void }>((set) => ({
        value: undefined,
        setValue: (value) => set({ value }),
    })
);
