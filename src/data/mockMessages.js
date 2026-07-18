export const mockMessages = [
  {
    id: 'm1',
    store: {
      name: 'Pizhama store',
      logo: '/images/chat-seller.png', // Temporary placeholder for store logo
    },
    unreadCount: 0,
    lastMessageDate: '13 Oct',
    product: {
      name: "Pink women's socks",
      id: '22910',
      date: 'February 24, 2023',
      price: 1.99,
      image: '/img/card-img.png', // Temporary placeholder
    },
    messages: [
      {
        id: 'msg1',
        sender: 'store',
        text: "Hello, you have ordered women's pink socks. Would you like to add tights or knee-highs to your order?",
        time: '13 Oct, 15:03',
      },
      {
        id: 'msg2',
        sender: 'buyer',
        text: 'Hello\nThank you, I will order next time',
        time: '13 Oct, 15:07',
      }
    ]
  },
  {
    id: 'm2',
    store: {
      name: 'Apple store',
      logo: '/images/chat-seller.png', // Temporary placeholder
    },
    unreadCount: 3,
    lastMessageDate: '13 Oct',
    product: {
      name: "Black t-shirt",
      id: '22911',
      date: 'October 10, 2023',
      price: 15.99,
      image: '/img/card-img.png',
    },
    messages: [
      {
        id: 'msg1',
        sender: 'store',
        text: "Your order has been shipped. Tracking number is 123456789.",
        time: '13 Oct, 10:00',
      }
    ]
  },
  {
    id: 'm3',
    store: {
      name: 'Chanel',
      logo: '/img/brands/levis-brand.png', // Temporary placeholder
    },
    unreadCount: 0,
    lastMessageDate: '13 Oct',
    product: {
      name: "Perfume 50ml",
      id: '22912',
      date: 'October 12, 2023',
      price: 120.00,
      image: '/img/card-img.png',
    },
    messages: [
      {
        id: 'msg1',
        sender: 'buyer',
        text: "Is this item original?",
        time: '13 Oct, 11:00',
      },
      {
        id: 'msg2',
        sender: 'store',
        text: "Yes, all our items are 100% authentic with certificates.",
        time: '13 Oct, 11:05',
      }
    ]
  }
];
