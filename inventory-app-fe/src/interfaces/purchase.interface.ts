import { IAudit } from './audit.interface';

export interface IPurchaseProduct {
  product_id?: string;
  qty?: number;
  buy_price?: number;
}

export interface IPurchase extends IAudit {
  purchase_id?: string;
  purchase_date_time?: string;
  purchase_note?: string;
  supplier_name?: string;
  total_product?: number;
  total_qty?: number;
  grand_total?: number;
}
