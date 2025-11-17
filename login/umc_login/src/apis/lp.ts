import type { PaginationDto } from "../types/common";
import type {
  GetCommentParams,
  RequestLpDto,
  ResponseCommentListDto,
  ResponseLikeLpDto,
  ResponseLpDto,
  ResponseLPListDto,
  CreateLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";

// 응답 타입을 명시적으로 지정하여 타입 안정성 향상
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLPListDto> => {
  const { data } = await axiosInstance.get<ResponseLPListDto>("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get<ResponseLpDto>(`/v1/lps/${lpId}`);
  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post<ResponseLikeLpDto>(
    `/v1/lps/${lpId}/likes`
  );
  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete<ResponseLikeLpDto>(
    `/v1/lps/${lpId}/likes`
  );
  return data;
};

export const getComments = async ({
  lpId,
  cursor,
  limit,
  order,
}: GetCommentParams): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get<ResponseCommentListDto>(
    `/v1/lps/${lpId}/comments`,
    {
      params: { cursor, limit, order },
    }
  );

  return data;
};

export const postLp = async (lpData: CreateLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.post<ResponseLpDto>("/v1/lps", lpData);
  return data;
};

type UploadResponse = {
  data: {
    imageUrl: string;
  };
};

export const uploadImageToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post<UploadResponse>(
    "/v1/uploads",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.data.imageUrl;
};

export const patchLp = async (
  lpId: number,
  patchData: CreateLpDto
): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.patch<ResponseLpDto>(
    `/v1/lps/${lpId}`,
    patchData
  );
  return data;
};

export const deleteLp = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.delete<ResponseLpDto>(`/v1/lps/${lpId}`);
  return data;
};
