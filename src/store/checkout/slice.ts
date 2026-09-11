import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutState {
  isOpen: boolean;
  currentStep: number; // 0: Contacts, 1: Delivery, 2: Discounts, 3: Payment, 4: Success
  contactData: {
    name: string;
    phone: string;
    email: string;
  };
  deliveryData: {
    method: 'nova_poshta_branch' | 'nova_poshta_courier' | 'ukrposhta_branch' | 'pickup';
    city: string;
    branch: string;
    address: string;
    isAnotherRecipient: boolean;
    recipientName: string;
    recipientPhone: string;
  };
  discountData: {
    promoCode: string;
    discountPercent: number;
    isApplied: boolean;
    error: string;
  };
  paymentData: {
    method: 'card_online' | 'cash_on_delivery';
    comment: string;
    callMeBack: boolean;
  };
  orderSuccess: {
    isSuccess: boolean;
    orderId: string | null;
  };
}

const initialState: CheckoutState = {
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

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    openCheckout: (state) => {
      state.isOpen = true;
      state.orderSuccess = { isSuccess: false, orderId: null };
    },
    closeCheckout: (state) => {
      state.isOpen = false;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updateContactData: (state, action: PayloadAction<Partial<CheckoutState['contactData']>>) => {
      state.contactData = { ...state.contactData, ...action.payload };
    },
    updateDeliveryData: (state, action: PayloadAction<Partial<CheckoutState['deliveryData']>>) => {
      state.deliveryData = { ...state.deliveryData, ...action.payload };
    },
    updatePaymentData: (state, action: PayloadAction<Partial<CheckoutState['paymentData']>>) => {
      state.paymentData = { ...state.paymentData, ...action.payload };
    },
    applyPromoCode: (state, action: PayloadAction<string>) => {
      const code = action.payload.trim().toUpperCase();
      state.discountData.promoCode = action.payload;
      if (code === 'EASYBUY10' || code === 'SALE10' || code === 'PROMO10') {
        state.discountData.discountPercent = 10;
        state.discountData.isApplied = true;
        state.discountData.error = '';
      } else if (code === 'EASYBUY20' || code === 'SALE20') {
        state.discountData.discountPercent = 20;
        state.discountData.isApplied = true;
        state.discountData.error = '';
      } else {
        state.discountData.discountPercent = 0;
        state.discountData.isApplied = false;
        state.discountData.error = 'Invalid promo code';
      }
    },
    removePromoCode: (state) => {
      state.discountData.promoCode = '';
      state.discountData.discountPercent = 0;
      state.discountData.isApplied = false;
      state.discountData.error = '';
    },
    completeOrder: (state, action: PayloadAction<string>) => {
      state.orderSuccess = {
        isSuccess: true,
        orderId: action.payload,
      };
      state.currentStep = 4;
    },
    resetCheckout: (state) => {
      state.currentStep = 0;
      state.contactData = initialState.contactData;
      state.deliveryData = initialState.deliveryData;
      state.discountData = initialState.discountData;
      state.paymentData = initialState.paymentData;
      state.orderSuccess = initialState.orderSuccess;
    },
  },
});

export const {
  openCheckout,
  closeCheckout,
  setStep,
  updateContactData,
  updateDeliveryData,
  updatePaymentData,
  applyPromoCode,
  removePromoCode,
  completeOrder,
  resetCheckout,
} = checkoutSlice.actions;

export const selectIsCheckoutOpen = (state: { checkout: CheckoutState }) => state.checkout.isOpen;
export const selectCheckoutStep = (state: { checkout: CheckoutState }) => state.checkout.currentStep;
export const selectCheckoutContactData = (state: { checkout: CheckoutState }) => state.checkout.contactData;
export const selectCheckoutDeliveryData = (state: { checkout: CheckoutState }) => state.checkout.deliveryData;
export const selectCheckoutDiscountData = (state: { checkout: CheckoutState }) => state.checkout.discountData;
export const selectCheckoutPaymentData = (state: { checkout: { paymentData: CheckoutState['paymentData'] } }) => state.checkout.paymentData;
export const selectCheckoutOrderSuccess = (state: { checkout: CheckoutState }) => state.checkout.orderSuccess;

export default checkoutSlice.reducer;
