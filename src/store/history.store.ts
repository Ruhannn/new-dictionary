import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type History = {
    id: string
    word: string
    createdAt: Date
    pinned?: boolean
}



type HistoryStore = {
    history: History[],
    add: (history: History) => void,
    remove: (history: History) => void,
    clear: () => void,
    importHistory: (history: History[]) => void,
    exportHistory: () => void,
    pinned: (id: string) => void,
}

export const useHistoryStore = create<HistoryStore>()(
    persist(
        (set, get) => ({
            history: [],
            add: (history) => {
                set((state) => ({
                    history: [...state.history, history]
                }))
            },
            remove: (history) => {
                set((state) => ({
                    history: state.history.filter((item) => item.id !== history.id)
                }))
            },
            clear: () => {
                set(() => ({
                    history: []
                }))
            },
            importHistory: (history) => {
                set(() => ({
                    history
                }))
            },
            exportHistory: () => {
                const historyData = JSON.stringify(get().history)
                console.log(historyData)
                navigator.clipboard.writeText(historyData)
            },
            pinned: (id) => {
                set((state) => ({
                    history: state.history.map((item) =>
                        item.id === id ? { ...item, pinned: !item.pinned } : item
                    ),
                }));
            }

        }),
        {
            name: 'history-store',
            storage: {
                getItem: (name) => {
                    const item = window.localStorage.getItem(name)
                    return item ? JSON.parse(item) : null
                },
                setItem: (name, value) => {
                    window.localStorage.setItem(name, JSON.stringify(value))
                },
                removeItem: (name) => {
                    window.localStorage.removeItem(name)
                }
            },
        }
    )
)
