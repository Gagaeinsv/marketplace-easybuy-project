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
    helpCenter: 'Підтримка та FAQ',

    // Personal Data Page & Form Editing
    userData: 'Персональні дані',
    addressData: 'Адреса доставки',
    dateOfBirth: 'Дата народження',
    profilePhone: 'Телефон',
    profileName: 'Ім\'я',
    profileEmail: 'Електронна пошта',
    country: 'Країна',
    city: 'Місто',
    address: 'Вулиця та будинок',
    cancelBtn: 'Скасувати',
    saveBtn: 'Зберегти',
    loadingProfile: 'Завантаження профілю...',

    // Cart Page
    emptyCartTitle: 'Ваш кошик порожній',
    emptyCartDesc: 'Схоже, ви ще не додали жодного товару до кошика',
    goToShopping: 'Перейти до покупок',
    allItems: 'Всі товари',
    summary: 'Підсумок',
    subtotal: 'Вартість',
    discount: 'Знижка',
    total: 'Всього',
    checkoutTitle: 'Оформити замовлення',
    deleteItemTitle: 'Видалити товар?',
    deleteItemDesc: 'Ви впевнені, що хочете видалити цей товар з кошика?',
    deleteItemYes: 'Так, видалити',
    deleteItemNo: 'Ні, залишити',

    // Wishlist Page
    wishlistEmptyTitle: 'Ваш список бажань порожній',
    wishlistEmptyDesc: 'Сюди потраплятимуть товари, які ви позначили серцем',
    catalogueBtn: 'Перейти до каталогу',
    shareWishlist: 'Поділитися списком',

    // Payment Page
    noPaymentMethods: 'Немає платіжних методів',
    noPaymentMethodsDesc: 'Ви ще не зберегли жодного платіжного методу. Додайте кредитну або дебетову картку для швидшого оформлення замовлень у майбутньому.',
    addPaymentMethodBtn: 'Додати платіжний метод',

    // Compare Products Page
    nothingToCompare: 'Нічого порівнювати',
    nothingToCompareDesc: 'Ви ще не додали жодного товару для порівняння. Перегляньте наш каталог, щоб знайти товари для порівняння.',

    // Orders Page
    allOrdersFilter: 'Всі замовлення',
    statusCompleted: 'Виконано',
    statusInProcessing: 'В обробці',
    statusCancelled: 'Скасовано',
    statusAwaitingShipment: 'Очікує відправки',
    orderSearchPlaceholder: 'Пошук замовлень',
    noOrdersFound: 'Замовлень не знайдено.',
    orderId: 'ID замовлення',
    totalLabel: 'Всього',
    orderTotal: 'Сума замовлення',
    orderDate: 'Дата замовлення',
    deliveryDateLabel: 'Дата доставки',
    sellerLabel: 'Продавець',
    leaveReviewBtn: 'Залишити відгук',
    reorderBtn: 'Повторити замовлення',
    refundsBtn: 'Повернення',
    clear: 'Очистити',
    moreItems: 'більше товарів...',
    statusLabel: 'Статус',
    itemsAddedToCart: 'Товари додано в кошик',
    refundReasonDefects: 'Виявлено дефекти або пошкодження',
    refundReasonNonCompliance: 'Невідповідність заявленим характеристикам',
    refundReasonMissing: 'Відсутня заявлена комплектація або функції',

    // Message Page Tabs & Content
    messagesAll: 'Всі повідомлення',
    messagesUnread: 'Непрочитані',
    messagesArchived: 'Архів',
    messagesSaved: 'Збережені',
    noMessages: 'Тут немає повідомлень',
    sendAMessage: 'Надіслати повідомлення',
    markAsUnread: 'Позначити як непрочитане',
    archiveDiscussion: 'Архівувати діалог',
    deleteDiscussion: 'Видалити діалог',
    toFixDiscussion: 'Закріпити діалог',
    saveDiscussion: 'Зберегти діалог',
    selectChatToStart: 'Оберіть чат для листування',

    // Settings Page (Change Password & Notifications)
    changePasswordTitle: 'Зміна паролю',
    oldPasswordLabel: 'Старий пароль',
    newPasswordLabel: 'Новий пароль',
    confirmNewPasswordLabel: 'Підтвердіть новий пароль',
    updatePasswordBtn: 'Оновити пароль',
    notificationSettings: 'Налаштування сповіщень',
    orderStatusNotifications: 'Статус замовлень',
    orderStatusDesc: 'Отримувати сповіщення про зміну статусу вашого замовлення',
    promoNotifications: 'Акції та пропозиції',
    promoDesc: 'Сповіщення про знижки, розпродажі та персональні промокоди',
    securityNotifications: 'Безпека акаунту',
    securityDesc: 'Важливі повідомлення про вхід з нових пристроїв та зміну паролю',
    fillAllFields: 'Будь ласка, заповніть усі поля для паролю.',
    passwordsDoNotMatch: 'Паролі не збігаються.',
    passwordChangedSuccess: 'Пароль успішно змінено!',
    passwordChangeFailed: 'Не вдалося змінити пароль.',
    saving: 'Збереження...',

    // Help & FAQ Section
    faqTitle: 'Часті запитання (FAQ)',
    faq1Q: 'Як я можу відстежити своє замовлення?',
    faq1A: 'Ви можете відстежувати статус замовлення безпосередньо у своєму кабінеті в розділі "Мої замовлення" або за посиланням для відстеження, надісланим на вашу пошту.',
    faq2Q: 'Які способи оплати підтримуються?',
    faq2A: 'Ми приймаємо картки Visa, Mastercard, Apple Pay, Google Pay та оплату при отриманні (післяплата).',
    faq3Q: 'Як мені повернути товар?',
    faq3A: 'Ви можете оформити запит на повернення протягом 14 днів з моменту отримання товару через розділ підтримки або звернувшись до продавця.',
    faq4Q: 'Як зв\'язатися з продавцем напряму?',
    faq4A: 'Перейдіть на сторінку товару або в деталі вашого замовлення та натисніть "Повідомлення продавцю", щоб відкрити прямий чат.',
    contactSupportTitle: 'Потрібна додаткова допомога?',
    contactSupportDesc: 'Надішліть нам повідомлення, і наша служба підтримки відповість протягом 24 годин.',
    subjectLabel: 'Тема',
    subjectPlaceholder: 'напр., Питання щодо замовлення #1234',
    messageLabel: 'Повідомлення',
    messagePlaceholder: 'Детально опишіть ваше питання або проблему...',
    sending: 'Надсилання...',
    sendSupportRequestBtn: 'Надіслати повідомлення',
    supportTicketCreated: 'Запит до служби підтримки надіслано! Наша команда зв\'яжеться з вами найближчим часом.',

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
    helpCenter: 'Support & FAQ',

    // Personal Data Page & Form Editing
    userData: 'Personal Data',
    addressData: 'Shipping Address',
    dateOfBirth: 'Date of Birth',
    profilePhone: 'Phone',
    profileName: 'Name',
    profileEmail: 'Email',
    country: 'Country',
    city: 'City',
    address: 'Street and House',
    cancelBtn: 'Cancel',
    saveBtn: 'Save',
    loadingProfile: 'Loading profile...',

    // Cart Page
    emptyCartTitle: 'Your cart is empty',
    emptyCartDesc: 'Looks like you haven\'t added anything to your cart yet',
    goToShopping: 'GO TO SHOPPING',
    allItems: 'All items',
    summary: 'Summary',
    subtotal: 'Subtotal',
    discount: 'Discount',
    total: 'Total',
    checkoutTitle: 'Checkout',
    deleteItemTitle: 'Delete item?',
    deleteItemDesc: 'Are you sure you want to remove this item from your cart?',
    deleteItemYes: 'Yes, remove',
    deleteItemNo: 'No, keep',

    // Wishlist Page
    wishlistEmptyTitle: 'Your wishlist is empty',
    wishlistEmptyDesc: 'Products you mark with a heart will appear here',
    catalogueBtn: 'Go to Catalogue',
    shareWishlist: 'Share Wishlist',

    // Payment Page
    noPaymentMethods: 'No payment methods',
    noPaymentMethodsDesc: 'You don\'t have any saved payment methods yet. Add a credit or debit card for faster checkout in the future.',
    addPaymentMethodBtn: 'Add Payment Method',

    // Compare Products Page
    nothingToCompare: 'Nothing to compare',
    nothingToCompareDesc: 'You haven\'t added any products to compare yet. Browse our catalogue to find items you\'d like to compare side-by-side.',

    // Orders Page
    allOrdersFilter: 'All orders',
    statusCompleted: 'Completed',
    statusInProcessing: 'In processing',
    statusCancelled: 'Cancelled',
    statusAwaitingShipment: 'Awaiting shipment',
    orderSearchPlaceholder: 'Order search',
    noOrdersFound: 'No orders found.',
    orderId: 'Order ID',
    totalLabel: 'Total',
    orderTotal: 'Order Total',
    orderDate: 'Order Date',
    deliveryDateLabel: 'Delivery date',
    sellerLabel: 'Seller',
    leaveReviewBtn: 'Leave a review',
    reorderBtn: 'Reorder',
    refundsBtn: 'Refunds',
    clear: 'Clear',
    moreItems: 'more items...',
    statusLabel: 'Status',
    itemsAddedToCart: 'Items added to cart',
    refundReasonDefects: 'Defects or damage have been detected',
    refundReasonNonCompliance: 'Non-compliance with the declared characteristics',
    refundReasonMissing: 'The declared equipment or functions are missing',

    // Message Page Tabs & Content
    messagesAll: 'All',
    messagesUnread: 'Unread',
    messagesArchived: 'Archived',
    messagesSaved: 'Saved',
    noMessages: 'No messages here',
    sendAMessage: 'Send a message',
    markAsUnread: 'Mark as unread',
    archiveDiscussion: 'Archive discussion',
    deleteDiscussion: 'Delete discussion',
    toFixDiscussion: 'Pin discussion',
    saveDiscussion: 'Save discussion',
    selectChatToStart: 'Select a chat to start messaging',

    // Settings Page (Change Password & Notifications)
    changePasswordTitle: 'Change Password',
    oldPasswordLabel: 'Current Password',
    newPasswordLabel: 'New Password',
    confirmNewPasswordLabel: 'Confirm New Password',
    updatePasswordBtn: 'Update Password',
    notificationSettings: 'Notification Preferences',
    orderStatusNotifications: 'Order Status Updates',
    orderStatusDesc: 'Receive email notifications when your order status changes',
    promoNotifications: 'Promotions & Discounts',
    promoDesc: 'Get special offers and discount codes',
    securityNotifications: 'Security Alerts',
    securityDesc: 'Important security notifications regarding your account',
    fillAllFields: 'Please fill in all password fields.',
    passwordsDoNotMatch: 'Passwords do not match.',
    passwordChangedSuccess: 'Password changed successfully!',
    passwordChangeFailed: 'Failed to change password.',
    saving: 'Saving...',

    // Help & FAQ Section
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'How can I track my order?',
    faq1A: 'You can track your order status directly in your account under the "My Orders" section or via the tracking link sent to your email.',
    faq2Q: 'What payment methods are supported?',
    faq2A: 'We accept Visa, Mastercard, Apple Pay, Google Pay, and Cash on Delivery (COD).',
    faq3Q: 'How do I return a product?',
    faq3A: 'You can initiate a return request within 14 days of receiving your item via the "Refunds" section in your buyer cabinet.',
    faq4Q: 'How do I contact a seller directly?',
    faq4A: 'Go to the product page or your order details and click "Message Seller" to open a direct chat thread.',
    contactSupportTitle: 'Need Further Help?',
    contactSupportDesc: 'Send us a message and our support team will respond within 24 hours.',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'e.g., Question about my order #1234',
    messageLabel: 'Message',
    messagePlaceholder: 'Describe your issue or question in detail...',
    sending: 'Sending...',
    sendSupportRequestBtn: 'Send Message',
    supportTicketCreated: 'Support request sent! Our team will get back to you shortly.',
    
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
