import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Heart } from "lucide-react";

import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetInfiniteCommentList from "../hooks/queries/useGetInfiniteCommentList";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostComment from "../hooks/mutations/usePostComment";

import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import CommentItem from "../components/Comment/CommentItem";

import { useAuth } from "../context/AuthContext";
import { postLike } from "../apis/lp";
import { PAGINATION_ORDER } from "../enum/common";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const lpIdNumber = Number(lpId);
  const { accessToken } = useAuth();

  // LP 상세
  const { data: lp, isError } = useGetLpDetail({ lpId: lpIdNumber });
  // 이제 lp는 바로 LP 객체이므로 lp.title, lp.content, lp.thumbnail 등으로 접근 가능

  // 내 정보
  const { data: me } = accessToken
    ? useGetMyInfo(accessToken)
    : { data: undefined };

  // 댓글 Infinite Query
  const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.desc
  );
  const { ref, inView } = useInView();
  const {
    data: commentsData,
    isLoading,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteCommentList(lpIdNumber, 3, sortOrder);

  const [commentInput, setCommentInput] = useState("");
  const { mutate: postCommentMutate, isPending: isPosting } = usePostComment();

  // Infinite Scroll
  useEffect(() => {
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isError || !lp)
    return <div className="text-white">LP 정보를 불러오지 못했습니다.</div>;
  if (!lp) return <div className="text-white">불러오는 중...</div>;

  // 좋아요
  const handleLikeLp = async () => {
    await postLike({ lpId: lpIdNumber });
  };

  // 댓글 작성
  const handlePostComment = () => {
    if (!commentInput.trim()) return;

    postCommentMutate(
      { lpId: lpIdNumber, content: commentInput.trim(), order: sortOrder },
      {
        onSuccess: () => {
          setCommentInput("");
          refetch();
        },
        onError: (error: any) => {
          alert(error?.response?.data?.message || "댓글 작성에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className="p-8 bg-[#212529] min-h-screen text-[#F8F9FA]">
      {/* LP 상세 */}
      <div>
        <h1 className="text-2xl font-bold mb-4">{lp.title}</h1>
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-64 h-64 object-cover rounded mb-4"
        />
        <p className="mb-4">{lp.content}</p>

        <div className="flex items-center gap-4 text-[#F8F9FA] mb-5">
          <span className="text-lg flex items-center gap-2">
            <Heart
              onClick={handleLikeLp}
              className="w-6 h-6 text-[#F8F9FA] fill-[#F8F9FA] cursor-pointer"
            />
            <span>{lp.likes.length}</span>
          </span>
          <button className="bg-gray-700 px-4 py-1 rounded">수정</button>
          <button className="bg-gray-700 px-4 py-1 rounded">삭제</button>
        </div>

        {/* 댓글 섹션 */}
        <div className="bg-[#343A40] p-5 rounded-xl mt-5">
          <h2 className="text-xl font-bold mb-2">댓글</h2>

          {/* 댓글 입력 */}
          <div className="mb-2 flex items-start gap-2">
            <textarea
              className="flex-1 p-2 h-10 text-sm text-white rounded-md border border-gray-300 placeholder-gray-400 resize-none"
              placeholder="댓글을 작성해주세요..."
              rows={1}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              onClick={handlePostComment}
              disabled={isPosting}
              className="px-4 h-10 bg-[#F8F9FA] font-semibold text-black rounded-md border border-gray-300 hover:bg-gray-100 text-sm"
            >
              작성
            </button>
          </div>

          {/* 댓글 정렬 */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-1 rounded-md border ${
                sortOrder === PAGINATION_ORDER.desc
                  ? "bg-[#F8F9FA] text-black font-semibold"
                  : "bg-transparent border-white text-white"
              }`}
            >
              최신순
            </button>
            <button
              type="button"
              onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-1 rounded-md border ${
                sortOrder === PAGINATION_ORDER.asc
                  ? "bg-[#F8F9FA] text-black font-semibold"
                  : "bg-transparent border-white text-white"
              }`}
            >
              오래된 순
            </button>
          </div>

          {/* 댓글 리스트 */}
          <div>
            {isLoading ? (
              <CommentSkeletonList count={5} />
            ) : (
              commentsData?.pages.map((page, pageIndex) =>
                page.data.data.map((comment, idx) => (
                  <CommentItem
                    key={`${pageIndex}-${idx}`}
                    comment={comment}
                    lpId={lpIdNumber}
                    myId={me?.data.id}
                    refetch={refetch}
                  />
                ))
              )
            )}
            {isFetching && !isLoading && <CommentSkeletonList count={5} />}
            <div ref={ref} style={{ height: "20px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
