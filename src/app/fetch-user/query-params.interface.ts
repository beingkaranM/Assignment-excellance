export interface RequestQueryParams {
  page: number;
  search?: string;
}
export type PatchQueryParams = Partial<RequestQueryParams>;
