import { X } from "lucide-react";
import { useState } from "react";
import type { CreateLpDto } from "../../types/lp";
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

  const uploadLp = async () => {
    if (!imageFile) throw new Error("썸네일 이미지를 선택해주세요.");
    const imageUrl = await uploadImageToServer(imageFile);
    const lpData: CreateLpDto = {
      title,
      content,
      thumbnail: imageUrl,
      tags,
      published: true,
    };

    return postLp(lpData);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: uploadLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      onClose();
    },
    onError: (error: any) => {
      alert(error?.message || "LP 생성 실패");
    },
  });

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    mutate();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#FF1493] w-full max-w-md rounded-xl p-6 relative text-white shadow-2xl border-4 border-black">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-black transition"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-5">
          <label className="cursor-pointer hover:opacity-90 transition">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : "/images/LPimage.png"
              }
              alt="LP"
              width={120}
              height={120}
              className="rounded-lg border-2 border-black shadow-md"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && setImageFile(e.target.files[0])
              }
              className="hidden"
            />
          </label>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="LP Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black placeholder-[#FF1493] text-[#FF1493] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            placeholder="LP Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 rounded bg-black placeholder-[#FF1493] text-[#FF1493] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded bg-black placeholder-[#FF1493] text-[#FF1493] focus:outline-none focus:ring-2 focus:ring-black"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
            />
            <button
              type="button"
              className="bg-black px-4 rounded text-[#FF1493] font-semibold hover:bg-[#000000aa] transition"
              onClick={handleAddTag}
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-black/60 px-3 py-1 rounded-full text-sm text-[#FF1493] font-semibold shadow-inner"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-[#FF1493] hover:text-black transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full bg-black py-2 rounded text-[#FF1493] font-bold hover:bg-[#000000cc] transition-colors disabled:opacity-60 shadow-md"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Add LP"}
        </button>
      </div>
    </div>
  );
};
