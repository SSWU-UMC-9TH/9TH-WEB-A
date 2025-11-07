import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError(null);

    try {
      await login(values);
    } catch (error: any) {
      console.error("로그인 실패", error);
      setLoginError(error?.message || "로그인에 실패했습니다.");
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

      <div className="w-[350px] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-5">로그인</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div>
            <input
              {...getInputProps("email")}
              type="email"
              placeholder="이메일"
              autoComplete="email"
              className={`border w-full p-[12px] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors?.email && touched?.email
                  ? "border-red-500 bg-red-100 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            {errors?.email && touched?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                {...getInputProps("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                autoComplete="current-password"
                className={`border w-full p-[12px] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 pr-10 ${
                  errors?.password && touched?.password
                    ? "border-red-500 bg-red-100 focus:ring-red-300"
                    : "border-gray-300 focus:ring-blue-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors?.password && touched?.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {loginError && (
            <p className="text-red-500 text-sm text-center w-full">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            className={`w-full py-3 rounded-md text-lg font-medium transition-colors mt-2 ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;