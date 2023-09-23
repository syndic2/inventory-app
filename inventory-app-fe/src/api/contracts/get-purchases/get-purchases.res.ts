import { PaginationResponse } from '../../commons/pagination-response';
import { IPurchase } from '../../../interfaces/purchase.interface';

export interface GetPurchasesResponse extends PaginationResponse {
  data: IPurchase[];
}
