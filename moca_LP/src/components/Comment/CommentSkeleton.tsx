const CommentSkeleton = () => {
  return (
    <div className="flex flex-row gap-3 py-3 animate-pulse border-b border-gray-700">
      <div className="w-10 h-10 bg-[#6C757D] rounded-full flex-shrink-0" />
      <div className="flex flex-col flex-1 gap-2">
        <div className="h-4 w-24 bg-[#6C757D] rounded" />
        <div className="h-4 w-full bg-[#6C757D] rounded" />
        <div className="h-4 w-5/6 bg-[#6C757D] rounded" />
      </div>
    </div>
  );
};

export default CommentSkeleton;