'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ProductGallery from '@/components/product-details/ProductGallery';
import Button from '@/components/ui/Button/Button';
import { ProductItem } from '@/store/products/operations';
import StarRating from '@/components/star-rating/StarRating';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/cart/slice';
import { addProductView } from '@/store/recently-viewed/slice';
import LikeIcon from '@/components/icons/LikeIcon';
import LinkIcon from '@/components/icons/LinkIcon';
import SmallCartIcon from '@/components/icons/SmallCartIcon';

const mockSizes = ['XS', 'S', 'M', 'L', 'XL'];
const mockColors = [
  { name: 'Black', hex: '#252527' },
  { name: 'Khaki', hex: '#757c6a' },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useAppDispatch();
  
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Variant Selection State
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(mockColors[0].name);
  const [validationError, setValidationError] = useState('');

  // Tabs state
  const [activeTab, setActiveTab] = useState<string>('description');

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
          mainImageUrl: productData.mainImageUrl || "https://placehold.co/600x800",
        }));
        
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError('Please select a size before adding to cart.');
      return;
    }
    setValidationError('');
    
    if (product) {
      dispatch(addToCart({
        id: product.id,
        art: product.art,
        name: product.name,
        price: product.price,
        image: product.mainImageUrl || "https://placehold.co/600x800",
        quantity: 1,
        size: selectedSize,
        color: selectedColor || undefined,
      }));
    }
  };

  if (loading) return <div className="container mx-auto py-20 text-center text-xl">Loading product...</div>;
  if (error || !product) return <div className="container mx-auto py-20 text-center text-xl text-red-500">{error || 'Product not found'}</div>;

  // Prepare images for gallery
  const images = [
    product.mainImageUrl || `https://placehold.co/600x800?text=${encodeURIComponent(product.name)}`,
    ...((product as any).additionalImages || [])
  ];

  return (
    <>
      {/* Filters & Breadcrumbs placeholder */}
      <div className="bg-white border-b border-gray-100 mb-8">
        <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-5 hidden lg:flex flex-col gap-6">
          <div className="flex justify-between items-center text-sm text-[#104c9a] font-bold">
            <div className="flex gap-1 items-center">
              <span className="font-normal text-[#104c9a]">Clothes for Women</span> <span className="text-[#104c9a] mx-1">/</span>
              <span className="font-normal text-[#104c9a]">Outwear</span> <span className="text-[#104c9a] mx-1">/</span>
              <span className="font-bold text-[#104c9a]">Jackets</span>
              <span className="ml-8 mr-2 font-bold">Sort:</span>
              <select className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-600 font-normal outline-none text-xs">
                <option>from cheap to expensive</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#104c9a]">Subscribe your searches</span>
              <button className="border border-[#104c9a] rounded px-4 py-1.5 flex items-center gap-2 text-[#104c9a] font-bold bg-transparent hover:bg-blue-50 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-bold text-[#104c9a] pb-2">
            <button className="border border-[#104c9a] bg-white rounded-md px-4 py-1.5 flex items-center gap-2 hover:bg-blue-50 transition-colors whitespace-nowrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
              Filters
            </button>
            <button className="border border-[#104c9a] bg-white rounded-md px-5 py-1.5 hover:bg-blue-50 transition-colors">Price</button>
            <button className="border border-[#104c9a] bg-white rounded-md px-5 py-1.5 hover:bg-blue-50 transition-colors">Brand</button>
            <button className="border border-[#104c9a] bg-white rounded-md px-5 py-1.5 hover:bg-blue-50 transition-colors">Size</button>
            <button className="border border-[#104c9a] bg-white rounded-md px-5 py-1.5 hover:bg-blue-50 transition-colors">Color</button>
            <button className="border border-[#104c9a] bg-white rounded-md px-5 py-1.5 hover:bg-blue-50 transition-colors">Material</button>
            <button className="border border-[#104c9a] bg-white rounded-md px-5 py-1.5 hover:bg-blue-50 transition-colors">Discount</button>
            <button className="border border-[#104c9a] bg-white rounded-md px-5 py-1.5 hover:bg-blue-50 transition-colors">Rating</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 lg:px-8 pb-8 lg:pb-12">

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
        
        {/* Gallery Section */}
        <div className="w-full lg:w-[40%] xl:w-[35%] max-w-[480px]">
          <ProductGallery images={images} />
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-[60%] xl:w-[65%] flex flex-col">
          <div className="text-[#104c9a] font-bold text-lg mb-2">
            Seller: Shop "YourFashion"
          </div>
          
          <div className="flex justify-between items-start mb-4 mt-2">
            <h1 className="text-3xl lg:text-[32px] font-bold font-dm text-[#104c9a] max-w-[70%] leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-6 mt-1">
              <div className="text-2xl lg:text-[28px] font-bold font-dm text-[#104c9a] whitespace-nowrap">
                $ {(product.price).toFixed(2)}
              </div>
              <div className="flex items-center gap-3 text-[#104c9a]">
                <button className="hover:text-[#ff7400] transition-colors">
                  <LikeIcon className="w-5 h-5 text-[#104c9a] hover:text-[#ff7400] transition-colors" />
                </button>
                <button className="hover:text-[#ff7400] transition-colors">
                  <LinkIcon className="w-5 h-5 text-[#104c9a] hover:text-[#ff7400] transition-colors" />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4 text-[#104c9a] text-[15px] leading-relaxed">
             {product.description || "This stylish and warm winter jacket is perfect for the coldest days. Crafted from high-quality materials, it offers excellent insulation and protection from the elements. The sleek design, combined with practical features like multiple pockets and a cozy hood, makes it both functional and fashionable. This jacket will keep you warm and comfortable."}
          </div>

          <div className="flex items-center gap-3 mb-6 mt-2">
            <StarRating initialRating={product.rating || 4} activeColor="#104c9a" className="gap-[3px]" />
            <span className="text-[#104c9a] text-sm font-bold ml-2 cursor-pointer hover:text-[#ff7400]" onClick={() => setActiveTab('reviews')}>
              {product.reviewsCount || 12} reviews
            </span>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="font-bold mb-3 text-lg text-[#104c9a]">Colour</h3>
            <div className="flex gap-3">
              <button onClick={() => setSelectedColor('White')} className={`w-8 h-8 rounded-lg transition-all border border-black/5 hover:scale-105`} style={{ backgroundColor: '#e6e6e6' }} />
              <button onClick={() => setSelectedColor('Red')} className={`w-8 h-8 rounded-lg transition-all border border-black/5 hover:scale-105`} style={{ backgroundColor: '#a6174a' }} />
              <button onClick={() => setSelectedColor('Purple')} className={`w-8 h-8 rounded-lg transition-all border border-black/5 hover:scale-105`} style={{ backgroundColor: '#8974d6' }} />
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-lg text-[#104c9a]">Size</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {mockSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setValidationError('');
                  }}
                  className={`w-11 h-11 border-2 rounded-md transition-all text-[15px] font-bold flex items-center justify-center ${
                    selectedSize === size
                      ? 'border-[#104c9a] text-[#104c9a] bg-blue-50'
                      : 'border-[#104c9a] text-[#104c9a] hover:bg-blue-50 bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-sm text-[#104c9a] mb-5 bg-[#f4f7fb] px-4 py-2.5 rounded-lg w-full max-w-[340px] border border-[#104c9a]/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>Our model is 172 cm tall and is wearing size S</span>
            </div>

            <button className="text-[15px] text-[#104c9a] underline hover:text-[#ff7400] transition-colors">Size Guide</button>
            
            {validationError && (
              <p className="text-red-500 text-sm mt-2 font-medium">{validationError}</p>
            )}
          </div>

          <div className="mb-8 text-[#104c9a] text-xl mt-4">
            <span className="font-bold">Article:</span> 626514
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-[#ff6b00] text-white font-bold rounded-lg py-3 hover:brightness-110 transition-colors">
              Buy Now
            </button>
            <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 bg-white text-[#104c9a] border-2 border-[#104c9a] font-bold rounded-lg py-3 hover:bg-blue-50 transition-colors">
              <SmallCartIcon className="w-5 h-5 text-[#104c9a]" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-dashed border-gray-300 my-10 relative"></div>

      {/* Bottom Section: Tabs + Reviews */}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-[5%] mb-16 relative">
        
        {/* Left Column: Tabs */}
        <div className="w-full lg:w-[55%]">
          <div className="flex gap-4 border-b border-gray-200 mb-8 pb-3 text-[#104c9a] font-bold text-sm overflow-x-auto justify-between pr-4">
            {['description', 'characteristics', 'payment', 'photos', 'shipping'].map((tab) => (
              <React.Fragment key={tab}>
                <button
                  onClick={() => setActiveTab(tab as any)}
                  className={`capitalize whitespace-nowrap ${
                    activeTab === tab ? 'text-[#104c9a] underline underline-offset-[16px] decoration-[3px]' : 'hover:text-blue-600'
                  }`}
                >
                  {tab}
                </button>
                {tab !== 'shipping' && <span className="text-gray-300 font-normal hidden sm:inline">•</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="min-h-[300px] text-sm text-[#104c9a] leading-relaxed">
            {activeTab === 'description' && (
              <div>
                <h4 className="font-bold mb-2">Product Story</h4>
                <p className="mb-4">Stay stylish and shielded from the elements in this women's jacket. Designed for laid-back leisurewear, its relaxed fit and soft fleece lining provide essential warmth for chilly city strolls. Zip hand pockets stash your essentials, while the elasticated cuffs and hem seal out the cold.</p>
                <h4 className="font-bold mb-2">Features & Benefits</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Made with at least 50% recycled materials.</li>
                  <li>Warm CELL: Breathable cold weather technology designed to trap heat close to your body and keep you warm during exercise.</li>
                  <li>Wind CELL: Technology designed to protect against the wind and keep you comfortable during exercise.</li>
                </ul>
              </div>
            )}
            {activeTab === 'characteristics' && (
              <div className="flex gap-12">
                <div>
                  <h4 className="font-bold mb-2">Details</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mock neck collar</li>
                    <li>Fleece lining in pockets</li>
                    <li>Elasticated cuffs and hem</li>
                    <li>Full zip closure</li>
                    <li>PUMA Cat Logo rubber print</li>
                  </ul>
                  <h4 className="font-bold mt-4 mb-2">Material Information</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Inner Collar: 100% polyester</li>
                    <li>Upper Pocket Bag: 100% polyester</li>
                    <li>Lining: 100% polyester</li>
                    <li>Shell: 100% nylon</li>
                    <li>Filling: 100% polyester</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Care Instructions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Gentle wash - separately</li>
                    <li>Repeat tumble drying process and shake garment in between</li>
                    <li>Exclusive of Decoration</li>
                    <li>Close all fastenings</li>
                    <li>Wash with similar colours</li>
                    <li>Wash and iron inside out</li>
                    <li>Add tennis balls when tumble drying</li>
                    <li>Use detergent for colours</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'payment' && (
              <div>
                <h4 className="font-bold mb-2">Payment Information</h4>
                <h4 className="font-bold mt-4 mb-2">Payment Methods</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard;</li>
                  <li><strong>Digital Wallets:</strong> PayPal, Apple Pay, Google Pay;</li>
                  <li><strong>Bank Transfer:</strong> Direct bank transfers.</li>
                </ul>
                <p className="mb-4">Your financial information is protected by industry-standard security measures, including SSL encryption.</p>
                <h4 className="font-bold mb-2">Payment Processing Fees</h4>
                <p className="mb-4">A small processing fee may be applied to each transaction.</p>
                <p className="mb-4">Please note: Specific payment methods and fees may vary depending on your location and the products you purchase.</p>
                <p>For more detailed information, please refer to our Terms and Conditions and Privacy Policy.</p>
              </div>
            )}
            {activeTab === 'photos' && (
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'shipping' && (
              <div>
                <h4 className="font-bold mb-4">Shipping Information</h4>
                <h4 className="font-bold mb-1">Standard Delivery</h4>
                <p className="mb-4">Delivery within 1-3 working days.</p>
                <h4 className="font-bold mb-1">Express Delivery**</h4>
                <p className="mb-1">Order before 14:00 from Monday to Friday for next-day delivery*.</p>
                <p className="mb-1">*Saturdays not included. See "Support &gt; Delivery" for details.</p>
                <p className="mb-4">**Not available for personalized orders.</p>
                <h4 className="font-bold mb-1">Personalized article Delivery*</h4>
                <p className="mb-1">For personalized items Standard delivery is extended up to 4-6 working days.</p>
                <p>*If you ordered several items, please note that they will all be delivered with the personalized article.</p>
              </div>
            )}
          </div>
        </div>

        {/* Vertical Dashed Line Divider (Desktop Only) */}
        <div className="hidden lg:block absolute left-[57.5%] top-0 bottom-0 w-[2px] border-l-2 border-dashed border-gray-300"></div>

        {/* Right Column: Reviews */}
        <div className="w-full lg:w-[40%] pl-0">
          <h3 className="text-[#104c9a] font-bold text-sm mb-6">Customer Reviews (12)</h3>
          <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {/* Mock Review 1 */}
            <div className="border border-gray-200 rounded p-4 bg-white shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[#104c9a] text-[13px]">Oksana</span>
                <span className="text-[#104c9a] opacity-60 text-xs font-medium">18.11.2024</span>
              </div>
              <p className="text-[#104c9a] text-xs mb-4 leading-relaxed">It's super lightweight but surprisingly warm, perfect for crisp winter days. The relaxed fit is comfy and the black color goes with everything.</p>
              <div className="flex justify-between items-center text-xs text-[#104c9a]">
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 hover:text-blue-600 font-bold"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> 5</button>
                  <button className="flex items-center gap-1 hover:text-red-600 font-bold"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg> 0</button>
                </div>
                <div className="flex text-[#104c9a] gap-0.5">
                  {[1,2,3,4].map(star => <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
              </div>
            </div>

            {/* Mock Review 2 */}
            <div className="border border-gray-200 rounded p-4 bg-white shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[#104c9a] text-[13px]">Alexia</span>
                <span className="text-[#104c9a] opacity-60 text-xs font-medium">03.10.2024</span>
              </div>
              <p className="text-[#104c9a] text-xs mb-4 leading-relaxed">Great casual jacket! The shiny fabric adds a fun touch and the fleece lining keeps me toasty. True to size! I ordered my usual size and it fits great.</p>
              <div className="flex justify-between items-center text-xs text-[#104c9a]">
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 hover:text-blue-600 font-bold"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> 1</button>
                  <button className="flex items-center gap-1 hover:text-red-600 font-bold"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg> 0</button>
                </div>
                <div className="flex text-[#104c9a] gap-0.5">
                  {[1,2,3,4].map(star => <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
              </div>
            </div>
            
            <button className="text-[#104c9a] font-bold text-sm underline mt-2 self-end hover:text-[#ff7400]">See All</button>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-300 my-10"></div>

      {/* You May Also Like Section */}
      <div className="mt-8 mb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-[28px] font-bold font-dm text-[#104c9a]">You May Also Like</h2>
          <a href="#" className="text-[#104c9a] font-bold flex items-center gap-2 text-sm hover:underline">
            Shop now <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
           {[1,2,3,4,5].map(i => (
             <div key={i} className="min-w-[210px] w-[210px] snap-start border border-gray-200 rounded-[12px] p-3 bg-white flex flex-col hover:shadow-lg transition-shadow">
               <div className="relative w-full h-[220px] bg-[#f0f0f0] rounded mb-3 flex items-center justify-center">
                 {/* Product image placeholder */}
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                 
                 <div className="absolute top-2 left-2 bg-[#ff6b00] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">On Sale</div>
                 <button className="absolute top-2 right-2 text-[#ff6b00] bg-white/70 rounded-full p-1 hover:bg-white transition-colors">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                 </button>
               </div>
               <div className="flex gap-0.5 text-gray-400 mb-2">
                 {[1,2,3,4].map(star => <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               </div>
               <div className="text-[11px] text-[#104c9a] font-bold leading-tight mb-1 line-clamp-2">Title : Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>
               <div className="text-[10px] text-[#6391c8] mb-3">Short: Dress, Colour</div>
               <div className="text-[15px] font-bold font-dm text-[#104c9a] mb-4">$ 100</div>
               <button className="w-full bg-gradient-to-r from-[#104c9a] to-[#2563eb] text-white text-[13px] font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 mt-auto hover:brightness-110 shadow-md">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                 Add to Cart
               </button>
             </div>
           ))}
         </div>
      </div>
    </div>
    </>
  );
}
