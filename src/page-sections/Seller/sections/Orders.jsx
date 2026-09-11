'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';
import Modal from '@/components/modal/Modal';

// Exact orders data from Figma screen (figma_orders_table.png)
const initialOrders = [
  { id: '1', client: 'Anthony Hopkins', orderNum: '29302', description: 'Pink women\'s socks', delivery: 'Great Britain Margam 20 Ffordd Derwen', status: 'New', payment: 'Unpaid', comment: '-' },
  { id: '2', client: 'Harry Potter', orderNum: '29303', description: 'Magic broom', delivery: 'county of Surrey Tysova Street, 4', status: 'In progress', payment: 'Unpaid', comment: '-' },
  { id: '3', client: 'P. Diddy', orderNum: '29305', description: 'White classic suit - 2pcs', delivery: 'USA New York Harlem', status: 'Cancelled', payment: 'Unpaid', comment: 'Need to deliver by the 23rd' },
  { id: '4', client: 'Pavlo Shevchenko', orderNum: '29304', description: 'Treasure - 1pcs', delivery: 'Ukraine Kyiv Khreschatyk 11', status: 'Delivered', payment: 'Paid', comment: '-' },
  { id: '5', client: 'Santa Claus', orderNum: '29306', description: 'Red Santa suit - 1pcs', delivery: 'Finland Lapland province Rovaniemi city', status: 'Completed', payment: 'Paid', comment: '-' },
  { id: '6', client: 'Harry Potter', orderNum: '29307', description: 'Magic broom - 3pcs', delivery: 'county of Surrey Tysova Street, 4', status: 'Delivered', payment: 'Unpaid', comment: '-' },
  { id: '7', client: 'P. Diddy', orderNum: '29308', description: 'White classic suit - 1pcs', delivery: 'USA New York Harlem', status: 'Completed', payment: 'Paid', comment: '-' },
  { id: '8', client: 'Anthony Hopkins', orderNum: '29309', description: 'Pink women\'s socks', delivery: 'Great Britain Margam 20 Ffordd Derwen', status: 'Completed', payment: 'Paid', comment: '-' },
];

