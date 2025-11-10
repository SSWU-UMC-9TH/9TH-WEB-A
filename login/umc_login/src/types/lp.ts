import type { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

// 1. LP 객체 자체의 타입을 'Lp'로 분리해 정의합니다.
export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

// 2. ResponseLpListDto의 data 속성이 'Lp[]'(Lp의 배열)을 갖도록 수정합니다.
export type ResponseLpListDto = CursorBasedResponse<{
  data: Lp[];
}>;

// 3. (추가) LP 상세 정보(1개)를 위한 타입을 만듭니다.
export type ResponseLpDetailDto = CursorBasedResponse<{
  data: Lp; // 👈 배열(Lp[])이 아닌 단일 객체(Lp)
}>;
