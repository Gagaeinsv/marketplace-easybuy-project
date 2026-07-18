import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  isOpen: boolean;
  currentStep: number; // 0: Контакти, 1: Доставка, 2: Знижки, 3: Оплата
  contactData: {
    name: string;
    phone: string;
    email: string;
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
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    openCheckout: (state) => {
      state.isOpen = true;
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
    resetCheckout: (state) => {
      state.currentStep = 0;
      state.contactData = initialState.contactData;
    }
  },
});

export const { openCheckout, closeCheckout, setStep, updateContactData, resetCheckout } = checkoutSlice.actions;

export const selectIsCheckoutOpen = (state: { checkout: CheckoutState }) => state.checkout.isOpen;
export const selectCheckoutStep = (state: { checkout: CheckoutState }) => state.checkout.currentStep;
export const selectCheckoutContactData = (state: { checkout: CheckoutState }) => state.checkout.contactData;

export default checkoutSlice.reducer;
