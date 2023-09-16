import React from 'react';

interface InputTextAreaProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  labelText?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const InputTextArea: React.FC<InputTextAreaProps> = (props: InputTextAreaProps) => {
  const {
    isLoading,
    isDisabled,
    labelText,
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
            h-52"
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
          <textarea
            name={name}
            placeholder={placeholder}
            rows={10}
            disabled={isDisabled}
            value={value}
            onChange={onChange}
            className="
              resize-none
              border-2
              focus:border-cyan-500
              outline-none
              rounded
              transition
              duration-200
              p-2
            "
          >
          </textarea>
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

const InputTextAreaMemo = React.memo(InputTextArea);

export default InputTextAreaMemo;
