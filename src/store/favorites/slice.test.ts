import { describe, it, expect, beforeEach } from 'vitest';
import favoritesReducer, {
  toggleFavorite,
  clearFavorites,
  toggleFavoritesDrawer,
  openFavorites,
  closeFavorites,
} from './slice';

describe('Favorites Redux Slice - Structural Unit Tests', () => {
  let state = {
    itemIds: [] as string[],
    isOpen: false,
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    state = {
      itemIds: ['prod-1', 'prod-2'],
      isOpen: false,
      isLoading: false,
      error: null,
    };
  });

  // Statement & Branch Coverage: Toggle Favorite
  describe('Toggle Favorite (Branch Coverage)', () => {
    it('Branch 1: should add product ID if not currently in favorites', () => {
      state = favoritesReducer(state, toggleFavorite('prod-3'));
      expect(state.itemIds).toHaveLength(3);
      expect(state.itemIds).toContain('prod-3');
    });

    it('Branch 2: should remove product ID if already in favorites', () => {
      state = favoritesReducer(state, toggleFavorite('prod-1'));
      expect(state.itemIds).toHaveLength(1);
      expect(state.itemIds).not.toContain('prod-1');
      expect(state.itemIds).toContain('prod-2');
    });
  });

  // Clear all favorites
  describe('Clear Favorites', () => {
    it('should clear all favorites', () => {
      state = favoritesReducer(state, clearFavorites());
      expect(state.itemIds).toEqual([]);
    });
  });

  // Favorites Drawer Toggle
  describe('Favorites Drawer Open/Close Control', () => {
    it('should open, close and toggle favorites drawer', () => {
      state = favoritesReducer(state, openFavorites());
      expect(state.isOpen).toBe(true);

      state = favoritesReducer(state, closeFavorites());
      expect(state.isOpen).toBe(false);

      state = favoritesReducer(state, toggleFavoritesDrawer());
      expect(state.isOpen).toBe(true);
    });
  });
});
