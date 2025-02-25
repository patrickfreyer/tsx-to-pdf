import React from 'react';

interface ButtonProps {
  text: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  color = 'primary', 
  onClick 
}) => {
  const colorClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${colorClasses[color]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button; 