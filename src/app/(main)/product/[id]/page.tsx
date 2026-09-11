'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import ProductGallery from '@/components/product-details/ProductGallery';
import { ProductItem } from '@/store/products/operations';
import StarRating from '@/components/star-rating/StarRating';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, openCart } from '@/store/cart/slice';
import { openCheckout } from '@/store/checkout/slice';
import { toggleFavorite, selectFavoriteIds } from '@/store/favorites/slice';
import { addProductView } from '@/store/recently-viewed/slice';
import LikeIcon from '@/components/icons/LikeIcon';
import LinkIcon from '@/components/icons/LinkIcon';
import SmallCartIcon from '@/components/icons/SmallCartIcon';
import { useLanguage } from '@/context/LanguageContext';
import Modal from '@/components/modal/Modal';

const mockSizes = ['XS', 'S', 'M', 'L', 'XL'];
const mockColors = [
  { name: 'Black', hex: '#252527', labelUa: 'Чорний', labelEn: 'Black' },
  { name: 'Khaki', hex: '#757c6a', labelUa: 'Хакі', labelEn: 'Khaki' },
  { name: 'Burgundy', hex: '#a6174a', labelUa: 'Бордовий', labelEn: 'Burgundy' },
  { name: 'Purple', hex: '#8974d6', labelUa: 'Фіолетовий', labelEn: 'Purple' },
];

