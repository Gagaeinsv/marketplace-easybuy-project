'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAppDispatch } from '@/store/hooks';
import { logOut } from '@/store/auth/operations';

const Settings = () => {
  const { t, locale } = useLanguage();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    companyName: 'Nike',
    email: 'nike.store@gmail.com',
    contactPerson: 'Phil Knight',
    phone: '+38 (050) 739 73 00',
    additionalPhone: '+38 (067) 692 01 43',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae nunc id nisl mattis lobortis. Cras malesuada arcu nulla. Curabitur justo sem, condimentum vitae metus sodales, cursus iaculis justo. Sed eget viverra libero. Nam vestibulum congue nisi nec facilisis. Mauris viverra ante neque, non congue lorem lobortis bibendum. Vivamus imperdiet turpis ac lobortis aliquam. Suspendisse est ante, commodo sed laoreet in, gravida eget est. Phasellus ut posuere mauris. Proin auctor vel massa non viverra. Pellentesque cursus, nisl vitae congue interdum, sapien libero commodo augue, eget bibendum est est eu augue. Donec sed quam ac diam luctus lobortis sit amet ut ipsum. In lobortis enim erat, at dignissim neque accumsan vitae.',
    
    // Business types
    businessTypes: {
      producer: true,
      trading: false,
      serviceProvider: false,
      govOrg: false,
      association: false,
      other: false,
    },

    // Additional info
    legalForm: 'ФОП 3 група (5%)',
    statutoryFund: '1 000 000 UAH',
    employees: '50-100',
    foundationYear: '1964',
    salesVolume: '5 000 000 - 10 000 000 UAH',
    applicationVolumes: '1 000 - 5 000',
    productionLocation: 'Україна / Вʼєтнам',
    productionDimensions: '10 000 sq.m.',
    qualityControl: 'ISO 9001 certified',
    productionLines: '12 lines',

    // Location
    country: 'Ukraine',
    city: 'Kyiv',
    address: 'Khreshchatyk St, 22',

    // Uploaded Documents
    doc1: 'Vypyska_EDR_Nike.pdf',
    doc2: 'Vytyag_Platnyk_Podatku.pdf',
    doc3: 'Dovidka_IBAN.pdf',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleCheckboxChange = (key) => {
    setFormData(prev => ({
      ...prev,
      businessTypes: {
        ...prev.businessTypes,
        [key]: !prev.businessTypes[key]
      }
    }));
  };

  const handleFileUpload = (docKey, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [docKey]: file.name }));
      showToast(locale === 'ua' ? `Файл "${file.name}" завантажено!` : 'Document uploaded!');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast(locale === 'ua' ? 'Налаштування успішно збережено!' : 'Profile settings saved!');
    }, 600);
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 animate-fadeIn font-dm pb-16 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#104c9a] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-white/20">
          <span className="text-lg">✓</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar matching Figma */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-extrabold text-[#104c9a]">
          {t('sellerSettings') || 'Profile settings'}
        </h1>
        <button 
          type="button"
          onClick={handleLogout}
          className="px-6 py-2 border border-[#104c9a] hover:bg-blue-50 text-sm font-medium text-[#104c9a] rounded-lg transition-all cursor-pointer bg-white shadow-sm"
        >
          {t('logOut') || 'Log out'}
        </button>
      </div>

      {/* 1. Company information Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-[#104c9a]">
            {t('companyInfo') || 'Company information'}
          </h2>
          <button type="button" className="w-8 h-8 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {t('companyName') || 'Company name'}<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input 
                type="text"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-500"
              />
              <span className="absolute right-3 bottom-[-18px] text-[10px] text-gray-400">
                {formData.companyName.length}/100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                {t('emailLabel') || 'Email'}<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 bottom-[-18px] text-[10px] text-gray-400">
                  {formData.email.length}/100
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                {locale === 'ua' ? 'Контактна особа' : 'Contact person'}<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={formData.contactPerson}
                  onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 bottom-[-18px] text-[10px] text-gray-400">
                  {formData.contactPerson.length}/100
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                {t('phoneNumberLabel') || 'Phone Number'}<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 bottom-[-18px] text-[10px] text-gray-400">
                  {formData.phone.length}/100
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-700">
                {locale === 'ua' ? 'Додатковий телефон' : 'Additional phone number'}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={formData.additionalPhone}
                  onChange={e => setFormData({ ...formData, additionalPhone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 outline-none focus:border-blue-500"
                />
                <span className="absolute right-3 bottom-[-18px] text-[10px] text-gray-400">
                  {formData.additionalPhone.length}/100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. About the company Card with Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-[#104c9a]">
            {t('aboutCompany') || 'About the company'}
          </h2>
          <button type="button" className="w-8 h-8 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* WYSIWYG Toolbar */}
        <div className="border border-gray-200 rounded-t-lg bg-gray-50/70 p-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <select className="bg-white border border-gray-200 rounded px-2 py-1 text-xs outline-none cursor-pointer">
              <option>Size 14px</option>
              <option>Size 16px</option>
              <option>Size 18px</option>
            </select>
            <div className="h-4 w-px bg-gray-300 mx-1" />
            <button type="button" className="font-bold hover:text-black">T</button>
            <button type="button" className="font-bold text-[10px] hover:text-black">T</button>
            <button type="button" className="italic hover:text-black font-serif">I</button>
            <button type="button" className="font-extrabold hover:text-black">B</button>
            <button type="button" className="underline hover:text-black">U</button>
            <div className="h-4 w-px bg-gray-300 mx-1" />
            <button type="button" className="hover:text-black">≡</button>
            <button type="button" className="hover:text-black">≣</button>
            <button type="button" className="hover:text-black">≡</button>
            <div className="h-4 w-px bg-gray-300 mx-1" />
            <button type="button" className="hover:text-black">• List</button>
            <button type="button" className="hover:text-black">1. List</button>
          </div>

          <button type="button" className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1">
            <span>📄</span> {locale === 'ua' ? 'Використати шаблон' : 'Use a template'}
          </button>
        </div>

        <textarea 
          rows={5}
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-4 border border-t-0 border-gray-200 rounded-b-lg text-xs leading-relaxed text-gray-700 outline-none focus:border-blue-500"
        />
      </div>

      {/* 3. Additional information about the company */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-[#104c9a] mb-6">
          {t('additionalInformation') || 'Additional information about the company'}
        </h2>

        {/* Business Type Checkboxes */}
        <div className="mb-6">
          <span className="text-sm font-bold text-gray-900 block mb-3">
            {t('businessType') || 'Business type'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-gray-700">
            {[
              { key: 'producer', label: locale === 'ua' ? 'Виробник' : 'Producer' },
              { key: 'trading', label: locale === 'ua' ? 'Торгова компанія / Дистриб’ютор' : 'Trading company' },
              { key: 'serviceProvider', label: locale === 'ua' ? 'Постачальник послуг' : 'Servise provider company' },
              { key: 'govOrg', label: locale === 'ua' ? 'Державна установа / Бюро' : 'Government organization/Bureau' },
              { key: 'association', label: locale === 'ua' ? 'Асоціація / Об’єднання' : 'Association' },
              { key: 'other', label: locale === 'ua' ? 'Інше' : 'Other' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={formData.businessTypes[item.key]}
                  onChange={() => handleCheckboxChange(item.key)}
                  className="rounded border-gray-300 accent-[#104c9a] w-4 h-4"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Form Inputs Grid matching Figma */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Організаційно-правова форма (ФОП, ТОВ тощо)' : 'Organizational and legal form'}
            </label>
            <select 
              value={formData.legalForm}
              onChange={e => setFormData({ ...formData, legalForm: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="ФОП 2 група">ФОП — 2 група платника єдиного податку</option>
              <option value="ФОП 3 група (5%)">ФОП — 3 група платника єдиного податку (5%)</option>
              <option value="ФОП 3 група (3% + ПДВ)">ФОП — 3 група платника єдиного податку (3% + ПДВ)</option>
              <option value="ТОВ">Юридична особа — Товариство з обмеженою відповідальністю (ТОВ)</option>
              <option value="ПП">Приватне підприємство (ПП)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Статутний капітал' : 'Statutory fund'}
            </label>
            <select 
              value={formData.statutoryFund}
              onChange={e => setFormData({ ...formData, statutoryFund: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>До 100 000 UAH</option>
              <option>100 000 - 500 000 UAH</option>
              <option>1 000 000 UAH</option>
              <option>Понад 5 000 000 UAH</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {t('employeesCount') || 'Number of employees'}
            </label>
            <select 
              value={formData.employees}
              onChange={e => setFormData({ ...formData, employees: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>1-10</option>
              <option>10-50</option>
              <option>50-100</option>
              <option>100+</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {t('foundationYear') || 'Year of foundation'}
            </label>
            <input 
              type="text"
              value={formData.foundationYear}
              onChange={e => setFormData({ ...formData, foundationYear: e.target.value })}
              placeholder="1964"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs text-gray-800 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Обсяг продажів на рік' : 'Sales volume per year'}
            </label>
            <select 
              value={formData.salesVolume}
              onChange={e => setFormData({ ...formData, salesVolume: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>До 1 000 000 UAH</option>
              <option>1 000 000 - 5 000 000 UAH</option>
              <option>5 000 000 - 10 000 000 UAH</option>
              <option>Понад 10 000 000 UAH</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Обсяг замовлень на рік' : 'Application volumes per year'}
            </label>
            <select 
              value={formData.applicationVolumes}
              onChange={e => setFormData({ ...formData, applicationVolumes: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>До 500</option>
              <option>500 - 1 000</option>
              <option>1 000 - 5 000</option>
              <option>5 000+</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Локація виробництва' : 'Production location'}
            </label>
            <select 
              value={formData.productionLocation}
              onChange={e => setFormData({ ...formData, productionLocation: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>Україна / Вʼєтнам</option>
              <option>Україна</option>
              <option>Європейський Союз</option>
              <option>Азія</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Площа виробництва' : 'Production dimensions'}
            </label>
            <select 
              value={formData.productionDimensions}
              onChange={e => setFormData({ ...formData, productionDimensions: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>До 1 000 sq.m.</option>
              <option>1 000 - 5 000 sq.m.</option>
              <option>10 000 sq.m.</option>
              <option>50 000+ sq.m.</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Контроль якості' : 'Quality control'}
            </label>
            <select 
              value={formData.qualityControl}
              onChange={e => setFormData({ ...formData, qualityControl: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>ISO 9001 certified</option>
              <option>Внутрішній відділ ВТК</option>
              <option>Міжнародна сертифікація</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Кількість виробничих ліній' : 'Number of production lines'}
            </label>
            <select 
              value={formData.productionLines}
              onChange={e => setFormData({ ...formData, productionLines: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>1-3 lines</option>
              <option>4-10 lines</option>
              <option>12 lines</option>
              <option>20+ lines</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Location Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-[#104c9a] mb-6">
          {t('location') || 'Location'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {t('country') || 'Country'}<span className="text-red-500">*</span>
            </label>
            <select 
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="Ukraine">Ukraine</option>
              <option value="Poland">Poland</option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">
              {locale === 'ua' ? 'Область / Місто' : 'Region/City'}<span className="text-red-500">*</span>
            </label>
            <select 
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs bg-white text-gray-800 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="Kyiv">Kyiv</option>
              <option value="Lviv">Lviv</option>
              <option value="Odesa">Odesa</option>
              <option value="Dnipro">Dnipro</option>
              <option value="Kharkiv">Kharkiv</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1 mt-2">
            <label className="text-xs font-semibold text-gray-700">
              {t('address') || 'Address'}<span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              required
              placeholder="Khreshchatyk St, 22"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-xs text-gray-800 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 5. Documents Card matching Figma */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-[#104c9a] mb-1">
          {locale === 'ua' ? 'Документи' : 'Documents'}
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          {locale === 'ua' ? 'Завантажте документи, що підтверджують вашу діяльність (ФОП, платник податків, рахунок)' : 'Upload documents that confirm your activity'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { key: 'doc1', title: locale === 'ua' ? 'Виписка з ЄДР (ФОП / ТОВ)' : 'EDR Certificate', fname: formData.doc1 },
            { key: 'doc2', title: locale === 'ua' ? 'Свідоцтво платника податків' : 'Taxpayer Certificate', fname: formData.doc2 },
            { key: 'doc3', title: locale === 'ua' ? 'Довідка банку IBAN' : 'Bank IBAN Details', fname: formData.doc3 },
          ].map(doc => (
            <label 
              key={doc.key}
              className="border-2 border-dashed border-gray-200 hover:border-[#104c9a] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-gray-50/40 hover:bg-blue-50/20 text-center"
            >
              <input type="file" onChange={e => handleFileUpload(doc.key, e)} className="hidden" />
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#104c9a] flex items-center justify-center text-lg font-bold">
                ⭡
              </div>
              <span className="font-bold text-xs text-[#104c9a]">{t('upload') || 'Upload'}</span>
              <span className="text-[11px] text-gray-500">{doc.title}</span>
              {doc.fname && (
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono font-bold">
                  ✓ {doc.fname}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Save Button (Centered Purple Button matching Figma) */}
      <div className="flex justify-center mt-4">
        <button 
          type="submit"
          disabled={isSaving}
          className="px-14 py-3 bg-[#4e46b4] hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md cursor-pointer"
        >
          {isSaving ? (locale === 'ua' ? 'Збереження...' : 'Saving...') : (locale === 'ua' ? 'Зберегти' : 'Save')}
        </button>
      </div>
    </form>
  );
};

export default Settings;
