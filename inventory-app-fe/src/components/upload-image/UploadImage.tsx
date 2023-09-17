import React, { useState, useRef, useCallback, useEffect } from 'react';

interface UploadImageProps {
  isLoading?: boolean;
  isResetPreviewImage?: boolean;
  setIsResetPreviewImage?: React.Dispatch<React.SetStateAction<boolean>>;
  labelText?: string;
  value?: string;
  placeholder?: string;
  onUploadImageCallback: (image: File) => void;
  error?: string;
}

const UploadImage: React.FC<UploadImageProps> = (props: UploadImageProps) => {
  const {
    isLoading,
    isResetPreviewImage,
    setIsResetPreviewImage,
    labelText,
    value,
    placeholder = 'Please upload your image',
    onUploadImageCallback,
    error
  } = props;

  const [previewImagePath, setPreviewImagePath] = useState<string | undefined>();
  const inputFileElementRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isResetPreviewImage) setPreviewImagePath(undefined);
  }, [isResetPreviewImage]);

  useEffect(() => {
    if (value) setPreviewImagePath(value);
  }, [value]);

  const onUploadImageClick = useCallback(() => {
    inputFileElementRef.current?.click();
    setIsResetPreviewImage && setIsResetPreviewImage(false);
  }, [setIsResetPreviewImage]);

  const onChangeInputFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPreviewImagePath(URL.createObjectURL(event.target.files[0]));
      onUploadImageCallback(event.target.files[0]);
    }
    inputFileElementRef.current = null;
  }, [onUploadImageCallback]);

  return (
    <div className="flex flex-col gap-y-4">
      {isLoading ? (
        <>
          <div className="
            bg-slate-200
            rounded
            animate-pulse
            w-full
            h-48"
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
            <label className="text-lg text-gray-600 font-semibold" >
              {labelText}
            </label>
          ) : null}
          <div className="border-2 border-gray-500 border-dashed rounded-md p-8">
            <div className="flex flex-col items-center gap-y-6">
              {previewImagePath ? (
                <img
                  src={previewImagePath}
                  alt="Product Image"
                  className="rounded-md object-contain w-48"
                />
              ) : (
                <span className="text-gray-400 text-lg font-semibold">
                  {placeholder}
                </span>
              )}
              <button
                type={'button'}
                onClick={onUploadImageClick}
                className="
                  bg-cyan-500
                  text-white
                  outline-none
                  rounded
                  hover:bg-cyan-600
                  transition
                  duration-200
                  px-4 py-2
                "
              >
                Upload Image
              </button>
              <input
                ref={inputFileElementRef}
                type="file"
                accept="image/*"
                onChange={onChangeInputFile}
                className="hidden"
              />
            </div>
          </div>
        </>
      )}
      {
        error ? (
          <span className="bg-red-400 text-white text-sm rounded w-fit px-2 py-1">
            {error}
          </span>
        ) : null
      }
    </div >
  );
};

const UploadImageMemo = React.memo(UploadImage);

export default UploadImageMemo;
