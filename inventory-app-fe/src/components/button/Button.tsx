import React from 'react';
import Spinner from '../../assets/svg/Spinner';

interface ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    isLoading,
    isDisabled,
    label,
    onClick,
    className
  } = props;

  return (
    <button
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
