import { PaginationResponse } from '../../commons/pagination-response';
import { IProduct } from '../../../interfaces/product.interface';

export interface GetProductsResponse extends PaginationResponse {
  data: IProduct[];
}
