import { IAudit } from './audit.interface';

export interface ISale extends IAudit {
  sale_id?: string;
  sale_date_time?: string;
  sale_note?: string;
  buyer_name?: string;
  total_product?: number;
  total_qty?: number;
  grand_total?: number;
}
