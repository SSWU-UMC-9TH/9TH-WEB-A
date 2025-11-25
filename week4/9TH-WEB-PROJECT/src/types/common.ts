export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export const PAGINATION_ORDER_VALUE = { 
  asc: 'asc',
  desc: 'desc',
} as const;

export type PAGINATION_ORDER = typeof PAGINATION_ORDER_VALUE[keyof typeof PAGINATION_ORDER_VALUE];