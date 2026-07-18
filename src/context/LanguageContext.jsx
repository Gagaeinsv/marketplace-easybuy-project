'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const dictionary = {
  en: {
    catalogue: 'Catalog',
    contacts: 'Contacts',
    sale: 'Sale',
    searchPlaceholder: 'Search stores, products, users, orders...',
    searchButton: 'Search',
    signUp: 'Sign up',
    favorites: 'Favorites',
    myProfile: 'My Profile',
    logOut: 'Log Out',
    logIn: 'Log In',
    
    // FooterSeller
    startSelling: 'Start selling today!',
    sellSubtitle: 'Join our marketplace and discover new opportunities for your business!',
    sellPoint1: 'Millions of buyers are waiting for your products;',
    sellPoint2: 'Increase sales and make more profit;',
    sellPoint3: 'User-friendly control panel and growth tools',
    sellButton: 'Sell Your Item',
    
    // Footer
    deliveryPayment: 'Delivery and payment',
    guarantee: 'Guarantee',
    productReturn: 'Product return',
    support: 'Support',
    news: 'News',
    marketplaceGuide: 'Marketplace Guide',
    copyright: '© Easybuy.2024 All rights reserved',
    privacyPolicy: 'Privacy Policy',
    userAgreement: 'User Agreement',

    // MobileMenu
    close: 'Close',
    back: 'Back',
    notEmpty: 'No items',
    selectCategory: 'Select a category →',
    selectSubcategory: 'Select a subcategory →',

    // Home Page
    favoriteBrands: 'Favorite brands',
    ukrainianBrands: 'Ukrainian Brands',
    recommendations: 'Recommendations',
    shopNow: 'Shop now',
    onSale: 'On Sale',
    addToCart: 'Add to Cart',
    christmasSale: 'Christmas Sale',
    upTo33: 'Up to -33%',
    
    // Promo Slider
    promoTitle1: 'Summer Collection',
    promoDesc1: 'Discover the hottest swimwear of the season',
    promoTitle2: 'Yacht Life',
    promoDesc2: 'Exclusive beachwear for your perfect vacation',
    promoTitle3: 'Sunset Vibes',
    promoDesc3: 'Shine bright all summer long',

    // Auth & Modals
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signUpAction: 'Sign up',
    logInAction: 'Log in',
    logInTitle: 'Log in',
    signUpTitle: 'Sign up',
    signUpSeller: 'as Seller',
    userAgreementLink: 'User Agreement',
    privacyPolicyLink: 'Privacy Policy',
    emailLabel: 'Email',
    emailPlaceholder: 'Enter Email',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm Password',
    phoneNumberLabel: 'Phone number',
    phoneNumberPlaceholder: 'Enter Phone number',
    rememberMe: 'Remember Me',
    forgotPasswordLink: 'Forgot Password?',
    confirmBtn: 'Confirm',
    resetPasswordTitle: 'Reset Password',
    resetPasswordSub: 'Enter your email address and we will send you a link to reset your password.',
    sendResetLinkBtn: 'Send reset link',
    backToLoginBtn: 'Back to Login',
    signUpAsSeller: 'Sign up as Seller',
    signUpAsBuyer: 'Sign up as Buyer',
    loadingText: 'Loading...',
    sendingText: 'Sending...',
    // Cart
    cartTitle: 'Cart',
    emptyCartTitle: 'Your cart is empty',
    emptyCartDesc: "Looks like you haven't added anything to your cart yet",
    deleteAll: 'Delete all',
    itemCount: 'item',
    itemsCount: 'items',
    subtotal: 'Subtotal',
    discount: 'Discount',
    total: 'Total',
    continueShopping: 'Continue shopping',
    placeOrder: 'Place an order',
    allItems: 'All items',
    summary: 'Summary',
    
    // Checkout
    checkoutTitle: 'Checkout',
    stepContacts: 'Contacts',
    stepDelivery: 'Delivery',
    stepDiscounts: 'Discounts',
    stepPayment: 'Payment',
    authTitle: 'Authorization',
    authDesc: 'Log in or register to get bonus points',
    loginToCabinet: 'Log in to account',
    continueWithoutAuth: 'Continue without logging in',
    nameLabel: 'Name',
    namePlaceholder: 'Name',
    nextDelivery: 'Next (Delivery)',
    
    // Buyer Profile
    personalData: 'Personal data',
    myOrders: 'My orders',
    cartMenu: 'Cart',
    message: 'Message',
    wishlist: 'Wishlist',
    productsToCompare: 'Products to compare',
    payment: 'Payment',
    settings: 'Settings',
    helpCenter: 'Help Center',
    userData: 'User data',
    addressData: 'Address data/delivery address',
    profileName: 'Name',
    dateOfBirth: 'Date of birth',
    profilePhone: 'Phone Number',
    profileEmail: 'Email',
    country: 'Country',
    city: 'City',
    address: 'Address',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    productReturnTitle: 'Product return. Order #',
    returnReason: 'Return reason',
    additionalInfo: 'Additional information',
    selectFromList: 'Select from the list',
    refundSuccessTitle: 'Return request successfully sent!',
    refundSuccessDesc: 'A seller will contact you shortly.',
    itemsAddedToCart: 'Items successfully added to cart!',
    leaveReviewTitle: 'Leave a review. Order #',
    yourRating: 'Your rating',
    writeReview: 'Write your review',
    sendReviewBtn: 'Send review',
    reviewSuccessTitle: 'Thank you for your feedback!',
    reviewSuccessDesc: 'Your review has been successfully submitted and will be published soon.',
    // Messages
    messagesAll: 'All',
    messagesUnread: 'Unread',
    messagesArchived: 'Archived',
    messagesSaved: 'Saved',
    noMessages: 'You have no messages yet.',
    markAsUnread: 'Mark as unread',
    archiveDiscussion: 'Archive',
    deleteDiscussion: 'Delete discussion',
    toFixDiscussion: 'To fix',
    saveDiscussion: 'Saved',
    messagePlaceholder: 'Message',
    sendAMessage: 'Send a message',
    // Delete Modal
    deleteItemTitle: 'Delete item?',
    deleteItemDesc: 'The item will be removed from the cart. If you change your mind, you can always add it again.',
    deleteItemYes: 'Yes, delete',
    deleteItemNo: 'No, keep',
    // Wishlist
    wishlistEmptyTitle: 'Your wish list is currently empty.',
    wishlistEmptyDesc: 'Find your favorite positions and add them to your wishlist to come back to them later.',
    catalogueBtn: 'Catalogue',
    shareWishlist: 'Share your wishlist',
  },
  ua: {
    catalogue: 'Каталог',
    contacts: 'Контакти',
    sale: 'Розпродаж',
    searchPlaceholder: 'Пошук товарів, магазинів, замовлень...',
    searchButton: 'Пошук',
    signUp: 'Реєстрація',
    favorites: 'Улюблені',
    myProfile: 'Мій кабінет',
    logOut: 'Вийти',
    logIn: 'Увійти',
    
    // FooterSeller
    startSelling: 'Почніть продавати вже сьогодні!',
    sellSubtitle: 'Приєднуйтесь до нашого маркетплейсу та відкрийте нові можливості для бізнесу!',
    sellPoint1: 'Мільйони покупців чекають на ваші товари;',
    sellPoint2: 'Збільшуйте продажі та отримуйте більше прибутку;',
    sellPoint3: 'Зручна панель управління та інструменти зростання',
    sellButton: 'Почати продавати',
    
    // Footer
    deliveryPayment: 'Доставка та оплата',
    guarantee: 'Гарантія',
    productReturn: 'Повернення товару',
    support: 'Підтримка',
    news: 'Новини',
    marketplaceGuide: 'Гід покупця',
    copyright: '© Easybuy.2024 Всі права захищені',
    privacyPolicy: 'Політика приватності',
    userAgreement: 'Угода користувача',

    // MobileMenu
    close: 'Закрити',
    back: 'Назад',
    notEmpty: 'Немає елементів',
    selectCategory: 'Виберіть категорію →',
    selectSubcategory: 'Виберіть підкатегорію →',

    // Home Page
    favoriteBrands: 'Улюблені бренди',
    ukrainianBrands: 'Українські бренди',
    recommendations: 'Рекомендації',
    shopNow: 'Дивитись всі',
    onSale: 'Розпродаж',
    addToCart: 'У кошик',
    christmasSale: 'Різдвяний розпродаж',
    upTo33: 'Знижки до -33%',
    
    // Promo Slider
    promoTitle1: 'Літня колекція',
    promoDesc1: 'Відкрийте для себе найгарячіші купальники сезону',
    promoTitle2: 'Життя на яхті',
    promoDesc2: 'Ексклюзивний пляжний одяг для ідеальної відпустки',
    promoTitle3: 'Захід сонця',
    promoDesc3: 'Сяйте яскраво все літо',

    // Auth & Modals
    dontHaveAccount: 'Немає акаунту?',
    alreadyHaveAccount: 'Вже є акаунт?',
    signUpAction: 'Зареєструватися',
    logInAction: 'Увійти',
    logInTitle: 'Вхід',
    signUpTitle: 'Реєстрація',
    signUpSeller: 'як продавець',
    userAgreementLink: 'Угода користувача',
    privacyPolicyLink: 'Політика приватності',
    emailLabel: 'Email',
    emailPlaceholder: 'Введіть Email',
    passwordLabel: 'Пароль',
    passwordPlaceholder: 'Введіть пароль',
    confirmPasswordLabel: 'Підтвердження паролю',
    confirmPasswordPlaceholder: 'Підтвердження паролю',
    phoneNumberLabel: 'Номер телефону',
    phoneNumberPlaceholder: 'Введіть номер телефону',
    rememberMe: 'Запам\'ятати мене',
    forgotPasswordLink: 'Забули пароль?',
    confirmBtn: 'Підтвердити',
    resetPasswordTitle: 'Скинути пароль',
    resetPasswordSub: 'Введіть адресу вашої електронної пошти, і ми надішлемо вам посилання для скидання паролю.',
    sendResetLinkBtn: 'Надіслати посилання',
    backToLoginBtn: 'Назад до входу',
    signUpAsSeller: 'Зареєструватися як продавець',
    signUpAsBuyer: 'Зареєструватися як покупець',
    loadingText: 'Завантаження...',
    sendingText: 'Надсилання...',
    
    // Cart
    cartTitle: 'Кошик',
    emptyCartTitle: 'Ваш кошик порожній',
    emptyCartDesc: 'Схоже, ви ще нічого не додали до свого кошика',
    deleteAll: 'Видалити все',
    itemCount: 'товар',
    itemsCount: 'товари',
    subtotal: 'Підсумок',
    discount: 'Знижка',
    total: 'Разом',
    continueShopping: 'Продовжити покупки',
    placeOrder: 'Оформити замовлення',
    allItems: 'Усі товари',
    summary: 'Підсумок',
    
    // Checkout
    checkoutTitle: 'Замовлення',
    stepContacts: 'Контакти',
    stepDelivery: 'Доставка',
    stepDiscounts: 'Знижки',
    stepPayment: 'Оплата',
    authTitle: 'Авторизація',
    authDesc: 'Увійдіть або зареєструйтесь у власний кабінет, щоб отримати бонусні бали',
    loginToCabinet: 'Увійти у власний кабінет',
    continueWithoutAuth: 'Продовжити без авторизації',
    nameLabel: 'Ім\'я',
    namePlaceholder: 'Ім\'я',
    nextDelivery: 'Далі (Доставка)',
    
    // Buyer Profile
    personalData: 'Особисті дані',
    myOrders: 'Мої замовлення',
    cartMenu: 'Кошик',
    message: 'Повідомлення',
    wishlist: 'Список бажань',
    productsToCompare: 'Порівняння товарів',
    payment: 'Оплата',
    settings: 'Налаштування',
    helpCenter: 'Довідковий центр',
    userData: 'Дані користувача',
    addressData: 'Дані адреси / адреса доставки',
    profileName: 'Ім\'я',
    dateOfBirth: 'Дата народження',
    profilePhone: 'Номер телефону',
    profileEmail: 'Електронна пошта',
    country: 'Країна',
    city: 'Місто',
    address: 'Адреса',
    saveBtn: 'Зберегти',
    cancelBtn: 'Скасувати',
    productReturnTitle: 'Повернення товару. Замовлення #',
    returnReason: 'Причина повернення',
    additionalInfo: 'Додаткова інформація',
    selectFromList: 'Виберіть зі списку',
    refundSuccessTitle: 'Заявку на повернення успішно надіслано!',
    refundSuccessDesc: 'Продавець зв\'яжеться з вами найближчим часом.',
    itemsAddedToCart: 'Товари успішно додані до кошика!',
    leaveReviewTitle: 'Залишити відгук. Замовлення #',
    yourRating: 'Ваша оцінка',
    writeReview: 'Напишіть ваш відгук',
    sendReviewBtn: 'Надіслати відгук',
    reviewSuccessTitle: 'Дякуємо за ваш відгук!',
    reviewSuccessDesc: 'Ваш відгук успішно надіслано, і він буде опублікований найближчим часом.',
    // Messages
    messagesAll: 'Всі',
    messagesUnread: 'Непрочитані',
    messagesArchived: 'В архів',
    messagesSaved: 'Збережене',
    noMessages: 'У вас ще немає повідомлень.',
    markAsUnread: 'Позначити як непрочитане',
    archiveDiscussion: 'В архів',
    deleteDiscussion: 'Видалити діалог',
    toFixDiscussion: 'Закріпити',
    saveDiscussion: 'Збережене',
    messagePlaceholder: 'Повідомлення',
    sendAMessage: 'Написати повідомлення',
    // Delete Modal
    deleteItemTitle: 'Видалити товар?',
    deleteItemDesc: 'Товар буде видалено з кошика. Якщо передумаєте, його завжди можна додати знову.',
    deleteItemYes: 'Так, видалити',
    deleteItemNo: 'Ні, залишити',
    // Wishlist
    wishlistEmptyTitle: 'Ваш список улюблених товарів наразі порожній.',
    wishlistEmptyDesc: 'Знайдіть улюблені товари та додайте їх до списку, щоб повернутися до них пізніше.',
    catalogueBtn: 'Каталог',
    shareWishlist: 'Поділитись',
  }
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale === 'ua' || savedLocale === 'en') {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale) => {
    if (newLocale === 'ua' || newLocale === 'en') {
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = (key) => {
    return dictionary[locale]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: 'en',
      setLocale: () => {},
      t: (key) => dictionary['en']?.[key] || key,
    };
  }
  return context;
};
