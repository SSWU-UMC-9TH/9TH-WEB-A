import type { PAGINATION_ORDER } from "../enums/common";

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type CursorBasedResponse<T> = {
  nextCursor: number;
  hasNext: boolean;
} & CommonResponse<T>;

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
}