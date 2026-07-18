import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  price: { min: number; max: number };
  brands: string[];
  sizes: string[];
  colors: string[];
  rating: number | null;
  sort: string; // e.g. 'price_asc', 'price_desc', 'newest'
}

const initialState: FiltersState = {
  price: { min: 0, max: 10000 },
  brands: [],
  sizes: [],
  colors: [],
  rating: null,
  sort: 'newest',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.price = action.payload;
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload;
      if (state.brands.includes(brand)) {
        state.brands = state.brands.filter((b) => b !== brand);
      } else {
        state.brands.push(brand);
      }
    },
    toggleSize: (state, action: PayloadAction<string>) => {
      const size = action.payload;
      if (state.sizes.includes(size)) {
        state.sizes = state.sizes.filter((s) => s !== size);
      } else {
        state.sizes.push(size);
      }
    },
    toggleColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      if (state.colors.includes(color)) {
        state.colors = state.colors.filter((c) => c !== color);
      } else {
        state.colors.push(color);
      }
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.rating = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const {
  setPriceRange,
  toggleBrand,
  toggleSize,
  toggleColor,
  setRating,
  setSort,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
