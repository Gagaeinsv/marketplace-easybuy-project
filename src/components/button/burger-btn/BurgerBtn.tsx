import BurgerBtnIcon from '@/components/icons/mobile/BurgerBtnIcon';

const BurgerButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="lg:hidden">
      <button 
        type="button" 
        onClick={onClick}
        className="p-2 -ml-2 cursor-pointer flex items-center justify-center relative z-10"
        aria-label="Open menu"
      >
        <BurgerBtnIcon />
      </button>
    </div>
  );
};

export default BurgerButton;
