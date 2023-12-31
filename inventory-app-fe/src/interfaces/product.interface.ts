import { IAudit } from './audit.interface';

export interface IProduct extends IAudit {
  product_id?: string;
  product_name?: string;
  product_sku?: string;
  product_desc?: string;
  product_image_path?: string;
  qty?: number;
  buy_price?: number;
  sell_price?: number;
}
