import React, { useRef, useEffect } from 'react';

interface InputProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  isAutoFocus?: boolean;
  type: React.HTMLInputTypeAttribute;
  labelText?: string;
  name: string;
  placeholder?: string;
  min?: number;
  max?: number;
  containerClassName?: string;
  inputClassName?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    isLoading,
    isDisabled,
    isAutoFocus,
    labelText,
    type,
    name,
    placeholder,
    min,
    max,
    containerClassName,
    inputClassName,
    value,
    onChange,
    error
  } = props;

  const inputElementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAutoFocus) inputElementRef.current?.focus();
  }, [isAutoFocus]);

  return (
    <div className={`flex flex-col gap-y-2 ${containerClassName}`}>
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
        <>
          {labelText ? (
            <label className="text-lg text-gray-600 font-semibold">
              {labelText}
            </label>
          ) : null}
          <input
            ref={inputElementRef}
            type={type}
            name={name}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={isDisabled}
            value={value}
            onChange={onChange}
            className={`
              outline-0
              border-2
              border-neutral-200
              rounded
              focus:border-cyan-500
              transition
              duration-200
              w-full
              p-2
              ${inputClassName}
            `}
          />
        </>
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