const mockRecommended = [
  {
    id: 'rec-1',
    name: 'Елегантна сукня максі з поясом',
    nameEn: 'Elegant Maxi Dress with Belt',
    price: 1250,
    oldPrice: 1600,
    rating: 5,
    reviewsCount: 18,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=60',
    art: '849201',
    category: 'Сукні',
  },
  {
    id: 'rec-2',
    name: 'Стьобана демісезонна куртка Oversize',
    nameEn: 'Quilted Demi-Season Oversize Jacket',
    price: 2100,
    oldPrice: 2800,
    rating: 4.8,
    reviewsCount: 24,
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=500&auto=format&fit=crop&q=60',
    art: '849202',
    category: 'Верхній одяг',
  },
  {
    id: 'rec-3',
    name: 'Шкіряні зимові черевики на платформі',
    nameEn: 'Leather Winter Platform Boots',
    price: 2950,
    oldPrice: 3400,
    rating: 4.9,
    reviewsCount: 31,
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60',
    art: '849203',
    category: 'Взуття',
  },
  {
    id: 'rec-4',
    name: 'В’язаний кардиган вільного крою',
    nameEn: 'Loose Knitted Cardigan',
    price: 1100,
    oldPrice: 1450,
    rating: 4.7,
    reviewsCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=60',
    art: '849204',
    category: 'Кардигани',
  },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(selectFavoriteIds);
  const { t, locale } = useLanguage() as any;
  
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Variant Selection State
  const [selectedSize, setSelectedSize] = useState<string | null>('S');
  const [selectedColor, setSelectedColor] = useState<string>(mockColors[0].name);
  const [validationError, setValidationError] = useState('');

  // Modals
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Review Form
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  // Tabs state
  const [activeTab, setActiveTab] = useState<string>('description');

  // Interactive reviews
  const [reviewsList, setReviewsList] = useState([
    {
      id: 1,
      author: 'Оксана',
      date: '18.11.2024',
      rating: 5,
      likes: 5,
      dislikes: 0,
      text: 'Неймовірно легка і при цьому дуже тепла куртка, ідеально підходить для зимових прогулянок. Вільний крій зручний, а чорний колір пасує абсолютно до всього.',
    },
    {
      id: 2,
      author: 'Аліна',
      date: '03.10.2024',
      rating: 4,
      likes: 1,
      dislikes: 0,
      text: 'Чудова куртка! Якісна фурнітура та приємна підкладка. Розмір відповідає розмірній сітці (замовила свій звичний S). Доставили за 1 день.',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/goods/${id}`);
        const productData = response.data;
        setProduct(productData);
        
        // Add to recently viewed
        dispatch(addProductView({
          id: productData.id,
          name: productData.name,
          price: productData.price,
          mainImageUrl: productData.mainImageUrl || "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80",
        }));
        
      } catch (err) {
        // Fallback mock product if API returns 404 or fails
        setProduct({
          id: id || '1',
          name: 'Зимова куртка Oversize з капюшоном PUMA WarmCELL',
          price: 2450,
          art: '626514',
          rating: 4.9,
          reviewsCount: 14,
          mainImageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&auto=format&fit=crop&q=80',
          description: 'Стильна та надійна тепла куртка, що захищає від вітру та холоду. Вільний крій, м’яка флісова підкладка в кишенях і водовідштовхувальний матеріал забезпечують максимальний комфорт під час щоденного носіння в місті.',
        } as any);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id, dispatch]);

  const isFavorited = product ? favoriteIds.includes(product.id) : false;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError(t('pleaseSelectSizeToast') || 'Будь ласка, оберіть розмір');
      return;
    }
    setValidationError('');
    
    if (product) {
      dispatch(addToCart({
        id: product.id,
        art: product.art || '626514',
        name: product.name,
        price: product.price,
        image: product.mainImageUrl || "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80",
        quantity: 1,
        size: selectedSize,
        color: selectedColor || undefined,
      }));
      showToast(t('addedToCartToast') || 'Товар додано до кошика!');
      dispatch(openCart());
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError(t('pleaseSelectSizeToast') || 'Будь ласка, оберіть розмір');
      return;
    }
    setValidationError('');
    if (product) {
      dispatch(addToCart({
        id: product.id,
        art: product.art || '626514',
        name: product.name,
        price: product.price,
        image: product.mainImageUrl || "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80",
        quantity: 1,
        size: selectedSize,
        color: selectedColor || undefined,
      }));
      dispatch(openCheckout());
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast(t('linkCopiedToast') || 'Посилання скопійовано!');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    const newRev = {
      id: Date.now(),
      author: newReviewAuthor,
      date: new Date().toLocaleDateString('uk-UA'),
      rating: newReviewRating,
      likes: 0,
      dislikes: 0,
      text: newReviewComment,
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setIsReviewModalOpen(false);
    showToast(locale === 'ua' ? 'Дякуємо за ваш відгук!' : 'Thank you for your review!');
  };

  if (loading) return <div className="max-w-[1440px] mx-auto py-24 text-center text-lg font-medium text-gray-500">{t('loadingCatalogue') || 'Завантаження товару...'}</div>;
  if (error || !product) return <div className="max-w-[1440px] mx-auto py-24 text-center text-lg text-red-500">{error || 'Товар не знайдено'}</div>;

  const images = [
    product.mainImageUrl || 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80',
  ];

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumbs & Filter Category Bar */}
      <div className="bg-white border-b border-gray-100 mb-8">
        <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-4 flex flex-col gap-4">
          <div className="flex flex-wrap justify-between items-center text-xs lg:text-sm text-[#104c9a] font-semibold gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:underline opacity-80">{t('home') || 'Головна'}</Link>
              <span>/</span>
              <Link href="/catalogue" className="hover:underline opacity-80">{t('catalogue') || 'Каталог'}</Link>
              <span>/</span>
              <Link href="/catalogue" className="hover:underline opacity-80">{locale === 'ua' ? 'Жіночий одяг' : 'Women’s Clothing'}</Link>
              <span>/</span>
              <span className="font-bold text-[#104c9a]">{product.name}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/catalogue" className="border border-[#104c9a] rounded-lg px-3.5 py-1.5 flex items-center gap-2 text-[#104c9a] font-bold bg-transparent hover:bg-blue-50 transition-colors text-xs">
                <span>← {t('backToCatalog') || 'До каталогу'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 pb-12">
        
        {/* Main Product Info Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 mb-16">
          
          {/* Gallery Section */}
          <div className="w-full lg:w-[42%] max-w-[500px]">
            <ProductGallery images={images} />
          </div>

          {/* Details & Actions Section */}
          <div className="w-full lg:w-[58%] flex flex-col">
            
            {/* Seller Shop */}
            <div className="flex items-center gap-2 text-[#104c9a] text-sm font-semibold mb-2">
              <span>{t('sellerPrefix') || 'Продавець'}:</span>
              <Link href="/catalogue" className="font-bold underline hover:text-[#ff7400] transition-colors">
                {t('shopStore') || 'Магазин'} "YourFashion"
              </Link>
              <span className="text-xs bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-full border border-green-200 ml-1">
                ✓ {locale === 'ua' ? 'Перевірений' : 'Verified'}
              </span>
            </div>
            
            {/* Title & Price Header */}
            <div className="flex justify-between items-start mb-4 mt-1 gap-4">
              <h1 className="text-2xl lg:text-[32px] font-bold font-dm text-[#104c9a] leading-tight flex-1">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4">
                <div className="text-2xl lg:text-[30px] font-bold font-dm text-[#104c9a] whitespace-nowrap">
                  {product.price} ₴
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (product) {
                        dispatch(toggleFavorite(product.id));
                        showToast(isFavorited ? (t('removedFromFavorites') || 'Видалено з обраного') : (t('addedToFavorites') || 'Додано до обраного'));
                      }
                    }}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-orange-50 transition-colors"
                    title="В обране"
                  >
                    <LikeIcon className={`w-5 h-5 transition-colors ${isFavorited ? 'text-[#ff7400] fill-[#ff7400]' : 'text-[#104c9a] hover:text-[#ff7400]'}`} />
                  </button>
                  
                  <button 
                    onClick={handleCopyLink}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition-colors"
                    title="Поділитися"
                  >
                    <LinkIcon className="w-5 h-5 text-[#104c9a] hover:text-[#ff7400] transition-colors" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description Short */}
            <div className="mb-4 text-gray-700 text-[15px] leading-relaxed">
              {product.description}
            </div>

            {/* Rating & Reviews Jump Link */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating initialRating={product.rating || 4.9} activeColor="#ff7400" className="gap-[3px]" />
              <button 
                onClick={() => {
                  setActiveTab('reviews');
                  const el = document.getElementById('reviews-tab-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#104c9a] text-sm font-bold ml-1 hover:text-[#ff7400] hover:underline cursor-pointer"
              >
                {reviewsList.length} {t('reviewsCountSuffix') || 'відгуків'}
              </button>
            </div>

            <div className="h-[1px] bg-gray-100 my-2" />

            {/* Color Selection */}
            <div className="mb-5 mt-2">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="font-bold text-sm text-[#104c9a]">{t('colorLabel') || 'Колір'}:</span>
                <span className="text-xs text-gray-600 font-semibold">
                  {mockColors.find(c => c.name === selectedColor)?.[locale === 'ua' ? 'labelUa' : 'labelEn']}
                </span>
              </div>
              <div className="flex gap-2.5">
                {mockColors.map((color) => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-xl transition-all border flex items-center justify-center ${
                      selectedColor === color.name 
                        ? 'ring-2 ring-[#104c9a] ring-offset-2 scale-105 border-transparent shadow-sm' 
                        : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.labelUa}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="font-bold text-sm text-[#104c9a]">{t('sizeLabel') || 'Розмір'}:</span>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#104c9a] font-bold underline hover:text-[#ff7400] transition-colors"
                >
                  {t('sizeGuideBtn') || 'Таблиця розмірів'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5 mb-3">
                {mockSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setValidationError('');
                    }}
                    className={`w-12 h-11 border-2 rounded-xl transition-all text-sm font-bold flex items-center justify-center cursor-pointer ${
                      selectedSize === size
                        ? 'border-[#104c9a] text-[#104c9a] bg-blue-50/70 shadow-sm'
                        : 'border-gray-200 text-gray-700 hover:border-[#104c9a] bg-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Model Measurement Notice */}
              <div className="flex items-center gap-2.5 text-xs text-[#104c9a] bg-[#f4f7fb] px-4 py-2 rounded-xl w-full border border-blue-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span>{t('modelSizeNotice') || 'Зріст моделі 172 см, розмір на фото: S'}</span>
              </div>
              
              {validationError && (
                <p className="text-red-500 text-xs font-semibold mt-2">{validationError}</p>
              )}
            </div>

            {/* Article */}
            <div className="mb-6 text-xs text-gray-500 font-mono">
              <span className="font-bold text-gray-700">{t('articleLabel') || 'Артикул'}:</span> {product.art || '626514'}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-auto">
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-[#ff7400] text-white font-bold rounded-xl py-3.5 hover:brightness-110 shadow-md transition-all text-sm flex items-center justify-center cursor-pointer"
              >
                {t('buyNowBtn') || 'Купити в 1 клік'}
              </button>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2.5 bg-white text-[#104c9a] border-2 border-[#104c9a] font-bold rounded-xl py-3.5 hover:bg-blue-50 transition-all text-sm shadow-sm cursor-pointer"
              >
                <SmallCartIcon className="w-5 h-5 text-[#104c9a]" />
                <span>{t('addToCart') || 'В кошик'}</span>
              </button>
            </div>

          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 my-10" id="reviews-tab-section"></div>

        {/* Bottom Section: Tabs + Customer Reviews */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
          
          {/* Left Column: Interactive Tabs */}
          <div className="w-full lg:w-[60%]">
            <div className="flex gap-2 border-b border-gray-200 mb-6 pb-3 overflow-x-auto custom-scrollbar">
              {[
                { id: 'description', label: t('productDescriptionTab') || 'Опис' },
                { id: 'characteristics', label: t('characteristicsTab') || 'Характеристики' },
                { id: 'payment', label: t('paymentTab') || 'Оплата' },
                { id: 'shipping', label: t('shippingTab') || 'Доставка' },
                { id: 'photos', label: t('photosTab') || 'Фото' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id 
                      ? 'bg-[#104c9a] text-white shadow-sm' 
                      : 'text-gray-600 hover:text-[#104c9a] hover:bg-blue-50/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-[260px] text-sm text-gray-700 leading-relaxed bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              {activeTab === 'description' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <h4 className="font-bold text-[#104c9a] text-base">{t('productStoryTitle') || 'Історія та опис моделі'}</h4>
                  <p>{product.description}</p>
                  <h4 className="font-bold text-[#104c9a] text-base mt-2">{t('featuresBenefitsTitle') || 'Особливості та переваги'}</h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Виготовлено з використанням не менше 50% перероблених екологічних матеріалів.</li>
                    <li><strong>WarmCELL:</strong> Технологія терморегуляції, що ефективно утримує тепло біля тіла.</li>
                    <li><strong>WindCELL:</strong> Спеціальна тканина з вітрозахисним та вологостійким просоченням.</li>
                    <li>Зручні глибокі кишені на застібках-блискавках із теплою підкладкою.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'characteristics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  <div>
                    <h4 className="font-bold text-[#104c9a] mb-3">{t('detailsTitle') || 'Деталі товару'}</h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex justify-between border-b pb-1.5"><span className="text-gray-500">Фасон:</span> <span className="font-semibold">Oversize / Вільний</span></li>
                      <li className="flex justify-between border-b pb-1.5"><span className="text-gray-500">Сезон:</span> <span className="font-semibold">Зима / Демісезон</span></li>
                      <li className="flex justify-between border-b pb-1.5"><span className="text-gray-500">Застібка:</span> <span className="font-semibold">Блискавка YKK</span></li>
                      <li className="flex justify-between border-b pb-1.5"><span className="text-gray-500">Капюшон:</span> <span className="font-semibold">Вшитий, утеплений</span></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#104c9a] mb-3">{t('materialInfoTitle') || 'Інформація про матеріали'}</h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex justify-between border-b pb-1.5"><span className="text-gray-500">Верх:</span> <span className="font-semibold">100% нейлон ripstop</span></li>
                      <li className="flex justify-between border-b pb-1.5"><span className="text-gray-500">Підкладка:</span> <span className="font-semibold">100% поліестер / фліс</span></li>
                      <li className="flex justify-between border-b pb-1.5"><span className="text-gray-500">Наповнювач:</span> <span className="font-semibold">Біо-пух 280 г/м²</span></li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="flex flex-col gap-3 animate-fadeIn">
                  <h4 className="font-bold text-[#104c9a] text-base">{t('paymentMethodsListTitle') || 'Способи оплати'}</h4>
                  <p className="text-xs text-gray-600">Оберіть найзручніший спосіб розрахунку під час оформлення:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                    <li><strong>Онлайн-оплата:</strong> Картками Visa, Mastercard, Google Pay, Apple Pay без комісії.</li>
                    <li><strong>Післяплата:</strong> Оплата у відділенні пошти після перевірки та примірки.</li>
                    <li><strong>Безготівковий розрахунок:</strong> Для юридичних осіб та ФОП.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="flex flex-col gap-3 animate-fadeIn">
                  <h4 className="font-bold text-[#104c9a] text-base">{t('standardDeliveryTitle') || 'Стандартна доставка'}</h4>
                  <p className="text-xs text-gray-600">{t('standardDeliveryDesc') || 'Доставка кур’єром або у відділення протягом 1-3 робочих днів.'}</p>
                  <h4 className="font-bold text-[#104c9a] text-base mt-2">{t('expressDeliveryTitle') || 'Експрес-доставка'}</h4>
                  <p className="text-xs text-gray-600">{t('expressDeliveryDesc') || 'При замовленні до 14:00 — відправка в день замовлення.'}</p>
                </div>
              )}

              {activeTab === 'photos' && (
                <div className="grid grid-cols-3 gap-3 animate-fadeIn">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <Image src={img} alt="Product view" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Customer Reviews */}
          <div className="w-full lg:w-[40%] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#104c9a]">
                {t('customerReviewsTitle') || 'Відгуки покупців'} ({reviewsList.length})
              </h3>
              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="text-xs font-bold text-[#ff7400] border border-[#ff7400] px-3.5 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
              >
                + {t('leaveReviewBtn') || 'Залишити відгук'}
              </button>
            </div>

            <div className="flex flex-col gap-3.5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
              {reviewsList.map((review) => (
                <div key={review.id} className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[#104c9a] text-sm">{review.author}</span>
                    <span className="text-gray-400 text-xs">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2 text-[#ff7400]">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-xs leading-relaxed mb-3">{review.text}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2 mt-auto">
                    <span>{locale === 'ua' ? 'Чи корисний відгук?' : 'Helpful review?'}</span>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setReviewsList(reviewsList.map(r => r.id === review.id ? { ...r, likes: r.likes + 1 } : r));
                        }}
                        className="flex items-center gap-1 hover:text-green-600 font-semibold"
                      >
                        👍 {review.likes}
                      </button>
                      <button 
                        onClick={() => {
                          setReviewsList(reviewsList.map(r => r.id === review.id ? { ...r, dislikes: r.dislikes + 1 } : r));
                        }}
                        className="flex items-center gap-1 hover:text-red-500 font-semibold"
                      >
                        👎 {review.dislikes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="border-t border-dashed border-gray-200 my-10"></div>

        {/* You May Also Like Section */}
        <div className="mt-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl lg:text-[28px] font-bold font-dm text-[#104c9a]">
              {t('youMayAlsoLikeTitle') || 'Вам також може сподобатися'}
            </h2>
            <Link href="/catalogue" className="text-[#104c9a] font-bold flex items-center gap-1.5 text-xs hover:underline">
              <span>{t('allProducts') || 'Всі товари'}</span> →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockRecommended.map((item) => (
              <div 
                key={item.id}
                className="group border border-gray-200/80 rounded-2xl p-3.5 bg-white flex flex-col hover:shadow-xl transition-all duration-300 relative"
              >
                <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-3">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-2 left-2 bg-[#ff7400] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
                    -25%
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#ff7400] text-xs mb-1.5">
                  <span>★ {item.rating}</span>
                  <span className="text-gray-400 text-[11px]">({item.reviewsCount})</span>
                </div>

                <Link 
                  href={`/product/${item.id}`} 
                  className="text-xs font-bold text-[#104c9a] leading-snug line-clamp-2 mb-2 group-hover:text-[#ff7400] transition-colors"
                >
                  {locale === 'ua' ? item.name : item.nameEn}
                </Link>

                <div className="flex items-baseline gap-2 mt-auto mb-3">
                  <span className="text-base font-bold font-dm text-[#104c9a]">{item.price} ₴</span>
                  <span className="text-xs text-gray-400 line-through">{item.oldPrice} ₴</span>
                </div>

                <button 
                  onClick={() => {
                    dispatch(addToCart({
                      id: item.id,
                      art: item.art,
                      name: item.name,
                      price: item.price,
                      image: item.imageUrl,
                      quantity: 1,
                      size: 'M',
                    }));
                    showToast(t('addedToCartToast') || 'Товар додано до кошика!');
                  }}
                  className="w-full bg-[#104c9a] text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
                >
                  <SmallCartIcon className="w-4 h-4 text-white" />
                  <span>{t('addToCart') || 'В кошик'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      <Modal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)}>
        <div className="p-6 max-w-[540px] w-full">
          <h3 className="text-2xl font-bold font-dm text-[#104c9a] mb-4">
            {t('sizeGuideBtn') || 'Таблиця розмірів (Одяг)'}
          </h3>
          <p className="text-xs text-gray-600 mb-4">
            {locale === 'ua' ? 'Виміряйте обхват грудей, талії та стегон для точного підбору розміру:' : 'Measure chest, waist and hips to find your perfect fit:'}
          </p>

          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6 text-xs">
            <table className="w-full text-left">
              <thead className="bg-blue-50 text-[#104c9a] font-bold">
                <tr>
                  <th className="p-2.5">Розмір</th>
                  <th className="p-2.5">Груди (см)</th>
                  <th className="p-2.5">Талія (см)</th>
                  <th className="p-2.5">Стегна (см)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr><td className="p-2.5 font-bold">XS</td><td className="p-2.5">82-86</td><td className="p-2.5">62-66</td><td className="p-2.5">88-92</td></tr>
                <tr className="bg-gray-50/50"><td className="p-2.5 font-bold">S</td><td className="p-2.5">86-90</td><td className="p-2.5">66-70</td><td className="p-2.5">92-96</td></tr>
                <tr><td className="p-2.5 font-bold">M</td><td className="p-2.5">90-94</td><td className="p-2.5">70-74</td><td className="p-2.5">96-100</td></tr>
                <tr className="bg-gray-50/50"><td className="p-2.5 font-bold">L</td><td className="p-2.5">94-98</td><td className="p-2.5">74-78</td><td className="p-2.5">100-104</td></tr>
                <tr><td className="p-2.5 font-bold">XL</td><td className="p-2.5">98-104</td><td className="p-2.5">78-84</td><td className="p-2.5">104-110</td></tr>
              </tbody>
            </table>
          </div>

          <button 
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-full bg-[#104c9a] text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors text-xs"
          >
            {locale === 'ua' ? 'Зрозуміло' : 'Got it'}
          </button>
        </div>
      </Modal>

      {/* Leave Review Modal */}
      <Modal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)}>
        <form onSubmit={handleAddReview} className="p-6 max-w-[480px] w-full flex flex-col gap-4">
          <h3 className="text-2xl font-bold font-dm text-[#104c9a]">
            {t('leaveReviewBtn') || 'Залишити відгук'}
          </h3>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Ваше ім’я</label>
            <input 
              type="text" 
              required
              value={newReviewAuthor}
              onChange={(e) => setNewReviewAuthor(e.target.value)}
              placeholder="Олена"
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#104c9a]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Оцінка</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewReviewRating(star)}
                  className={`text-2xl transition-transform ${star <= newReviewRating ? 'text-[#ff7400] scale-110' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Ваш відгук</label>
            <textarea 
              rows={3}
              required
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              placeholder="Поділіться враженнями від покупки..."
              className="border border-gray-300 rounded-xl p-3 text-xs focus:outline-none focus:border-[#104c9a]"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button 
              type="button"
              onClick={() => setIsReviewModalOpen(false)}
              className="flex-1 border border-gray-300 py-3 rounded-xl text-xs font-bold hover:bg-gray-100"
            >
              Скасувати
            </button>
            <button 
              type="submit"
              className="flex-1 bg-[#ff7400] text-white font-bold py-3 rounded-xl text-xs hover:brightness-110 shadow-md"
            >
              Опублікувати
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
