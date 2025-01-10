import { create } from 'zustand';

interface Manga {
    id: string;
    title: string;
    purchasedVolumes: number;
    totalVolumes: number;
    coverImageUrl: string;
}

interface MangaStore {
    mangas: Manga[]; 
    setOriginAddress: (mangasData: Manga[]) => void;
    addManga: (mangaData: Manga) => void;
}

export const useGuideStore = create<MangaStore>((set) => ({
    mangas: [], 

    setOriginAddress: (mangasData: Manga[]) => set({ mangas: mangasData }),

    addManga: (mangaData: Manga) =>
        set((state) => ({
            mangas: [...state.mangas, mangaData]
        })),
}));
