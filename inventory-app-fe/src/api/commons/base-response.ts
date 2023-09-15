export interface BaseResponse<T> {
  status: boolean;
  message: string | null;
  data: T | null;
}
