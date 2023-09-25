export interface AddPurchaseProductsErrors {
  product_id?: string;
  qty?: string;
  buy_price?: string;
}

export interface AddPurchaseError {
  purchase_date_time?: string;
  supplier_name?: string;
  purchase_note?: string;
  purchase_invoice_image?: string;
  products_array?: string;
  products?: AddPurchaseProductsErrors[];
}