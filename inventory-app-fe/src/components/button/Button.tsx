import React from 'react';
import Spinner from '../../assets/svg/Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  label: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    isLoading,
    isDisabled,
    label,
    type,
    onClick,
    className
  } = props;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`
        bg-cyan-500
        text-white rounded
        outline-none
        hover:bg-cyan-600
        transition
        duration-150
        p-3
        ${className}
      `}
    >
      {isLoading ? (
        <Spinner className="m-auto" />
      ) : label}
    </button>
  );
};

const ButtonMemo = React.memo(Button);

export default ButtonMemo;
