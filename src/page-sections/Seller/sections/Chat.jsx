'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';

const initialConversations = [
  { id: '1', name: 'Anthony Hopkins', orderNum: '29302', lastMsg: 'When will the pink socks be delivered?', date: 'Today 14:30', avatar: 'AH' },
  { id: '2', name: 'Harry Potter', orderNum: '29303', lastMsg: 'Magic broom received, thank you!', date: 'Yesterday', avatar: 'HP' },
];

const Chat = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(initialConversations);
  const [activeChatId, setActiveChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState({
    '1': [
      { sender: 'client', text: 'Hello! I placed order #29302 for pink socks.', time: '14:20' },
      { sender: 'seller', text: 'Hello Anthony! Your order is packed and scheduled for delivery today.', time: '14:25' },
      { sender: 'client', text: 'When will the pink socks be delivered?', time: '14:30' },
    ],
    '2': [
      { sender: 'client', text: 'Magic broom received, thank you!', time: '11:00' },
    ]
  });

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages(prev => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        { sender: 'seller', text: inputText, time }
      ]
    }));
    setInputText('');
  };

  const activeChat = conversations.find(c => c.id === activeChatId);
  const currentMessages = chatMessages[activeChatId] || [];

  return (
    <div className="animate-fadeIn flex flex-col gap-6 font-dm max-w-[1440px] mx-auto pb-16">
      {/* Top Header matching Figma */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#104c9a]">
          {t('sellerChat') || 'Chat'}
        </h1>
        <button 
          onClick={handleLogout}
          className="px-6 py-2 border border-[#104c9a] hover:bg-blue-50 text-sm font-medium text-[#104c9a] rounded-lg transition-all cursor-pointer bg-white shadow-sm"
        >
          {t('logOut') || 'Log out'}
        </button>
      </div>

      {/* Filter Tabs & Search Bar matching Figma exactly */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Pills container */}
        <div className="bg-[#f0f0f5] p-1 rounded-xl flex items-center gap-1 w-fit">
          {['All', 'Unread', 'Archived', 'Saved'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          <input 
            type="text"
            placeholder={locale === 'ua' ? 'Пошук...' : 'Search'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-xs outline-none bg-white shadow-sm focus:border-blue-500"
          />
        </div>
      </div>

      {/* Chat workspace */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-[520px] flex overflow-hidden">
        {/* Left dialogs list */}
        <div className="w-full sm:w-1/3 border-r border-gray-100 flex flex-col">
          <div className="p-3 border-b border-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Dialogs ({conversations.length})
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {conversations.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`w-full p-4 flex gap-3 text-left transition-colors cursor-pointer ${
                  activeChatId === chat.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#104c9a] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {chat.avatar}
                </div>
                <div className="overflow-hidden flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-gray-900 text-xs truncate">{chat.name}</span>
                    <span className="text-gray-400 text-[10px]">{chat.date}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">{chat.lastMsg}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right message area */}
        <div className="hidden sm:flex sm:w-2/3 flex-col bg-gray-50/30">
          {activeChat ? (
            <>
              <div className="bg-white px-6 py-3.5 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-sm text-gray-900">{activeChat.name}</span>
                <span className="text-xs text-[#104c9a] font-medium">Order #{activeChat.orderNum}</span>
              </div>

              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-3">
                {currentMessages.map((msg, index) => {
                  const isSeller = msg.sender === 'seller';
                  return (
                    <div key={index} className={`flex flex-col max-w-[70%] ${isSeller ? 'self-end items-end' : 'self-start items-start'}`}>
                      <div className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
                        isSeller ? 'bg-[#104c9a] text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSendMessage} className="bg-white p-3.5 border-t border-gray-100 flex gap-2.5">
                <input 
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500"
                />
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <span className="text-4xl mb-2">💬</span>
              <h3 className="font-bold text-gray-800 text-base">You don&apos;t have messages yet</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
