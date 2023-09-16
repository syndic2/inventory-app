export interface AddProductBody {
  product_name?: string;
  product_sku?: string;
  product_desc?: string;
  product_image_path?: string;
  qty?: number;
  sell_price?: number;
}
