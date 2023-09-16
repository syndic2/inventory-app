import { useState } from 'react';

interface ApiIndicatorProps {
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  isFetch: boolean;
  setIsFetch: React.Dispatch<React.SetStateAction<boolean>>;
}

const useApiIndicator = (): ApiIndicatorProps => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isFetch, setIsFetch] = useState<boolean>(false);

  return {
    isSubmit,
    setIsSubmit,
    isFetch,
    setIsFetch
  };
};

export default useApiIndicator;
