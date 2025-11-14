import { useNavigate, useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import CommentItem from "../components/Comment/CommentItem";
import { useAuth } from "../context/AuthContext";
import usePostComment from "../hooks/mutations/usePostComment";
import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteCommentList from "../hooks/queries/useGetInfiniteCommentList";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useInView } from "react-intersection-observer";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import { ThumbnailInput } from "../components/ThumbnailInputProps";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const lpIdNumber = Number(lpId);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const {
    data: lp,
    isPending,
    isError
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { ref, inView } = useInView();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedThumbnail, setEditedThumbnail] = useState("");
  const [sortOrder, setSortOrder] = useState(PAGINATION_ORDER.desc);
  const [commentInput, setCommentInput] = useState("");

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const { mutate: postCommentMutate, isPending: isPosting } = usePostComment();
   const { mutate: updateLpMutate } = useUpdateLp();
  const { mutate: deleteLpMutate } = useDeleteLp(navigate);

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
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = async () => {
    disLikeMutate({ lpId: Number(lpId) });
  };

  const isLiked = lp?.data.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);

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

  const handleStartEdit = () => {
    setEditedTitle(lp?.data.title || "");
    setEditedContent(lp?.data.content || "");
    setEditedThumbnail(lp?.data.thumbnail || "");
    setIsEditing(true);
  };

  const handleUpdateLp = () => {
    updateLpMutate({
      lpId: lpIdNumber,
      patchData: {
        title: editedTitle,
        content: editedContent,
        thumbnail: editedThumbnail,
      },
    });
    setIsEditing(false);
  };

  const handleDeleteLp = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteLpMutate({ lpId: lpIdNumber });
    }
  };

  return (
    <div className="p-8 bg-[#212529] min-h-screen text-[#F8F9FA]">
      <div>
        {isEditing ? (
          <>
            <input
              className="text-2xl font-bold mb-2 w-full bg-transparent border-b border-gray-400 outline-none text-white"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <ThumbnailInput thumbnail={editedThumbnail} setThumbnail={setEditedThumbnail} />
            <textarea
              className="w-full bg-transparent border border-gray-400 rounded-md p-2 text-white"
              rows={5}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">{lp?.data.title}</h1>
            <img
              className="w-100 h-100 object-cover rounded-xl mb-4"
              src={lp?.data.thumbnail}
              alt={lp?.data.title}
            />
            <p className="mb-4 text-gray-300 whitespace-pre-wrap">{lp?.data.content}</p>
          </>
        )}

        <div className="flex items-center gap-4 text-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
              <Heart
                fill={isLiked ? "#F8F9FA" : "transparent"}
              />
            </button>
            <span className="text-[#F8F9FA]">{lp?.data.likes.length}</span>
          </div>
          {isEditing ? (
            <>
              <button onClick={handleUpdateLp} className="px-3 py-1 bg-[#E9ECEF] text-black text-sm rounded-md">저장</button>
              <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-[#6C757D] text-white text-sm rounded-md">취소</button>
            </>
          ) : (
            <>
              <button onClick={handleStartEdit} className="px-3 py-1 bg-[#E9ECEF] text-black text-sm rounded-md">수정</button>
              <button onClick={handleDeleteLp} className="px-3 py-1 bg-[#6C757D] text-white text-sm rounded-md">삭제</button>
            </>
          )}
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
              commentsData?.pages.map((page) =>
                page.data.data.map((comment) => (
                  <CommentItem
                    key={comment.id}
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