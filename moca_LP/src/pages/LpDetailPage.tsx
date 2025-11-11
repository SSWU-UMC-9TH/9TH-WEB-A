import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import CommentItem from "../components/Comment/CommentItem";
import { useAuth } from "../context/AuthContext";
import { postLike } from "../apis/lp";
import usePostComment from "../hooks/mutations/usePostComment";
import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteCommentList from "../hooks/queries/useGetInfiniteCommentList";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useInView } from "react-intersection-observer";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const lpIdNumber = Number(lpId);
  const { accessToken } = useAuth();
  const { data: lp, isError } = useGetLpDetail({ lpId: Number(lpId) });
  const { data: me } = useGetMyInfo(accessToken);
  
  const { ref, inView } = useInView();

  const [sortOrder, setSortOrder] = useState(PAGINATION_ORDER.desc);
  const [commentInput, setCommentInput] = useState("");
  
  const { mutate: postCommentMutate, isPending: isPosting } = usePostComment();

  const {
    data: commentsData,
    isLoading,
    isFetching,
    refetch,
    fetchNextPage,    
    hasNextPage,  
  } = useGetInfiniteCommentList(lpIdNumber, 3, sortOrder);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);


  if (isLoading) return <div className="text-white">불러오는 중...</div>;
  if (isError || !lp) return <div className="text-white">LP 정보를 불러오지 못했습니다.</div>;

  const handleLikeLp = async () => {
    await postLike({ lpId: Number(lpId) });
  };

  const handlePostComment = () => {
    if (!commentInput.trim()) return;

    postCommentMutate(
      {
        lpId: lpIdNumber,
        content: commentInput.trim(),
        order: sortOrder,
      },
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
      <div>
        <h1 className="text-2xl font-bold mb-4">{lp?.data.title}</h1>
        <img
          src={lp?.data.thumbnail}
          alt={lp?.data.title}
          className="w-64 h-64 object-cover rounded mb-4"
        />
        <p className="mb-4">{lp?.data.content}</p>

        <div className="flex items-center gap-4 text-[#F8F9FA]">
          <span className="text-lg flex items-center gap-2">
            <Heart onClick={handleLikeLp} className="w-6 h-6 text-[#F8F9FA] fill-[#F8F9FA]" />
            <span className="text-[#F8F9FA]">{lp?.data.likes.length}</span>
          </span>
          <button className="bg-gray-700 px-4 py-1 rounded">수정</button>
          <button className="bg-gray-700 px-4 py-1 rounded">삭제</button>
          <button className="bg-pink-600 px-4 py-1 rounded">좋아요</button>
        </div>

        <div className='bg-[#343A40] p-5 rounded-xl mt-5'>
          {/* 댓글 입력 */}
          <h2 className="text-xl font-bold mb-2 text-[#F8F9FA]">댓글</h2>
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

          {/* 정렬 */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-1 rounded-md border ${sortOrder === PAGINATION_ORDER.desc ? "bg-[#F8F9FA] text-black font-semibold" : "bg-transparent border-white text-white"}`}
            >
              최신순
            </button>
            <button
              type="button"
              onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-1 rounded-md border ${sortOrder === PAGINATION_ORDER.asc ? "bg-[#F8F9FA] text-black font-semibold" : "bg-transparent border-white text-white"}`}
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
                  />
                ))
              )
            )}
            {isFetching && <CommentSkeletonList count={5} />}
            <div ref={ref} style={{ height: "20px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;