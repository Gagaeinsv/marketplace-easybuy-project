import { describe, it, expect, beforeEach } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  selectCartTotalItems,
  selectCartTotalPrice,
  CartItem,
} from './slice';

describe('Cart Redux Slice - Structural Unit Tests', () => {
  const sampleItem1: CartItem = {
    id: 'item-1',
    art: '1001',
    name: 'Nike Air Max',
    price: 3500,
    image: '/images/nike.png',
    quantity: 1,
    size: '42',
    color: 'Black',
  };

  const sampleItem2: CartItem = {
    id: 'item-2',
    art: '1002',
    name: 'Adidas Ultraboost',
    price: 4200,
    image: '/images/adidas.png',
    quantity: 2,
    size: '43',
    color: 'White',
  };

  let state = {
    items: [] as CartItem[],
    isOpen: false,
    isLoading: false,
    error: null,
  };

  beforeEach(() => {
    state = {
      items: [],
      isOpen: false,
      isLoading: false,
      error: null,
    };
  });

  // Statement & Branch Coverage: Adding items to cart
  describe('Add to Cart Logic (Branch Coverage)', () => {
    it('Branch 1: should add new item to cart when not existing', () => {
      state = cartReducer(state, addToCart(sampleItem1));
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe('item-1');
      expect(state.items[0].quantity).toBe(1);
      expect(state.isOpen).toBe(true);
    });

    it('Branch 2: should increment quantity if exact item with same size and color is added again', () => {
      state = cartReducer(state, addToCart(sampleItem1));
      state = cartReducer(state, addToCart({ ...sampleItem1, quantity: 2 }));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(3);
    });

    it('Branch 3: should treat item with different size/color as separate cart item', () => {
      state = cartReducer(state, addToCart(sampleItem1));
      state = cartReducer(state, addToCart({ ...sampleItem1, size: '44' }));

      expect(state.items).toHaveLength(2);
      expect(state.items[0].size).toBe('42');
      expect(state.items[1].size).toBe('44');
    });
  });

  // Update quantity & Remove
  describe('Quantity and Removal (Statement & Condition Coverage)', () => {
    it('should update item quantity correctly', () => {
      state = cartReducer(state, addToCart(sampleItem1));
      state = cartReducer(
        state,
        updateQuantity({ id: 'item-1', size: '42', color: 'Black', quantity: 5 })
      );

      expect(state.items[0].quantity).toBe(5);
    });

    it('should remove specific item from cart', () => {
      state = cartReducer(state, addToCart(sampleItem1));
      state = cartReducer(state, addToCart(sampleItem2));
      expect(state.items).toHaveLength(2);

      state = cartReducer(
        state,
        removeFromCart({ id: 'item-1', size: '42', color: 'Black' })
      );
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe('item-2');
    });

    it('should clear entire cart', () => {
      state = cartReducer(state, addToCart(sampleItem1));
      state = cartReducer(state, addToCart(sampleItem2));
      state = cartReducer(state, clearCart());

      expect(state.items).toEqual([]);
    });
  });

  // Selectors calculation: Total items and Total price
  describe('Cart Selectors Calculation (Path Coverage)', () => {
    it('should calculate total items and total price correctly', () => {
      state = cartReducer(state, addToCart(sampleItem1)); // 1 x 3500 = 3500
      state = cartReducer(state, addToCart(sampleItem2)); // 2 x 4200 = 8400

      const rootState = { cart: state };
      const totalItems = selectCartTotalItems(rootState);
      const totalPrice = selectCartTotalPrice(rootState);

      expect(totalItems).toBe(3);
      expect(totalPrice).toBe(11900); // 3500 + 8400 = 11900
    });
  });

  // Modal open/close toggle
  describe('Cart Drawer Toggle', () => {
    it('should toggle, open and close cart drawer', () => {
      state = cartReducer(state, toggleCart());
      expect(state.isOpen).toBe(true);

      state = cartReducer(state, closeCart());
      expect(state.isOpen).toBe(false);

      state = cartReducer(state, openCart());
      expect(state.isOpen).toBe(true);
    });
  });
});
