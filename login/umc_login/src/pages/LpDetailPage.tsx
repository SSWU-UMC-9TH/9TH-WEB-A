import { useNavigate, useParams } from "react-router-dom";
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
import { PAGINATION_ORDER } from "../enum/common";

import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useUpdateLp from "../hooks/mutations/useUpdateLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import { ThumbnailInput } from "../components/ThumbnailInputProps";

import { useQueryClient } from "@tanstack/react-query";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const lpIdNumber = Number(lpId);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: lp, isPending, isError } = useGetLpDetail({ lpId: lpIdNumber });
  const { data: me } = useGetMyInfo(accessToken!);

  const { ref, inView } = useInView();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedThumbnail, setEditedThumbnail] = useState("");

  const [sortOrder, setSortOrder] = useState(PAGINATION_ORDER.desc);
  const [commentInput, setCommentInput] = useState("");

  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const { mutate: postCommentMutate, isPending: isPosting } = usePostComment();
  const updateLpMutate = useUpdateLp();
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
    if (inView && hasNextPage && !isFetching) fetchNextPage();
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isLoading) return <div className="text-white">불러오는 중...</div>;
  if (isError || !lp)
    return <div className="text-white">LP 정보를 불러오지 못했습니다.</div>;

  const isLiked = lp.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () =>
    isLiked
      ? disLikeMutate({ lpId: lpIdNumber })
      : likeMutate({ lpId: lpIdNumber });

  const handlePostComment = () => {
    if (!commentInput.trim()) return;
    postCommentMutate(
      { lpId: lpIdNumber, content: commentInput.trim(), order: sortOrder },
      {
        onSuccess: () => {
          setCommentInput("");
          refetch();
        },
        onError: (err: any) =>
          alert(err?.response?.data?.message || "댓글 작성 실패"),
      }
    );
  };

  const handleStartEdit = () => {
    setEditedTitle(lp.data.title);
    setEditedContent(lp.data.content);
    setEditedThumbnail(lp.data.thumbnail);
    setIsEditing(true);
  };

  const handleUpdateLp = () => {
    updateLpMutate.mutate(
      {
        lpId: lpIdNumber,
        patchData: {
          title: editedTitle,
          content: editedContent,
          thumbnail: editedThumbnail,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["lpDetail", lpIdNumber],
          });

          setIsEditing(false);
        },
        onError: () => {
          alert("LP 수정에 실패했습니다.");
        },
      }
    );
  };

  const handleDeleteLp = () => {
    if (confirm("정말 삭제하시겠습니까?")) deleteLpMutate(lpIdNumber);
  };

  const buttonBase =
    "px-3 py-1 rounded-md text-sm font-semibold transition-colors";
  const editingBtn = "bg-black text-[#FF1493] hover:bg-[#000000aa]";
  const cancelBtn = "bg-[#FF1493] text-black hover:bg-[#ff66cc]";

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div>
        {isEditing ? (
          <>
            <input
              className="text-2xl font-bold mb-2 w-full bg-transparent border-b border-[#FF1493] outline-none text-[#FF1493]"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <ThumbnailInput
              thumbnail={editedThumbnail}
              setThumbnail={setEditedThumbnail}
            />
            <textarea
              className="w-full bg-transparent border border-[#FF1493] rounded-md p-2 text-[#FF1493]"
              rows={5}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleUpdateLp}
                className={`${buttonBase} ${editingBtn}`}
              >
                저장
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={`${buttonBase} ${cancelBtn}`}
              >
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">{lp.data.title}</h1>
            <img
              className="w-full h-64 object-cover rounded-xl mb-4 border-4 border-[#FF1493]"
              src={lp.data.thumbnail}
              alt={lp.data.title}
            />
            <p className="mb-4 text-gray-300 whitespace-pre-wrap">
              {lp.data.content}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button onClick={handleLikeLp}>
                  <Heart
                    fill={isLiked ? "#FF1493" : "transparent"}
                    stroke="#FF1493"
                  />
                </button>
                <span>{lp.data.likes.length}</span>
              </div>
              <button
                onClick={handleStartEdit}
                className={`${buttonBase} ${editingBtn}`}
              >
                수정
              </button>
              <button
                onClick={handleDeleteLp}
                className={`${buttonBase} ${cancelBtn}`}
              >
                삭제
              </button>
            </div>
          </>
        )}
      </div>

      <div className="bg-[#212529] p-5 rounded-xl mt-5">
        <h2 className="text-xl font-bold mb-2 text-[#FF1493]">댓글</h2>
        <div className="mb-2 flex items-start gap-2">
          <textarea
            className="flex-1 p-2 h-10 text-sm text-white rounded-md border border-[#FF1493] placeholder-[#FF1493] resize-none"
            placeholder="댓글을 작성해주세요..."
            rows={1}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            onClick={handlePostComment}
            disabled={isPosting}
            className="px-4 h-10 bg-[#FF1493] font-semibold text-black rounded-md hover:bg-[#ff66cc]"
          >
            작성
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {([PAGINATION_ORDER.desc, PAGINATION_ORDER.asc] as const).map(
            (order) => (
              <button
                key={order}
                onClick={() => setSortOrder(order)}
                className={`px-3 py-1 rounded-md border text-sm font-semibold transition-colors ${
                  sortOrder === order
                    ? "bg-[#FF1493] text-black border-black"
                    : "bg-transparent border-[#FF1493] text-[#FF1493]"
                }`}
              >
                {order === PAGINATION_ORDER.desc ? "최신순" : "오래된 순"}
              </button>
            )
          )}
        </div>

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
                  refetch={refetch}
                />
              ))
            )
          )}
          {isFetching && <CommentSkeletonList count={5} />}
          <div ref={ref} style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
