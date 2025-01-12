import { create } from 'zustand';


interface Volume {
    id: string;
    title: string;
    imageUrl: string;
    available: boolean;
    bought: boolean;
}

interface MangaDetails {
    id: string;
    title: string;
    purchasedVolumes: number;
    totalVolumes: number;
    coverImageUrl: string;
    bannerImgUrl: string;
    volumes: Volume[] | [];
}

interface MangaDetailsStore {
    manga: MangaDetails | null; 
    setMangaData: (mangaData: Omit<MangaDetails, 'volumes'>) => void; 
    setVolumes: (volumes: Volume[]) => void;
    addVolume: (volume: Volume) => void;
    updateVolume: (id: string, updates: Partial<Pick<Volume, 'available' | 'bought'>>) => void;
}

export const useMangaDetailsStore = create<MangaDetailsStore>((set) => ({
    manga: null, 

    setMangaData: (mangaData) => 
        set((state) => ({
            manga: {
                ...mangaData,
                volumes: [], 
            },
        })),

    setVolumes: (volumes) =>
        set((state) => ({
            manga: state.manga
                ? { ...state.manga, volumes } 
                : null,
        })),
        
    addVolume: (volume) =>
        set((state) => ({
            manga: state.manga
                ? { ...state.manga, volumes: [...state.manga.volumes, volume] } 
                : null,
        })),

    updateVolume: (id, updates) =>
        set((state) => ({
            manga: state.manga
                ? {
                    ...state.manga,
                    volumes: state.manga.volumes.map((volume) =>
                        volume.id === id
                            ? { ...volume, ...updates } 
                            : volume
                    ),
                }
                : null,
        })),
}));
