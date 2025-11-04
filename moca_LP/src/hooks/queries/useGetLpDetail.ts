import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getLpDetail } from "../../apis/lp";

const useGetLpDetail = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: [QUERY_KEY.lps, id],
    queryFn: () => getLpDetail(id),
    select: (res) => res.data,
    enabled: !!id,
  });
};

export default useGetLpDetail;