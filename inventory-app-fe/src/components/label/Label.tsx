import React from 'react';

interface LabelProps {
  isLoading?: boolean;
  text: string;
}

const Label: React.FC<LabelProps> = (props: LabelProps) => {
  const {
    isLoading,
    text
  } = props;

  return isLoading ? (
    <div className="
      bg-slate-200
      rounded
      animate-pulse
      w-full
      h-7"
    >
    </div>
  ) : (
    <label className="text-lg text-gray-600 font-semibold">
      {text}
    </label>
  );
};

const LabelMemo = React.memo(Label);

export default LabelMemo;