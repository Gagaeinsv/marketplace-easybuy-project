import BurgerBtnIcon from '@/components/icons/mobile/BurgerBtnIcon';

const BurgerButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="lg:hidden">
      <button type="button" onClick={onClick}>
        <BurgerBtnIcon />
      </button>
    </div>
  );
};

export default BurgerButton;
