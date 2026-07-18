import SearchIcon from '@/components/icons/SearchIcon.jsx';
import { useLanguage } from '@/context/LanguageContext';

const SearchBox = () => {
  const { locale, t } = useLanguage();

  return (
    <div className="flex items-center w-full">
      <div className="relative flex-grow bg-white rounded-[4px] lg:rounded-r-none focus-within:[&_input::placeholder]:text-brand-700 focus-within:[&_svg_path]:fill-transparent focus-within:[&_svg_path]:stroke-brand-700 md:rounded-l-[8px]">
        <SearchIcon className="absolute top-[50%] left-[12px] -translate-y-1/2 pointer-events-none [&_path]:fill-transparent [&_path]:stroke-brand-400 [&_path]:transition-colors" />
        <input
          className="text-[12px] w-[159px] py-[6px] pl-[36px] pr-[12px] text-text placeholder:text-brand-400 placeholder:transition-colors md:text-[16px] md:w-full md:py-[15px] md:pl-[48px] md:pr-[16px] outline-none"
          type="text"
          placeholder={locale === 'ua' ? 'Пошук товарів, брендів...' : 'Search for anything'}
        />
      </div>
      <button
        className="bg-gradient-accent hover:brightness-110
        rounded-l-none
        hidden md:block font-semibold text-[16px] rounded-r-[8px]
        px-[13px] py-[15px] w-[104px] text-white cursor-pointer
        transition-all duration-300
      "
      >
        {t('searchButton')}
      </button>
    </div>
  );
};

export default SearchBox;
