import { IProduct } from '../../../interfaces/product.interface';

export interface GetPaginatedProductsResponse {
  current_page: number;
  data: IProduct[];
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  links: {
    url: string,
    label: string;
    active: boolean;
  }[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
