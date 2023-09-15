import { useState } from 'react';

interface ApiIndicatorProps {
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const useApiIndicator = (): ApiIndicatorProps => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  return {
    isSubmit,
    setIsSubmit
  }
};

export default useApiIndicator;