const Orders = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [newOrder, setNewOrder] = useState({
    client: '',
    description: '',
    delivery: '',
    comment: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(orders.map(o => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    showToast(locale === 'ua' ? `Статус замовлення оновлено: ${newStatus}` : `Order status updated: ${newStatus}`);
  };

  const handlePaymentChange = (id, newPayment) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, payment: newPayment } : o));
    showToast(locale === 'ua' ? 'Статус оплати змінено' : 'Payment status updated');
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newOrder.client.trim()) return;

    const created = {
      id: String(Date.now()),
      client: newOrder.client,
      orderNum: String(Math.floor(29310 + Math.random() * 9000)),
      description: newOrder.description || 'Custom Goods',
      delivery: newOrder.delivery || 'Kyiv, Ukraine',
      status: 'New',
      payment: 'Unpaid',
      comment: newOrder.comment || '-'
    };

    setOrders([created, ...orders]);
    setIsCreateOpen(false);
    setNewOrder({ client: '', description: '', delivery: '', comment: '' });
    showToast(locale === 'ua' ? 'Замовлення створено!' : 'Order created!');
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All orders' || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.orderNum.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="animate-fadeIn flex flex-col gap-6 font-dm max-w-[1440px] mx-auto pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header matching Figma exactly */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#104c9a]">
          {t('sellerOrders') || 'Order'}
        </h1>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 border border-[#104c9a] hover:bg-blue-50 text-sm font-medium text-[#104c9a] rounded-lg transition-all cursor-pointer bg-white shadow-sm"
        >
          {t('logOut') || 'Log out'}
        </button>
      </div>

      {/* Filter and Action Controls Bar matching Figma */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-800 cursor-pointer select-none">
            <input 
              type="checkbox"
              checked={selectedIds.length === orders.length && orders.length > 0}
              onChange={handleSelectAll}
              className="rounded border-gray-300 w-4 h-4 accent-[#104c9a]"
            />
            <span>{locale === 'ua' ? 'Всі' : 'All'} ({orders.length})</span>
          </label>

          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 border border-gray-200 rounded-lg text-xs bg-white text-gray-700 outline-none font-medium shadow-sm cursor-pointer"
          >
            <option value="All orders">All orders</option>
            <option value="New">New</option>
            <option value="In progress">In Progress</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
            <input 
              type="text"
              placeholder={locale === 'ua' ? 'Пошук...' : 'Search'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-xs outline-none bg-white shadow-sm focus:border-blue-500"
            />
          </div>

          <button 
            onClick={() => setIsCreateOpen(true)}
            className="px-5 py-2.5 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>+</span>
            <span>{locale === 'ua' ? 'Створити замовлення' : 'Create order'}</span>
          </button>
        </div>
      </div>

      {/* Orders Table matching Figma Orange Header & White Cards */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#fa6000] text-white">
              <th className="py-4 px-4 rounded-l-xl font-bold w-10"></th>
              <th className="py-4 px-4 font-bold">{locale === 'ua' ? 'Клієнт' : 'Client'}</th>
              <th className="py-4 px-4 font-bold">{locale === 'ua' ? 'Номер замовлення' : 'Order number'}</th>
              <th className="py-4 px-4 font-bold">{locale === 'ua' ? 'Опис товару' : 'Goods description'}</th>
              <th className="py-4 px-4 font-bold">{locale === 'ua' ? 'Доставка' : 'Delivery'}</th>
              <th className="py-4 px-4 font-bold">{locale === 'ua' ? 'Статус замовлення' : 'Order status'}</th>
              <th className="py-4 px-4 font-bold">{locale === 'ua' ? 'Оплата' : 'Payment'}</th>
              <th className="py-4 px-4 rounded-r-xl font-bold">{locale === 'ua' ? 'Коментар' : 'Comment on the order'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredOrders.map(order => {
              const isChecked = selectedIds.includes(order.id);
              return (
                <tr 
                  key={order.id}
                  className="hover:bg-blue-50/20 transition-colors group relative border-b border-gray-100"
                >
                  <td className="py-4 px-4">
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleSelectOne(order.id)}
                      className="rounded border-gray-300 w-4 h-4 accent-[#104c9a]"
                    />
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-800">
                    {order.client}
                  </td>
                  <td className="py-4 px-4 font-bold text-gray-900 font-mono">
                    {order.orderNum}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-700">
                    {order.description}
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-[11px] max-w-[200px]">
                    {order.delivery}
                  </td>
                  <td className="py-4 px-4">
                    <select 
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className="bg-transparent font-medium text-gray-900 text-xs outline-none cursor-pointer hover:text-blue-600"
                    >
                      <option value="New">New ⌄</option>
                      <option value="In progress">In progress ⌄</option>
                      <option value="Delivered">Delivered ⌄</option>
                      <option value="Cancelled">Cancelled ⌄</option>
                      <option value="Completed">Completed ⌄</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    <select 
                      value={order.payment}
                      onChange={e => handlePaymentChange(order.id, e.target.value)}
                      className={`bg-transparent font-medium text-xs outline-none cursor-pointer ${
                        order.payment === 'Paid' ? 'text-gray-900 font-bold' : 'text-gray-600'
                      }`}
                    >
                      <option value="Paid">Paid ⌄</option>
                      <option value="Unpaid">Unpaid ⌄</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-gray-500 text-[11px]">
                    {order.comment}
                  </td>

                  {/* View Action Overlay on Hover matching Figma */}
                  <td className="absolute right-4 top-1/2 -translate-y-1/2 hidden group-hover:block">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-1.5 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-md cursor-pointer transition-all"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Show more button matching Figma */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => showToast(locale === 'ua' ? 'Всі замовлення завантажено' : 'Loaded all orders')}
          className="px-6 py-2.5 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>↻</span>
          <span>{t('showMore') || 'Show more'}</span>
        </button>
      </div>

      {/* Order Details Modal */}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <div className="p-6 max-w-lg w-full flex flex-col gap-4 text-xs font-dm">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="font-mono text-[#104c9a] font-bold text-base">#{selectedOrder.orderNum}</span>
                <h3 className="text-lg font-bold text-gray-900">{selectedOrder.client}</h3>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-[#104c9a] rounded-full font-bold text-[11px]">
                {selectedOrder.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between">
                <span className="text-gray-500">Товар / Опис:</span>
                <span className="font-bold text-gray-900">{selectedOrder.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Адреса доставки:</span>
                <span className="font-medium text-gray-800 text-right max-w-[240px]">{selectedOrder.delivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Оплата:</span>
                <span className="font-bold text-gray-900">{selectedOrder.payment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Коментар:</span>
                <span className="text-gray-800">{selectedOrder.comment}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 bg-[#4e46b4] text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Закрити
            </button>
          </div>
        )}
      </Modal>

      {/* Create Order Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <form onSubmit={handleCreateSubmit} className="p-6 max-w-lg w-full flex flex-col gap-3.5 text-xs font-dm">
          <h3 className="text-lg font-bold text-[#104c9a] border-b border-gray-100 pb-2">
            {locale === 'ua' ? 'Створити нове замовлення' : 'Create new order'}
          </h3>

          <label className="flex flex-col gap-1 font-bold text-gray-700">
            {locale === 'ua' ? 'Ім’я клієнта' : 'Client name'} *
            <input 
              type="text"
              value={newOrder.client}
              onChange={e => setNewOrder({ ...newOrder, client: e.target.value })}
              required
              className="px-3.5 py-2 border border-gray-200 rounded-lg outline-none font-medium text-xs focus:border-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1 font-bold text-gray-700">
            {locale === 'ua' ? 'Опис товару' : 'Goods description'} *
            <input 
              type="text"
              value={newOrder.description}
              onChange={e => setNewOrder({ ...newOrder, description: e.target.value })}
              required
              className="px-3.5 py-2 border border-gray-200 rounded-lg outline-none font-medium text-xs focus:border-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1 font-bold text-gray-700">
            {locale === 'ua' ? 'Адреса доставки' : 'Delivery address'} *
            <input 
              type="text"
              value={newOrder.delivery}
              onChange={e => setNewOrder({ ...newOrder, delivery: e.target.value })}
              required
              className="px-3.5 py-2 border border-gray-200 rounded-lg outline-none font-medium text-xs focus:border-blue-500"
            />
          </label>

          <label className="flex flex-col gap-1 font-bold text-gray-700">
            {locale === 'ua' ? 'Коментар' : 'Comment'}
            <input 
              type="text"
              value={newOrder.comment}
              onChange={e => setNewOrder({ ...newOrder, comment: e.target.value })}
              className="px-3.5 py-2 border border-gray-200 rounded-lg outline-none font-medium text-xs focus:border-blue-500"
            />
          </label>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50"
            >
              {locale === 'ua' ? 'Скасувати' : 'Cancel'}
            </button>
            <button 
              type="submit"
              className="px-5 py-2 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-sm"
            >
              {locale === 'ua' ? 'Зберегти' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Orders;
