export interface BaseResponse<T> {
  error_code: number
  error_message: string | undefined
  result: T | undefined
}

export interface Pagination<T> {
  page_id: number | undefined
  total_page: number | undefined
  data: Array<T> | undefined
}
