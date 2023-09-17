import { PaginationResponse } from '../../commons/pagination-response';
import { ISale } from '../../../interfaces/sale.interface';

export interface GetSalesResponse extends PaginationResponse {
  data: ISale[];
}
