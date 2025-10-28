// src/pages/LoginPage.tsx
import { postSignin } from "../apis/auth.ts";
import useForm from "../hooks/useForm.ts";
import type { UserSigninInformation } from "../utils/validate.ts";
import { validateSignin } from "../utils/validate.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts"
import { LOCAL_STORAGE_KEY } from "../constants/key.ts"

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log(response);
    } catch (error: unknown) {
      // 에러 안전 처리
      const msg = error instanceof Error ? error.message : "로그인에 실패했습니다.";
      alert(msg);
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors ?? {}).some((error) => (error ?? "").length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          type="email"
          placeholder="이메일"
          className={`w-[300px] p-[10px] rounded-sm focus:border-[#807bff] border
            ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          type="password"
          placeholder="비밀번호"
          className={`w-[300px] p-[10px] rounded-sm focus:border-[#807bff] border
            ${
              errors?.password && touched?.password
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;