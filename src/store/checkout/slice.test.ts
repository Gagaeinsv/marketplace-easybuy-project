import { describe, it, expect, beforeEach } from 'vitest';
import checkoutReducer, {
  setStep,
  openCheckout,
  closeCheckout,
  updateContactData,
  updateDeliveryData,
  updatePaymentData,
  applyPromoCode,
  removePromoCode,
  completeOrder,
  resetCheckout,
  CheckoutState,
} from './slice';

describe('Checkout Redux Slice - Structural Unit Tests', () => {
  let state: CheckoutState;

  beforeEach(() => {
    state = {
      isOpen: false,
      currentStep: 0,
      contactData: {
        name: '',
        phone: '',
        email: '',
      },
      deliveryData: {
        method: 'nova_poshta_branch',
        city: 'Київ',
        branch: '',
        address: '',
        isAnotherRecipient: false,
        recipientName: '',
        recipientPhone: '',
      },
      discountData: {
        promoCode: '',
        discountPercent: 0,
        isApplied: false,
        error: '',
      },
      paymentData: {
        method: 'card_online',
        comment: '',
        callMeBack: false,
      },
      orderSuccess: {
        isSuccess: false,
        orderId: null,
      },
    };
  });

  // 1. STATEMENT & PATH COVERAGE: Step Navigation
  describe('Step Transitions & Modal Control (Path Coverage)', () => {
    it('should open and close checkout modal', () => {
      state = checkoutReducer(state, openCheckout());
      expect(state.isOpen).toBe(true);
      expect(state.orderSuccess.isSuccess).toBe(false);

      state = checkoutReducer(state, closeCheckout());
      expect(state.isOpen).toBe(false);
    });

    it('should navigate through all checkout steps (0 -> 1 -> 2 -> 3 -> 4)', () => {
      state = checkoutReducer(state, setStep(1));
      expect(state.currentStep).toBe(1);

      state = checkoutReducer(state, setStep(2));
      expect(state.currentStep).toBe(2);

      state = checkoutReducer(state, setStep(3));
      expect(state.currentStep).toBe(3);

      state = checkoutReducer(state, completeOrder('#EB-849201'));
      expect(state.currentStep).toBe(4);
      expect(state.orderSuccess.isSuccess).toBe(true);
      expect(state.orderSuccess.orderId).toBe('#EB-849201');
    });
  });

  // 2. BRANCH & CONDITION COVERAGE: Promo Code Validation
  describe('Promo Code Calculation (Branch & Condition Coverage)', () => {
    it('Branch 1: should apply 10% discount for EASYBUY10, SALE10 or PROMO10', () => {
      state = checkoutReducer(state, applyPromoCode('EASYBUY10'));
      expect(state.discountData.discountPercent).toBe(10);
      expect(state.discountData.isApplied).toBe(true);
      expect(state.discountData.error).toBe('');

      state = checkoutReducer(state, applyPromoCode('sale10'));
      expect(state.discountData.discountPercent).toBe(10);
      expect(state.discountData.isApplied).toBe(true);
    });

    it('Branch 2: should apply 20% discount for EASYBUY20 or SALE20', () => {
      state = checkoutReducer(state, applyPromoCode('SALE20'));
      expect(state.discountData.discountPercent).toBe(20);
      expect(state.discountData.isApplied).toBe(true);
      expect(state.discountData.error).toBe('');
    });

    it('Branch 3: should reject invalid promo code and set error message', () => {
      state = checkoutReducer(state, applyPromoCode('INVALID_CODE_999'));
      expect(state.discountData.discountPercent).toBe(0);
      expect(state.discountData.isApplied).toBe(false);
      expect(state.discountData.error).toBe('Invalid promo code');
    });

    it('should remove promo code and reset discount state', () => {
      state = checkoutReducer(state, applyPromoCode('EASYBUY20'));
      expect(state.discountData.discountPercent).toBe(20);

      state = checkoutReducer(state, removePromoCode());
      expect(state.discountData.promoCode).toBe('');
      expect(state.discountData.discountPercent).toBe(0);
      expect(state.discountData.isApplied).toBe(false);
    });
  });

  // 3. STATEMENT & CONDITION COVERAGE: Form Data Updates
  describe('Form Data Updates (Statement Coverage)', () => {
    it('should update contact data', () => {
      state = checkoutReducer(
        state,
        updateContactData({
          name: 'Олександр Гагарін',
          phone: '+380501234567',
          email: 'alex@easybuy.ua',
        })
      );

      expect(state.contactData.name).toBe('Олександр Гагарін');
      expect(state.contactData.phone).toBe('+380501234567');
      expect(state.contactData.email).toBe('alex@easybuy.ua');
    });

    it('should update delivery data and recipient info', () => {
      state = checkoutReducer(
        state,
        updateDeliveryData({
          method: 'nova_poshta_branch',
          city: 'Київ',
          branch: 'Відділення №15',
          isAnotherRecipient: true,
          recipientName: 'Іван Петренко',
          recipientPhone: '+380679998877',
        })
      );

      expect(state.deliveryData.method).toBe('nova_poshta_branch');
      expect(state.deliveryData.city).toBe('Київ');
      expect(state.deliveryData.branch).toBe('Відділення №15');
      expect(state.deliveryData.isAnotherRecipient).toBe(true);
      expect(state.deliveryData.recipientName).toBe('Іван Петренко');
    });

    it('should update payment data and comments', () => {
      state = checkoutReducer(
        state,
        updatePaymentData({
          method: 'card_online',
          comment: 'Зателефонуйте перед доставкою',
          callMeBack: false,
        })
      );

      expect(state.paymentData.method).toBe('card_online');
      expect(state.paymentData.comment).toBe('Зателефонуйте перед доставкою');
      expect(state.paymentData.callMeBack).toBe(false);
    });

    it('should reset checkout state back to initial values', () => {
      state = checkoutReducer(state, setStep(3));
      state = checkoutReducer(state, applyPromoCode('SALE20'));
      state = checkoutReducer(state, completeOrder('#EB-112233'));

      state = checkoutReducer(state, resetCheckout());
      expect(state.currentStep).toBe(0);
      expect(state.orderSuccess.isSuccess).toBe(false);
      expect(state.orderSuccess.orderId).toBeNull();
      expect(state.discountData.discountPercent).toBe(0);
    });
  });
});
