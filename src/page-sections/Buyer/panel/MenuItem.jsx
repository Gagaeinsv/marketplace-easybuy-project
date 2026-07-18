const MenuItem = ({ icon, label, iconArr, isActive, onClick }) => {
  return (
    <div
      className={`flex items-center gap-5 cursor-pointer transition ${
        isActive
          ? 'stroke-blue-900 text-blue-900 font-bold'
          : 'stroke-gray-500 text-gray-500 hover:text-blue-900 hover:stroke-blue-900'
      }`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span className="text-[20px]">{label}</span>
      <span className="flex-grow"></span>
      <span className="pr-2.5 md:hidden">{iconArr}</span>
    </div>
  );
};

export default MenuItem;
