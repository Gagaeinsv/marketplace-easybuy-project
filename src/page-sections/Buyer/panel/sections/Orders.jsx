'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import LeftArrIcon from '@/components/icons/mobile/LeftArrIcon.jsx';
import { mockOrders } from '@/data/mockOrders.js';
import { mockCart } from '@/data/mockCart.js';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cart/slice';

// Icons
const ChevronDownIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Orders = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  
  const [filter, setFilter] = useState('All orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [mobileActiveOrder, setMobileActiveOrder] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [refundOrder, setRefundOrder] = useState(null);
  const [refundSuccess, setRefundSuccess] = useState(false);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  React.useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleReorder = (order) => {
    order.items.forEach((item, index) => {
      mockCart.push({
        id: `reorder-${order.id}-${index}-${Date.now()}`,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty
      });

      dispatch(addToCart({
        id: `reorder-${order.id}-${index}-${Date.now()}`,
        art: `reorder-${order.id}-${index}`,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.qty
      }));
    });
    setToastMessage(t('itemsAddedToCart'));
  };

  // Filter options
  const filterOptions = [
    'All orders',
    'Completed',
    'In processing',
    'Cancelled',
    'Awaiting shipment'
  ];

  // Filtered orders
  const filteredOrders = mockOrders.filter(order => {
    if (filter !== 'All orders' && order.status !== filter) return false;
    if (searchQuery && !order.id.includes(searchQuery)) return false;
    return true;
  });

  const toggleExpand = (id) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'In processing': return 'text-gray-400';
      case 'Cancelled': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getFilterLabel = (option) => {
    switch (option) {
      case 'All orders': return t('allOrdersFilter') || 'All orders';
      case 'Completed': return t('statusCompleted') || 'Completed';
      case 'In processing': return t('statusInProcessing') || 'In processing';
      case 'Cancelled': return t('statusCancelled') || 'Cancelled';
      case 'Awaiting shipment': return t('statusAwaitingShipment') || 'Awaiting shipment';
      default: return option;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Completed': return t('statusCompleted') || 'Completed';
      case 'In processing': return t('statusInProcessing') || 'In processing';
      case 'Cancelled': return t('statusCancelled') || 'Cancelled';
      case 'Awaiting shipment': return t('statusAwaitingShipment') || 'Awaiting shipment';
      default: return status;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const months = {
      'January': 'січня',
      'February': 'лютого',
      'March': 'березня',
      'April': 'квітня',
      'May': 'травня',
      'June': 'червня',
      'July': 'липня',
      'August': 'серпня',
      'September': 'вересня',
      'October': 'жовтня',
      'November': 'листопада',
      'December': 'грудня'
    };
    
    if (locale === 'ua') {
      let formatted = dateStr;
      Object.keys(months).forEach(monthEng => {
        if (formatted.includes(monthEng)) {
          formatted = formatted.replace(monthEng, months[monthEng]);
        }
      });
      return formatted;
    }
    return dateStr;
  };

  // --- MOBILE DETAILED VIEW ---
  if (mobileActiveOrder) {
    const order = mobileActiveOrder;
    return (
      <div className="w-full flex flex-col animate-fadeIn">
        <div className="flex items-center mb-6 relative">
          <button onClick={() => setMobileActiveOrder(null)} className="absolute left-0 p-2 -ml-2 text-blue-900">
            <LeftArrIcon />
          </button>
          <h2 className="text-xl font-bold text-blue-900 w-full text-center">{t('orderId') || 'Order ID'}: {order.id}</h2>
        </div>

        <div className="flex flex-col gap-6">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex flex-col border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                </div>
                <span className={`text-sm font-semibold ${getStatusColor(order.status)}`}>{getStatusLabel(order.status)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-blue-900 line-clamp-3 leading-tight">{item.name}</span>
                <span className="text-gray-400 text-sm flex-shrink-0 ml-2">x{item.qty}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-gray-500 font-medium">{t('totalLabel') || 'Total'}:</span>
                <span className="font-bold text-blue-900">US ${(item.price * item.qty).toFixed(2)}</span>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center py-4 border-b border-gray-100">
            <span className="text-gray-600 font-bold">{t('orderTotal') || 'Order Total'}:</span>
            <span className="font-bold text-blue-900 text-lg">US ${order.items.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</span>
          </div>

          <div className="flex flex-col gap-3 py-2 text-sm">
            <div className="flex gap-2">
              <span className="text-blue-900 font-bold">{t('orderDate') || 'Order Date'}:</span>
              <span className="text-gray-500">{formatDate(order.date)}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-900 font-bold">{t('orderId') || 'Order ID'}:</span>
              <span className="text-gray-500">{order.id}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-900 font-bold">{t('deliveryDateLabel') || 'Delivery date'}:</span>
              <span className="text-gray-500">{formatDate(order.deliveryDate)}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-blue-900 font-bold">{t('sellerLabel') || 'Seller'}:</span>
              <span className="text-blue-500 underline">{order.seller}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button onClick={() => { setReviewOrder(order); setRating(5); setReviewSuccess(false); }} className="w-full bg-gradient-to-b from-[#4b99ff] to-[#071739] text-white font-semibold py-3 rounded-lg shadow hover:brightness-110 transition">
              {t('leaveReviewBtn') || 'Leave a review'}
            </button>
            <button onClick={() => handleReorder(order)} className="w-full border border-blue-900 text-blue-900 font-semibold py-3 rounded-lg hover:bg-blue-50 transition">
              {t('reorderBtn') || 'Reorder'}
            </button>
            <button onClick={() => setRefundOrder(order)} className="w-full border border-blue-900 text-blue-900 font-semibold py-3 rounded-lg hover:bg-blue-50 transition">
              {t('refundsBtn') || 'Refunds'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW (DESKTOP & MOBILE) ---
  return (
    <div className="w-full flex flex-col animate-fadeIn">
      
      {/* Top Controls: Mobile Search */}
      <div className="md:hidden w-full mb-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={t('orderSearchPlaceholder') || 'Order search'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Top Controls: Desktop Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          {/* Custom Dropdown Filter */}
          <div className="relative w-full md:w-[220px]">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2 bg-white text-sm text-gray-600 hover:border-blue-400 transition"
            >
              <span>{getFilterLabel(filter)}</span>
              <ChevronDownIcon className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-lg py-2 z-20">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setFilter(opt); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition ${filter === opt ? 'text-blue-900 font-semibold' : 'text-gray-600'}`}
                  >
                    {getFilterLabel(opt)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex relative w-[300px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder={t('orderSearchPlaceholder') || 'Order search'} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold hover:text-gray-600"
              >
                {t('clear') || 'Clear'}
              </button>
            )}
          </div>
      </div>

      {/* MOBILE LIST VIEW */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredOrders.length === 0 && <p className="text-gray-500 text-center py-8">{t('noOrdersFound') || 'No orders found.'}</p>}
        {filteredOrders.map(order => {
          const firstItem = order.items[0];
          return (
            <div 
              key={order.id} 
              onClick={() => setMobileActiveOrder(order)}
              className="bg-white border border-gray-100 rounded-xl p-4 flex gap-4 cursor-pointer shadow-sm hover:shadow-md transition"
            >
              <div className="w-[80px] h-[80px] bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                <Image src={firstItem.image} alt={firstItem.name} fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex flex-col flex-grow justify-between py-1">
                <div className="flex justify-between items-start">
                  <span className="text-blue-900 font-bold text-sm">{t('orderId') || 'Order ID'}: {order.id}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-blue-500 text-sm font-medium line-clamp-3 leading-tight">{firstItem.name}</span>
                  <span className="text-gray-400 text-[12px]">{formatDate(order.date)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-600 text-xs font-medium">{t('totalLabel') || 'Total'}: <span className="font-bold text-blue-900">US ${order.items.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</span></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block w-full">
        {filteredOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-lg">{t('noOrdersFound') || 'No orders found.'}</p>
        ) : (
          <div className="w-full flex flex-col">
            {filteredOrders.map((order, index) => {
              const isExpanded = expandedOrderId === order.id;
              const firstItem = order.items[0];
              const extraItemsCount = order.items.length - 1;

              return (
                <div key={order.id} className="flex flex-col w-full border-b border-gray-100 last:border-b-0 py-4">
                  {/* Row Header */}
                  <div className="flex items-center w-full min-h-[60px]">
                    <div className="w-[40px] text-gray-400 text-sm">{index + 1}</div>
                    
                    <div className="flex-grow flex items-center gap-4">
                      <div className="w-[50px] h-[50px] bg-gray-50 rounded relative overflow-hidden">
                        <Image src={firstItem.image} alt={firstItem.name} fill sizes="80px" className="object-cover" />
                      </div>
                      {extraItemsCount > 0 && (
                        <span className="text-sm text-gray-500">+ {extraItemsCount} {t('moreItems') || 'more items...'}</span>
                      )}
                    </div>

                    <div className={`w-[140px] text-sm ${getStatusColor(order.status)}`}>{getStatusLabel(order.status)}</div>
                    <div className="w-[140px] text-sm text-gray-500">{t('orderId') || 'Order ID'}: {order.id}</div>
                    <div className="w-[160px] text-sm text-gray-500">{formatDate(order.date)}</div>
                    <div className="w-[140px] text-sm text-gray-500 flex items-center justify-between">
                      <span>{t('totalLabel') || 'Total'}: <span className="text-gray-800 font-semibold">US ${order.items.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</span></span>
                    </div>
                    
                    <button 
                      onClick={() => toggleExpand(order.id)}
                      className="w-[40px] h-[40px] flex items-center justify-center text-gray-400 hover:text-blue-900 hover:bg-gray-50 rounded-full transition ml-2"
                    >
                      <ChevronDownIcon className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="w-full flex gap-8 pl-[40px] pt-6 pb-2 animate-fadeIn">
                      
                      {/* Left: Items list */}
                      <div className="flex flex-col gap-4 flex-grow max-w-[400px]">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-[50px] h-[50px] bg-gray-50 rounded relative overflow-hidden flex-shrink-0">
                              <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                            </div>
                            <span className="text-sm text-gray-600 w-[140px] line-clamp-3 leading-tight">{item.name}</span>
                            <span className="text-sm text-gray-400 w-[30px] flex-shrink-0">x{item.qty}</span>
                            <span className="text-sm font-semibold text-gray-800">US ${item.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Middle: Order details */}
                      <div className="flex flex-col gap-3 flex-grow text-sm min-w-[200px]">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-gray-700">{t('statusLabel') || 'Status'}: {getStatusLabel(order.status)}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold text-gray-700">{t('orderDate') || 'Order Date'}:</span>
                          <span className="text-gray-500">{formatDate(order.date)}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold text-gray-700">{t('orderId') || 'Order ID'}:</span>
                          <span className="text-gray-500">{order.id}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold text-gray-700">{t('deliveryDateLabel') || 'Delivery date'}:</span>
                          <span className="text-gray-500">{formatDate(order.deliveryDate)}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-bold text-gray-700">{t('sellerLabel') || 'Seller'}:</span>
                          <span className="text-blue-500 underline cursor-pointer hover:text-blue-700 transition">{order.seller}</span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-col gap-2 mt-4 w-full">
                        <button onClick={() => { setReviewOrder(order); setRating(5); setReviewSuccess(false); }} className="w-full bg-gradient-to-b from-[#4b99ff] to-[#071739] text-white font-semibold py-2.5 rounded-lg shadow hover:brightness-110 transition text-sm">
                          {t('leaveReviewBtn') || 'Leave a review'}
                        </button>
                        <button onClick={() => handleReorder(order)} className="w-full border border-blue-900 text-blue-900 font-semibold py-2.5 rounded-lg hover:bg-blue-50 transition text-sm">
                          {t('reorderBtn') || 'Reorder'}
                        </button>
                        <button onClick={() => setRefundOrder(order)} className="w-full border border-blue-900 text-blue-900 font-semibold py-2.5 rounded-lg hover:bg-blue-50 transition text-sm">
                          {t('refundsBtn') || 'Refunds'}
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* REORDER TOAST */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-fadeIn flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* REFUNDS MODAL */}
      {refundOrder && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
          onClick={() => { setRefundOrder(null); setRefundSuccess(false); }}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto p-5 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close btn */}
            <button 
              onClick={() => { setRefundOrder(null); setRefundSuccess(false); }} 
              className="absolute top-4 right-4 md:top-5 md:right-5 text-orange-500 hover:text-orange-600 p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {refundSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
                <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-6">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('refundSuccessTitle')}</h3>
                <p className="text-gray-500">{t('refundSuccessDesc')}</p>
              </div>
            ) : (
              <div className="flex flex-col animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-bold text-blue-900 text-center mb-4 pr-6">
                  {t('productReturnTitle')}{refundOrder.id}
                </h2>
                
                {/* Product Info Box */}
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between border border-gray-200 rounded-xl p-3 mb-4 gap-3 text-sm max-w-lg mx-auto w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded relative overflow-hidden flex-shrink-0">
                      <Image src={refundOrder.items[0].image} alt="" fill sizes="100px" className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 line-clamp-1 w-[150px]">{refundOrder.items[0].name}</span>
                      {refundOrder.items.length > 1 && (
                        <span className="text-xs text-gray-400 font-medium">+ {refundOrder.items.length - 1} {t('moreItems') || 'more items'}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 w-full md:w-auto justify-between md:justify-start px-2">
                    <span className="border-l border-gray-200 pl-4">{t('orderId') || 'Order ID'}: {refundOrder.id}</span>
                    <span className="border-l border-gray-200 pl-4">{t('totalLabel') || 'Total'}: US ${(refundOrder.items.reduce((sum, item) => sum + item.price * item.qty, 0)).toFixed(2)}</span>
                  </div>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-3 max-w-lg mx-auto w-full">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">{t('nameLabel')}</label>
                    <input type="text" placeholder={t('nameLabel')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-sm" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">{t('phoneNumberLabel')}</label>
                    <input type="tel" placeholder={t('phoneNumberLabel')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-sm" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">{t('emailLabel')}</label>
                    <input type="email" placeholder={t('emailLabel')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-sm" />
                  </div>
                  <div className="flex flex-col gap-1 relative">
                    <label className="text-sm text-gray-700">{t('returnReason')}</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 appearance-none focus:outline-none focus:border-blue-500 text-sm text-gray-700 bg-white">
                      <option value="">{t('selectFromList')}</option>
                      <option value="defects">{t('refundReasonDefects') || 'Defects or damage have been detected'}</option>
                      <option value="non-compliance">{t('refundReasonNonCompliance') || 'Non-compliance with the declared characteristics'}</option>
                      <option value="missing">{t('refundReasonMissing') || 'The declared equipment or functions are missing'}</option>
                    </select>
                    <ChevronDownIcon className="absolute right-4 top-8 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-700">{t('additionalInfo')}</label>
                    <textarea placeholder="Enter" rows="2" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-sm resize-none"></textarea>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 w-full md:w-auto md:mx-auto">
                    <button 
                      onClick={() => setRefundOrder(null)} 
                      className="w-full md:w-[160px] border border-gray-300 text-blue-900 font-bold py-3 rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      {t('cancelBtn')}
                    </button>
                    <button 
                      onClick={() => setRefundSuccess(true)} 
                      className="w-full md:w-[160px] bg-gradient-to-b from-[#4b99ff] to-[#071739] text-white font-bold py-3 rounded-lg shadow hover:brightness-110 transition text-sm"
                    >
                      {t('saveBtn')}
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* REVIEW MODAL */}
      {reviewOrder && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn"
          onClick={() => { setReviewOrder(null); setReviewSuccess(false); }}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto p-5 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close btn */}
            <button 
              onClick={() => { setReviewOrder(null); setReviewSuccess(false); }} 
              className="absolute top-4 right-4 md:top-5 md:right-5 text-orange-500 hover:text-orange-600 p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {reviewSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
                <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-6">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('reviewSuccessTitle')}</h3>
                <p className="text-gray-500">{t('reviewSuccessDesc')}</p>
              </div>
            ) : (
              <div className="flex flex-col animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-bold text-blue-900 text-center mb-6 pr-6">
                  {t('leaveReviewTitle')}{reviewOrder.id}
                </h2>
                
                {/* Product Info Box */}
                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between border border-gray-200 rounded-xl p-3 mb-6 gap-3 text-sm max-w-lg mx-auto w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded relative overflow-hidden flex-shrink-0">
                      <Image src={reviewOrder.items[0].image} alt="" fill sizes="100px" className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-600 line-clamp-1 w-[150px]">{reviewOrder.items[0].name}</span>
                      {reviewOrder.items.length > 1 && (
                        <span className="text-xs text-gray-400 font-medium">+ {reviewOrder.items.length - 1} {t('moreItems') || 'more items'}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 w-full md:w-auto justify-between md:justify-start px-2">
                    <span className="border-l border-gray-200 pl-4">{t('orderId') || 'Order ID'}: {reviewOrder.id}</span>
                  </div>
                </div>

                {/* Rating & Form */}
                <div className="flex flex-col gap-5 max-w-lg mx-auto w-full">
                  <div className="flex flex-col items-center justify-center mb-2">
                    <span className="text-sm font-bold text-gray-700 mb-2">{t('yourRating')}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                          key={star}
                          onClick={() => setRating(star)}
                          className={`focus:outline-none transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`}
                        >
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <textarea placeholder={t('writeReview')} rows="4" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-sm resize-none"></textarea>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-2 w-full md:w-auto md:mx-auto">
                    <button 
                      onClick={() => setReviewOrder(null)} 
                      className="w-full md:w-[160px] border border-gray-300 text-blue-900 font-bold py-3 rounded-lg hover:bg-gray-50 transition text-sm"
                    >
                      {t('cancelBtn')}
                    </button>
                    <button 
                      onClick={() => setReviewSuccess(true)} 
                      className="w-full md:w-[160px] text-white font-bold py-3 rounded-lg shadow transition text-sm bg-gradient-to-b from-[#4b99ff] to-[#071739] hover:brightness-110"
                    >
                      {t('sendReviewBtn')}
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Orders;
