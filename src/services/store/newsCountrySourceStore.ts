import { create } from 'zustand';
import { NEWS_COUNTRY } from '../constants';

interface NewsCountrySourceState {
  data: string;
  longName: string;
  setCountry: (country: string) => void;
}

export const useNewsCountrySourceStore = create<NewsCountrySourceState>((set) => ({
  data: 'GB',
  longName: 'Great Britain',

  setCountry: (country: string) => {
    sessionStorage.setItem(NEWS_COUNTRY, country);
    let longName: string;
    switch (country) {
      case 'GB':
        longName = 'Great Britain';
        break;
      case 'US':
        longName = 'United States';
        break;
      default:
        longName = 'World';
    }
    set({ data: country, longName });
  }
}));
