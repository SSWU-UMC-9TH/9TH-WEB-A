import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteCommentList(
  lpId: number,
  limit: number,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: ({ pageParam }) =>
      getComments({ lpId, cursor: pageParam, limit, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteCommentList;