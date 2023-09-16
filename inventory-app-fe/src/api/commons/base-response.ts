export interface BaseResponse<T = any> {
  status: boolean;
  message: string | null;
  data: T | null;
}
