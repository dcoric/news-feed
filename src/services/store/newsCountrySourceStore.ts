import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NEWS_COUNTRY } from '../constants';

interface NewsCountrySourceState {
  data: string;
  longName: string;
  setCountry: (country: string) => void;
}

const getLongName = (country: string): string => {
  switch (country) {
    case 'GB':
      return 'Great Britain';
    case 'US':
      return 'United States';
    default:
      return 'World';
  }
};

export const useNewsCountrySourceStore = create<NewsCountrySourceState>()(
  persist(
    (set) => ({
      data: 'GB',
      longName: 'Great Britain',

      setCountry: (country: string) => {
        sessionStorage.setItem(NEWS_COUNTRY, country);
        set({ data: country, longName: getLongName(country) });
      }
    }),
    {
      name: 'news-country-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ data: state.data, longName: state.longName })
    }
  )
);