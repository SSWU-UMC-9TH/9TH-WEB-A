import axios from "axios";

export const getLpList = async (params: {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
}) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_SERVER_API_URL}/v1/lps`,
    { params }
  );
  return data;
};

export const getLpDetail = async (id: number) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_SERVER_API_URL}/v1/lps/${id}`
  );
  return data;
};

export interface Lp {
  id: number;
  title: string;
  thumbnail?: string;
  likeCount?: number;
  createdAt?: string;
  content?: string;
}

export const postLike = async (lpId: number) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_API_URL}/v1/lps/${lpId}/like`
  );
  return data;
};

export const deleteLike = async (lpid: number) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_SERVER_API_URL}/v1/lps/${lpid}/like`
  );
  return data;
};

export const deleteLp = async (lpId: number | string) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_SERVER_API_URL}/v1/lps/${lpId}`
  );
  return data;
};

export const patchLp = async (lpId: number, patchData: any) => {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_SERVER_API_URL}/v1/lps/${lpId}`,
    patchData
  );
  return data;
};