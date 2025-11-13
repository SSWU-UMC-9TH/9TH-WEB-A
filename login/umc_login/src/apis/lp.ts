import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, ResponseLpDetailDto } from "../types/lp";
import { axiosInstance } from "./axios";
import axios from "axios";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

export const getLpDetail = async (id: string | number) => {
  const res = await axiosInstance.get(`/v1/lps/${id}`);
  console.log("✅ [getLpDetail API 응답]", res.data);
  return res.data.data;
};
