// 타입 정의
export type PAGINATION_ORDER = "asc" | "desc";

// 값으로도 사용할 객체 정의
export const PAGINATION_ORDER: Record<PAGINATION_ORDER, PAGINATION_ORDER> = {
  asc: "asc",
  desc: "desc",
};
