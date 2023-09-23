import React, { useCallback } from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

export interface PaginatorProps {
  currentPage: number;
  totalPage?: number;
  prevUrl?: string;
  nextUrl?: string;
  onPrevNextClick?: (url: string) => void;
  onPageClick?: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = (props: PaginatorProps) => {
  const {
    currentPage,
    totalPage = 1,
    prevUrl,
    nextUrl,
    onPrevNextClick,
    onPageClick
  } = props;

  const onPrevClick = useCallback(() => {
    if (prevUrl && onPrevNextClick) onPrevNextClick(prevUrl);
  }, [prevUrl, onPrevNextClick]);

  const onNextClick = useCallback(() => {
    if (nextUrl && onPrevNextClick) onPrevNextClick(nextUrl);
  }, [nextUrl, onPrevNextClick]);

  const handlePageClick = useCallback((page: number) => {
    if (onPageClick) onPageClick(page);
  }, [onPageClick]);

  console.log('total page', totalPage);

  return (
    <div className="flex items-center gap-x-6">
      <BsChevronDoubleLeft
        onClick={onPrevClick}
        size={16}
        className={`
          text-cyan-600 
          ${prevUrl ? 'cursor-pointer hover:text-cyan-700' : 'opacity-50'}
          transition 
          duration-200
        `}
      />
      <div className="flex items-center">
        {totalPage ? Array.from(Array(totalPage)).map((_, index) => (
          <span
            key={`paginator-page-${index + 1}`}
            onClick={() => handlePageClick(index + 1)}
            className={`
              border-l-2
              ${index + 1 === totalPage ? 'border-r-2' : ''}
              border-y-2
              border-cyan-500
              ${index + 1 === currentPage ? 'bg-cyan-500 text-white' : ''}
              cursor-pointer
              px-3 py-1
          `}>
            {index + 1}
          </span>
        )) : null}
      </div>
      <BsChevronDoubleRight
        onClick={onNextClick}
        size={16}
        className={`
          text-cyan-600 
          ${nextUrl ? 'cursor-pointer hover:text-cyan-700' : 'opacity-50'}
          transition 
          duration-200
        `}
      />
    </div>
  );
};

const PaginatorMemo = React.memo(Paginator);

export default PaginatorMemo;