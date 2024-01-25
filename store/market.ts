// store.ts
import create, { SetState } from 'zustand';

interface CactusStore {
  cactuses: Cactus[];
  pots: Pot[];
  setCactuses: (cactuses: Cactus[]) => void;
  setPots: (pots: Pot[]) => void;


  activeCactus: number;
  activePot: number;
  setActiveCactus: (activeCactus: number) => void;
  setActivePot: (activePot: number) => void;
}



type Cactus = {
  name: string
  about: string
  image: string
  inStock: boolean
  createdAt: Date
  order: number
  id: string
}

type Pot = {
  name: string
  about: string
  image: string
  inStock: boolean
  createdAt: Date
  order: number
  id: string
}



const useCactusStore = create<CactusStore>((set: SetState<CactusStore>) => ({

  cactuses:[],
  pots: [],
  setCactuses: (cactuses: Cactus[]) => set({ cactuses }),
  setPots: (pots: Pot[]) => set({ pots }),

  activeCactus: 0,
  activePot: 0,
  setActiveCactus: (activeCactus: number) => set({ activeCactus }),
  setActivePot: (activePot: number) => set({ activePot }),
}));

export default useCactusStore;
