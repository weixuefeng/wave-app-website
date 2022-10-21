export interface BaseResponse<T> {
  error_code: number;
  error_message: string | undefined;
  result: T | undefined;
}
