import { IAudit } from './audit.interface';

export interface IPurchaseProduct {
  product_id?: string;
  product_name?: string;
  product_sku?: string;
  product_image_path?: string;
  qty?: number;
  buy_price?: number;
  total?: number;
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
