import React from 'react';

interface InputProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  value?: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    isLoading,
    isDisabled,
    type,
    name,
    placeholder,
    value,
    onChange,
    error
  } = props;

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <>
          <div className="
            bg-slate-200
            rounded
            animate-pulse
            w-full
            h-7"
          >
          </div>
          <div className="
            bg-slate-200
            rounded
            animate-pulse
            w-28
            h-4"
          >
          </div>
        </>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={onChange}
          className="
          outline-0
          border-2
          border-neutral-200
          rounded
          focus:border-cyan-500
          transition
          duration-200
          w-full
          p-2
        "
        />
      )}
      {error ? (
        <span className="bg-red-400 text-white text-sm rounded w-fit px-2 py-1">
          {error}
        </span>
      ) : null}
    </div>
  );
};

const InputMemo = React.memo(Input);

export default InputMemo;
