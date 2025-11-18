import LpCardSkeleton from "@/components/LpCardSkeleton";

const LpCardSkeletonList = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 20 }).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default LpCardSkeletonList;