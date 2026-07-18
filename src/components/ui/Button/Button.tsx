import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseStyle = "flex justify-center items-center py-3 px-6 rounded-[4px] font-bold transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-2 border-[#104c9a] text-[#104c9a] bg-white hover:bg-gray-50",
    secondary: "bg-gradient-to-r from-[#104c9a] to-[#2563eb] text-white hover:brightness-110",
    tertiary: "bg-gradient-to-r from-[#ff7400] to-[#f9a826] text-white hover:brightness-110",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
