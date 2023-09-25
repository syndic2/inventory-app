export interface AddPurchaseProductBody {
  product_id?: string;
  qty?: number;
  buy_price?: number;
}

export interface AddPurchaseBody {
  purchase_date_time?: string;
  supplier_name?: string;
  purchase_note?: string;
  purchase_invoice_image?: File;
  products?: AddPurchaseProductBody[];
}