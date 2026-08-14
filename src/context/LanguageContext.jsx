'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const dictionary = {
  ua: {
    catalogue: 'Каталог',
    contacts: 'Контакти',
    sale: 'Розпродаж',
    searchPlaceholder: 'Пошук товарів, брендів...',
    searchButton: 'Пошук',
    signUp: 'Зареєструватися',
    favorites: 'Обране',
    myProfile: 'Мій кабінет',
    logOut: 'Вийти',
    logIn: 'Увійти',
    
    // Auth & Sign Up Form Keys
    signUpTitle: 'Реєстрація',
    emailLabel: 'Електронна пошта',
    emailPlaceholder: 'example@email.com',
    phoneNumberLabel: 'Номер телефону',
    phoneNumberPlaceholder: '+380991234567',
    passwordLabel: 'Пароль',
    passwordPlaceholder: '••••••••',
    confirmPasswordLabel: 'Підтвердження паролю',
    confirmPasswordPlaceholder: '••••••••',
    userAgreementLink: 'Я приймаю Угоду користувача',
    privacyPolicyLink: 'Я погоджуюсь з Політикою конфіденційності',
    confirmBtn: 'Зареєструватися',
    alreadyHaveAccount: 'Вже є акаунт?',
    logInAction: 'Увійти',
    registrationFailed: 'Помилка реєстрації.',
    registrationError: 'Сталася помилка під час реєстрації',
    loadingText: 'Завантаження...',

    // Buyer Profile Panel Sidebar
    personalData: 'Особисті дані',
    myOrders: 'Мої замовлення',
    cartMenu: 'Кошик',
    message: 'Повідомлення',
    wishlist: 'Список бажань',
    productsToCompare: 'Порівняння товарів',
    payment: 'Оплата',
    settings: 'Налаштування',

    // Message Page Tabs & Content
    messagesAll: 'Всі повідомлення',
    messagesUnread: 'Непрочитані',
    messagesArchived: 'Архів',
    messagesSaved: 'Збережені',
    noMessages: 'Немає повідомлень',
    sendAMessage: 'Надіслати повідомлення',
    markAsUnread: 'Позначити як непрочитане',
    archiveDiscussion: 'Архівувати діалог',
    deleteDiscussion: 'Видалити діалог',
    toFixDiscussion: 'Закріпити діалог',
    saveDiscussion: 'Зберегти діалог',

    // FooterSeller
    startSelling: 'Почніть продавати вже сьогодні!',
    sellSubtitle: 'Приєднуйтесь до нашого маркетплейсу та відкривайте нові можливості для вашого бізнесу!',
    sellPoint1: 'Мільйони покупців вже чекають на ваші товари;',
    sellPoint2: 'Збільшуйте продажі та отримуйте більше прибутку;',
    sellPoint3: 'Зручна панель керування та інструменти зростання',
    sellButton: 'Стати продавцем',
    
    // Footer
    deliveryPayment: 'Доставка та оплата',
    guarantee: 'Гарантія',
    productReturn: 'Повернення товару',
    support: 'Підтримка',
    news: 'Новини',
    marketplaceGuide: 'Гід по маркетплейсу',
    copyright: '© Easybuy.2024 Всі права захищені',
    privacyPolicy: 'Політика конфіденційності',
    userAgreement: 'Угода користувача',

    // MobileMenu
    close: 'Закрити',
    back: 'Назад',
    notEmpty: 'Немає товарів',
    selectCategory: 'Оберіть категорію →',
    selectSubcategory: 'Оберіть підкатегорію →',

    // Home Page
    favoriteBrands: 'Улюблені бренди',
    ukrainianBrands: 'Українські Бренди',
    recommendations: 'Рекомендації',
    shopNow: 'Купити зараз',
    onSale: 'Знижка',
    addToCart: 'В кошик',
    christmasSale: 'Різдвяний розпродаж',
    upTo33: 'Знижки до -33%',
    
    // Promo Slider
    promoTitle1: 'Літня колекція',
    promoDesc1: 'Відкрийте для себе найгарячіші купальники сезону',
    promoTitle2: 'Морський стиль',
    promoDesc2: 'Ексклюзивний пляжний одяг для вашого ідеального відпочинку',

    // Catalog & Filters
    home: 'Головна',
    allProducts: 'Всі товари',
    allFilters: 'Всі фільтри',
    price: 'Ціна',
    brand: 'Бренд',
    size: 'Розмір',
    color: 'Колір',
    material: 'Матеріал',
    discount: 'Знижка',
    rating: 'Рейтинг',
    sort: 'Сортувати',
    subscribe: 'Підписатися',
    subscribeSearches: 'Підписатися на оновлення',
    activeFilters: 'Активні фільтри',
    resetAll: 'Скинути все',
    noProductsFound: 'Товарів не знайдено',
    tryResettingFilters: 'Спробуйте змінити або скинути обрані фільтри',
    loadingCatalogue: 'Завантаження каталогу...',
    
    // Sort Options
    fromCheapToExpensive: 'Від дешевих до дорогих',
    fromExpensiveToCheap: 'Від дорогих до дешевих',
    byPopularity: 'За популярністю',
    byNovelty: 'За новинками',
  },
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

    // Auth & Sign Up Form Keys
    signUpTitle: 'Sign Up',
    emailLabel: 'Email',
    emailPlaceholder: 'example@email.com',
    phoneNumberLabel: 'Phone Number',
    phoneNumberPlaceholder: '+380991234567',
    passwordLabel: 'Password',
    passwordPlaceholder: '••••••••',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: '••••••••',
    userAgreementLink: 'I accept User Agreement',
    privacyPolicyLink: 'I accept Privacy Policy',
    confirmBtn: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    logInAction: 'Log In',
    registrationFailed: 'Registration failed.',
    registrationError: 'An unknown error occurred during registration',
    loadingText: 'Loading...',

    // Buyer Profile Panel Sidebar
    personalData: 'Personal Data',
    myOrders: 'My Orders',
    cartMenu: 'Cart',
    message: 'Messages',
    wishlist: 'Wishlist',
    productsToCompare: 'Compare',
    payment: 'Payment',
    settings: 'Settings',

    // Message Page Tabs & Content
    messagesAll: 'All',
    messagesUnread: 'Unread',
    messagesArchived: 'Archived',
    messagesSaved: 'Saved',
    noMessages: 'No messages',
    sendAMessage: 'Send a message',
    markAsUnread: 'Mark as unread',
    archiveDiscussion: 'Archive discussion',
    deleteDiscussion: 'Delete discussion',
    toFixDiscussion: 'Pin discussion',
    saveDiscussion: 'Save discussion',
    
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

    // Catalog & Filters
    home: 'Home',
    allProducts: 'All products',
    allFilters: 'All Filters',
    price: 'Price',
    brand: 'Brand',
    size: 'Size',
    color: 'Color',
    material: 'Material',
    discount: 'Discount',
    rating: 'Rating',
    sort: 'Sort',
    subscribe: 'Subscribe',
    subscribeSearches: 'Subscribe your searches',
    activeFilters: 'Active filters',
    resetAll: 'Reset all',
    noProductsFound: 'No products found',
    tryResettingFilters: 'Try resetting or adjusting your selected filters',
    loadingCatalogue: 'Loading catalogue...',

    // Sort Options
    fromCheapToExpensive: 'from cheap to expensive',
    fromExpensiveToCheap: 'from expensive to cheap',
    byPopularity: 'by popularity',
    byNovelty: 'by novelty',
  }
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('ua');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale === 'ua' || savedLocale === 'en') {
      setLocale(savedLocale);
    } else {
      setLocale('ua');
      localStorage.setItem('locale', 'ua');
    }
  }, []);

  const changeLocale = (newLocale) => {
    if (newLocale === 'ua' || newLocale === 'en') {
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = (key) => {
    return dictionary[locale]?.[key] || dictionary['ua']?.[key] || key;
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
      locale: 'ua',
      setLocale: () => {},
      t: (key) => dictionary['ua']?.[key] || key,
    };
  }
  return context;
};
