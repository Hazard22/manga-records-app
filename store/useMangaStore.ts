import { create } from 'zustand';

interface Manga {
    id: string;
    title: string;
    purchasedVolumes: number;
    totalVolumes: number;
    coverImageUrl: string;
    bannerImgUrl: string;
}

interface MangaStore {
    mangas: Manga[]; 
    setMangaData: (mangasData: Manga[]) => void;
    addManga: (mangaData: Manga) => void;
}

export const useMangaStore = create<MangaStore>((set) => ({
    mangas: [], 

    setMangaData: (mangasData: Manga[]) => set({ mangas: mangasData }),

    addManga: (mangaData: Manga) =>
        set((state) => ({
            mangas: [...state.mangas, mangaData]
        })),
}));
