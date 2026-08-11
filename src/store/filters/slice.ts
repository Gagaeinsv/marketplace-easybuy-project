import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  price: { min: number; max: number };
  brands: string[];
  sizes: string[];
  colors: string[];
  materials: string[];
  onlyDiscount: boolean;
  rating: number | null;
  sort: string; // 'newest', 'price_asc', 'price_desc', 'popular'
}

const initialState: FiltersState = {
  price: { min: 0, max: 10000 },
  brands: [],
  sizes: [],
  colors: [],
  materials: [],
  onlyDiscount: false,
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
    toggleMaterial: (state, action: PayloadAction<string>) => {
      const mat = action.payload;
      if (state.materials.includes(mat)) {
        state.materials = state.materials.filter((m) => m !== mat);
      } else {
        state.materials.push(mat);
      }
    },
    toggleOnlyDiscount: (state) => {
      state.onlyDiscount = !state.onlyDiscount;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.rating = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setPriceRange,
  toggleBrand,
  toggleSize,
  toggleColor,
  toggleMaterial,
  toggleOnlyDiscount,
  setRating,
  setSort,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
