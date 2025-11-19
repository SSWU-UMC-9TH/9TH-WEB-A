import { X } from "lucide-react";
import { useState } from "react";
import type { CreateLpDto } from "../../types/lp"
import { postLp, uploadImageToServer } from "../../apis/lp";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../App";

type LpModalProps = {
  onClose: () => void;
};

export const AddLpModal = ({ onClose }: LpModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!imageFile) throw new Error("썸네일 이미지를 선택해주세요.");
      const imageUrl = await uploadImageToServer(imageFile);
      console.log("업로드 성공:", imageUrl);

      const lpData: CreateLpDto = {
        title,
        content,
        thumbnail: imageUrl,
        tags,
        published: true,
      };
      console.log("LP 데이터 전송:", lpData);
      await postLp(lpData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      alert("LP 생성 성공!");
      onClose();
    },
    onError: () => {
      alert("LP 생성 실패");
    },
  });

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim()) return alert("내용을 입력해주세요.");
    if (!imageFile) return alert("이미지를 업로드해주세요.");
    mutate();
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#343A40] w-full max-w-md rounded-lg p-6 relative text-white">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          <X size={20} />
        </button>

        {/* LP 이미지 */}
        <div className="flex justify-center mb-4">
          <label className="cursor-pointer hover:opacity-80">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : "/images/LPimage.png"}
              alt="LP"
              width={120}
              height={120}
              className="rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* 입력 필드 */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="LP Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#6C757D] placeholder-gray-400 text-white"
          />
          <input
            type="text"
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 rounded bg-[#6C757D] placeholder-gray-400 text-white"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded bg-[#6C757D] placeholder-gray-400 text-white"
            />
            <button
              className="bg-[#CED4DA] px-4 rounded text-black font-semibold"
              onClick={handleAddTag}
            >
              Add
            </button>
          </div>

          {/* 태그 리스트 */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-[#E9ECEF] px-2 py-1 rounded text-sm text-[#212529]"
              >
                # {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-[#212529] hover:text-[#495057]"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 Add LP 버튼 */}
        <button
          className="mt-6 w-full bg-[#ADB5BD] py-2 rounded text-white font-semibold hover:bg-[#212529] transition-colors"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Add LP"}
        </button>
      </div>
    </div>
  );
};