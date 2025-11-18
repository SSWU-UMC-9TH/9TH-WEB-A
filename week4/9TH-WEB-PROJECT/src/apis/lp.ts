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