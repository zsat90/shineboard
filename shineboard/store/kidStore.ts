import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Kid, Star } from '../types/model';

interface KidState {
  kids: Kid[];
  addKid: (name: string, gender: 'male' | 'female') => void;
  giveStar: (kidId: string) => void;
  removeKid: (kidId: string) => void;
}

export const useKidStore = create<KidState>()(
  persist(
    (set) => ({
      kids: [],

      addKid: (name, gender) =>
        set((state) => ({
          kids: [
            ...state.kids,
            {
              id: uuidv4(),
              name,
              gender,
              stars: 0,
            },
          ],
        })),

      giveStar: (kidId: string) =>
        set((state) => ({
          kids: state.kids.map((kid) => (kid.id === kidId ? { ...kid, stars: kid.stars + 1 } : kid)),
        })),

      removeKid: (kidId) => {
        set((state) => ({
          kids: state.kids.filter((kid) => kid.id !== kidId),
        }));
      },
    }),

    {
      name: 'kid-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
