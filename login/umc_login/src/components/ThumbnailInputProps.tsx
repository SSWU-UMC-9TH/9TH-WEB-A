import React, { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { uploadImageToServer } from "../apis/lp";
import { Loader2, UploadCloud, XCircle } from "lucide-react";

type ThumbnailInputProps = {
  thumbnail: string;
  setThumbnail: Dispatch<SetStateAction<string>>;
};

export function ThumbnailInput({
  thumbnail,
  setThumbnail,
}: ThumbnailInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 5MB 용량 제한 (예시)
    if (file.size > 5 * 1024 * 1024) {
      setError("5MB 이하의 이미지만 업로드할 수 있습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = await uploadImageToServer(file);
      setThumbnail(imageUrl);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(`이미지 업로드에 실패했습니다: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full my-4">
      <label
        htmlFor="thumbnail-upload"
        className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        {thumbnail && !isLoading && !error ? (
          <img
            src={thumbnail}
            alt="썸네일 미리보기"
            className="absolute w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            {isLoading ? (
              <>
                <Loader2 className="w-10 h-10 animate-spin" />
                <span className="mt-2 font-semibold">업로드 중...</span>
              </>
            ) : error ? (
              <>
                <XCircle className="w-10 h-10 text-red-500" />
                <span className="mt-2 text-red-500 text-center text-sm px-4">
                  {error}
                </span>
              </>
            ) : (
              <>
                <UploadCloud className="w-10 h-10" />
                <span className="mt-2 font-semibold">썸네일 이미지 업로드</span>
                <span className="text-sm">클릭 또는 드래그 앤 드롭</span>
              </>
            )}
          </div>
        )}
      </label>

      <input
        id="thumbnail-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoading}
      />
    </div>
  );
}
