export interface APIResponse<T> {
  data: T;
  meta: string;
  errors: {};
  warnings: {};
  code: {};
}
