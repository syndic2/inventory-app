import { IPurchaseProduct } from '../../../interfaces/purchase.interface';

export interface GetPurchaseResponse {
  purchase_id?: string;
  purchase_date_time?: string;
  purchase_note?: string;
  purchase_invoice_image_path?: string;
  supplier_name?: string;
  total_product?: number;
  grand_total?: number;
  products?: IPurchaseProduct[];
}