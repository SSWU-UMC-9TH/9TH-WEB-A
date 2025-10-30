import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { ArrowLeft } from "lucide-react";
import { postSignin } from "../apis/auth";
import type { ResponseSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const navigate = useNavigate();
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
    const response: ResponseSigninDto = await postSignin(values);
    setItem(response.data.accessToken);
    console.log(response);
  } catch (error: any) {
    alert(error?.message);
  }
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition"
      >
        <ArrowLeft size={24} strokeWidth={2} />
      </button>

      <div className="w-[350px] flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold mb-2">로그인</h1>

        <div className="w-full flex flex-col gap-3">
          <input
            {...getInputProps("email")}
            className={`border w-full p-[12px] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors?.email && touched?.email
                ? "border-red-500 bg-red-100 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            type="email"
            placeholder="이메일"
          />
          {errors?.email && touched?.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <div className="relative">
            <input
              {...getInputProps("password")}
              className={`border w-full p-[12px] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 pr-10 ${
                errors?.password && touched?.password
                  ? "border-red-500 bg-red-100 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
              type="password"
              placeholder="비밀번호"
            />
          </div>

          {errors?.password && touched?.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`w-full py-3 rounded-md text-lg font-medium transition-colors ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;