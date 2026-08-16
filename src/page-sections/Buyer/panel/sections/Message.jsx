'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { mockMessages } from '@/data/mockMessages';

// Icons
const DotsIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </svg>
);

const NotificationBellIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const SmileIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
    <line x1="9" y1="9" x2="9.01" y2="9"></line>
    <line x1="15" y1="9" x2="15.01" y2="9"></line>
  </svg>
);

const ImageIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

const PaperclipIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
  </svg>
);

const MicIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

const ChevronLeftIcon = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const NoMessagesIllustration = () => (
  <div className="w-full flex flex-col items-center justify-center py-20 text-center">
    <div className="w-64 h-64 relative mb-6">
      <Image src="/images/empty-messages.svg" alt="No Messages" fill sizes="400px" className="object-contain" priority />
    </div>
  </div>
);

const Message = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState(mockMessages);
  const [activeTab, setActiveTab] = useState('All');
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [archivedIds, setArchivedIds] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  const tabs = [
    { id: 'All', label: t('messagesAll') },
    { id: 'Unread', label: t('messagesUnread') },
    { id: 'Archived', label: t('messagesArchived') },
    { id: 'Saved', label: t('messagesSaved') },
  ];

  const activeChat = messages.find(m => m.id === activeChatId);

  // Filter messages based on active tab
  const filteredMessages = messages.filter(chat => {
    if (activeTab === 'Unread') return chat.unreadCount > 0;
    if (activeTab === 'Archived') return archivedIds.includes(chat.id);
    if (activeTab === 'Saved') return savedIds.includes(chat.id);
    // 'All' tab excludes archived
    return !archivedIds.includes(chat.id);
  });

  // Action handlers
  const handleAction = (chatId, action) => {
    if (action === 'archive') {
      setArchivedIds(prev => [...prev, chatId]);
      if (activeChatId === chatId) setActiveChatId(null);
    }
    if (action === 'save') setSavedIds(prev => [...prev, chatId]);
    if (action === 'delete') {
      setMessages(prev => prev.filter(m => m.id !== chatId));
      if (activeChatId === chatId) setActiveChatId(null);
    }
    if (action === 'unread') {
      setMessages(prev => prev.map(m => m.id === chatId ? { ...m, unreadCount: m.unreadCount + 1 } : m));
    }
    setActiveMenuId(null);
  };

  // If there are no messages
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <NoMessagesIllustration />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">{t('noMessages')}</h2>
      </div>
    );
  }

  const renderChatList = () => (
    <div className={`w-full lg:w-2/5 flex flex-col border-r border-gray-200 lg:pr-4 ${activeChatId ? 'hidden lg:flex' : 'flex'}`}>
      
      {/* Mobile Back Header (List) */}
      <div className="lg:hidden flex items-center justify-center mb-6 relative">
        <button className="absolute left-0 text-blue-900">
          <ChevronLeftIcon />
        </button>
        <h2 className="text-xl font-bold text-blue-900">Message</h2>
      </div>

      {/* Tabs - Desktop only or hidden on mobile if wanted, but screenshots show no tabs on mobile */}
      <div className="hidden lg:flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 font-semibold text-sm transition-colors relative ${
              activeTab === tab.id ? 'text-blue-900' : 'text-gray-500 hover:text-blue-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-900 rounded-t-md" />
            )}
          </button>
        ))}
      </div>

      {/* Chat Items */}
      <div className="flex flex-col gap-2">
        {filteredMessages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">{t('noMessages') || 'No messages here'}</div>
        )}
        {filteredMessages.map((chat) => (
          <div 
            key={chat.id} 
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-colors relative ${activeChatId === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            onClick={() => setActiveChatId(chat.id)}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative bg-gray-100 border border-gray-200">
              {chat.store.logo && <Image src={chat.store.logo} alt="" fill sizes="48px" className="object-cover" />}
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-blue-900 truncate">{chat.store.name}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">{chat.lastMessageDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 truncate pr-2">{t('sendAMessage')}</span>
                <div className="flex items-center gap-2">
                  {chat.unreadCount > 0 ? (
                    <span className="bg-green-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {chat.unreadCount}
                    </span>
                  ) : (
                    <NotificationBellIcon className="text-orange-400 w-4 h-4" />
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === chat.id ? null : chat.id); }}
                    className="text-orange-500 hover:bg-orange-50 p-1 rounded-full transition-colors"
                  >
                    <DotsIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Dropdown Menu Desktop / BottomSheet Mobile */}
            {activeMenuId === chat.id && (
              <>
                {/* Mobile Overlay (Backdrop) */}
                <div 
                  className="fixed inset-0 bg-black/40 z-40 lg:hidden animate-fadeIn" 
                  onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }} 
                />
                
                {/* Menu Container */}
                <div 
                  className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl pt-2 pb-6 z-50 flex flex-col lg:absolute lg:right-8 lg:top-10 lg:w-[200px] lg:bottom-auto lg:left-auto lg:rounded-xl lg:py-2 lg:shadow-lg lg:border lg:border-gray-100 lg:animate-none text-center lg:text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Mobile drag handle indicator */}
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 lg:hidden"></div>
                  
                  <button onClick={() => handleAction(chat.id, 'unread')} className="px-4 py-4 lg:py-2 border-b lg:border-none border-gray-100 hover:bg-gray-50 text-gray-700 text-lg lg:text-sm font-medium lg:font-normal w-full">{t('markAsUnread')}</button>
                  <button onClick={() => handleAction(chat.id, 'archive')} className="px-4 py-4 lg:py-2 border-b lg:border-none border-gray-100 hover:bg-gray-50 text-gray-700 text-lg lg:text-sm font-medium lg:font-normal w-full">{t('archiveDiscussion')}</button>
                  <button onClick={() => handleAction(chat.id, 'delete')} className="px-4 py-4 lg:py-2 border-b lg:border-none border-gray-100 hover:bg-gray-50 text-red-600 text-lg lg:text-sm font-medium lg:font-normal w-full">{t('deleteDiscussion')}</button>
                  <button onClick={() => handleAction(chat.id, 'fix')} className="px-4 py-4 lg:py-2 border-b lg:border-none border-gray-100 hover:bg-gray-50 text-gray-700 text-lg lg:text-sm font-medium lg:font-normal w-full">{t('toFixDiscussion')}</button>
                  <button onClick={() => handleAction(chat.id, 'save')} className="px-4 py-4 lg:py-2 hover:bg-gray-50 text-gray-700 text-lg lg:text-sm font-medium lg:font-normal w-full">{t('saveDiscussion')}</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderActiveChat = () => (
    <div className={`w-full lg:w-3/5 flex flex-col lg:pl-6 ${!activeChatId ? 'hidden lg:flex lg:items-center lg:justify-center' : 'flex'}`}>
      
      {!activeChatId ? (
        <div className="hidden lg:flex flex-col items-center text-gray-400">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <p>{t('selectChatToStart') || 'Select a chat to start messaging'}</p>
        </div>
      ) : (
        <div className="flex flex-col h-full h-[600px] lg:h-[700px]">
          {/* Mobile Back Header (Chat) */}
          <div className="lg:hidden flex items-center justify-center mb-4 relative">
            <button onClick={() => setActiveChatId(null)} className="absolute left-0 text-blue-900 p-2 -ml-2">
              <ChevronLeftIcon />
            </button>
            <h2 className="text-xl font-bold text-blue-900">{activeChat.store.name}</h2>
          </div>

          {/* Product Info Header */}
          <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between mb-4 shadow-sm gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded flex-shrink-0 relative overflow-hidden">
                 <Image src={activeChat.product.image} alt="" fill sizes="40px" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-blue-900 font-bold uppercase mb-0.5">Order ID: {activeChat.product.id}</span>
                <span className="text-sm text-blue-900">{activeChat.product.name}</span>
              </div>
            </div>
            <div className="flex flex-col md:items-end">
               <span className="text-[10px] text-gray-400">{activeChat.product.date}</span>
               <span className="text-sm font-bold text-gray-900">Total: US ${activeChat.product.price}</span>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 py-4 scrollbar-hide">
             {activeChat.messages.map((msg) => (
               <div key={msg.id} className={`flex flex-col ${msg.sender === 'buyer' ? 'items-end' : 'items-start'}`}>
                  {msg.sender === 'store' && <span className="text-[10px] text-gray-400 mb-1 ml-2">{msg.time}</span>}
                  
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'buyer' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.sender === 'store' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 relative">
                        <Image src={activeChat.store.logo} alt="" fill sizes="32px" className="object-cover" />
                      </div>
                    )}
                    
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'buyer' 
                        ? 'border border-gray-200 bg-white text-gray-700 rounded-br-sm' 
                        : 'bg-gray-100 text-gray-700 rounded-bl-sm'
                    }`}>
                      {msg.text.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i !== msg.text.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>

                    {msg.sender === 'buyer' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-blue-900 relative">
                        {/* Buyer Avatar */}
                        <Image src="/img/avatar.png" alt="" fill sizes="40px" className="object-cover" />
                      </div>
                    )}
                  </div>

                  {msg.sender === 'buyer' && <span className="text-[10px] text-gray-400 mt-1 mr-10">{msg.time}</span>}
               </div>
             ))}
          </div>

          {/* Input Area */}
          <div className="mt-auto border border-gray-200 rounded-full flex items-center px-4 py-2 bg-white">
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <SmileIcon className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              placeholder={t('messagePlaceholder')} 
              className="flex-1 px-3 py-2 text-sm focus:outline-none bg-transparent"
            />
            <div className="flex items-center gap-1 text-blue-400">
              <button className="p-1.5 hover:text-blue-600 transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:text-blue-600 transition-colors">
                <PaperclipIcon className="w-5 h-5" />
              </button>
              <button className="p-1.5 hover:text-blue-600 transition-colors">
                <MicIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row w-full h-full relative" onClick={() => setActiveMenuId(null)}>
      {/* Hide desktop section title on mobile if we're rendering our own headers, but since title is rendered by parent SectionContent, we just let it be or use global css to hide it. Actually, parent SectionContent is out of our control here, so it will show "Message" h1 on mobile. That's fine. */}
      
      {renderChatList()}
      {renderActiveChat()}
      
    </div>
  );
};

export default Message;
