import { useEffect, useState } from "react";
import type { RequestUserDto, ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { uploadImageToServer } from "../apis/lp";
import useUpdateUserInfo from "../hooks/mutations/useUpdateUserInfo";

const MyPage = () => {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const { mutate: updateUserMutate, isPending } = useUpdateUserInfo();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
        setName(response.data.name);
        setBio(response.data.bio ?? "");
        setPreviewImage(response.data.avatar ?? "/default-profile.png");
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    };
    getData();
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = async () => {
    let imageUrl = data?.data.avatar;

    if (profileImage) {
      imageUrl = await uploadImageToServer(profileImage);
    }

    const userData: RequestUserDto = { name, bio, avatar: imageUrl ?? null };

    updateUserMutate(userData, {
      onSuccess: async () => {
        alert("정보가 성공적으로 수정되었습니다.");
        setIsEditing(false);
        try {
          const updated = await getMyInfo();
          setData(updated);
          setPreviewImage(updated.data.avatar ?? "/default-profile.png");
        } catch (error) {
          console.error("업데이트 후 사용자 정보 가져오기 실패:", error);
        }
      },
      onError: (err) => {
        console.error("유저 정보 수정 실패:", err);
        alert("수정 중 오류가 발생했습니다.");
      },
    });
  };

  const buttonBase =
    "px-5 py-2 rounded-lg font-semibold transition text-sm disabled:opacity-60";
  const saveBtn = "bg-black text-[#FF1493] hover:bg-[#ff66cc]";
  const cancelBtn = "bg-[#FF1493] text-black hover:bg-[#ff99cc]";
  const logoutBtn = "bg-black text-[#FF1493] hover:bg-[#ff66cc]";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-[#121212] rounded-2xl shadow-lg p-8 mt-10 text-white">
        {!isEditing ? (
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-[#FF1493]">
              <img
                src={previewImage || "/default-profile.png"}
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold">{data?.data?.name}</h2>
            <p className="mt-2 text-center whitespace-pre-wrap text-gray-300">
              {data?.data?.bio}
            </p>
            <button
              className={`${buttonBase} ${saveBtn} mt-5`}
              onClick={() => setIsEditing(true)}
            >
              프로필 수정
            </button>
          </div>
        ) : (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div>
              <label className="block font-semibold mb-1">이름</label>
              <input
                className="w-full p-3 rounded-lg bg-black text-[#FF1493] border border-[#FF1493] focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">소개</label>
              <textarea
                className="w-full p-3 rounded-lg resize-none h-24 bg-black text-[#FF1493] border border-[#FF1493] focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">프로필 이미지</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-[#FF1493] file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:font-semibold file:bg-[#FF1493] file:text-black hover:file:bg-[#ff66cc]"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setProfileImage(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              {previewImage && (
                <div className="mt-2 w-28 h-28 rounded-full overflow-hidden border-4 border-[#FF1493]">
                  <img
                    src={previewImage}
                    alt="미리보기"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className={`${buttonBase} ${saveBtn}`}
                disabled={isPending}
              >
                저장
              </button>
              <button
                type="button"
                className={`${buttonBase} ${cancelBtn}`}
                onClick={() => setIsEditing(false)}
              >
                취소
              </button>
            </div>
          </form>
        )}
      </div>

      <button
        className={`${buttonBase} ${logoutBtn} mt-6 w-full max-w-md py-3 text-lg`}
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
