import LpCardSkeleton from "@/components/LpCardSkeleton";
import React from 'react';

interface LpCardSkeletonListProps {
  count?: number; 
}

const LpCardSkeletonList: React.FC<LpCardSkeletonListProps> = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default LpCardSkeletonList;