import React from 'react';

interface ErrorLabelProps {
  error?: string;
}

const ErrorLabel: React.FC<ErrorLabelProps> = (props: ErrorLabelProps) => {
  const {
    error
  } = props;

  return !error ? null : (
    <span className="bg-red-400 text-white text-sm rounded w-fit px-2 py-1">
      {error}
    </span>
  );
};

const ErrorLabelMemo = React.memo(ErrorLabel);

export default ErrorLabelMemo;