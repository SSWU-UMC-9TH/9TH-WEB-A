import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";

import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { useLoginMutation } from "../hooks/mutations/useLogin";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const { mutate: loginMutate, isPending } = useLoginMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    loginMutate(values);
  };

  const handleGoogleLogin = () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/v1/auth/google/login`;
    console.log("[Google Login] 버튼 클릭 → 이동 시도 URL:", url);
    window.location.href = url;
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  const baseInputStyles =
    "border w-full p-3 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2";
  const errorInputStyles = "border-red-500 focus:ring-red-500";
  const validInputStyles = "border-gray-300 focus:ring-blue-500";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
        <div className="relative flex items-center justify-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 p-1 text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">로그인</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              {...getInputProps("email")}
              className={`${baseInputStyles} ${
                errors?.email && touched?.email
                  ? errorInputStyles
                  : validInputStyles
              }`}
              type="email"
              placeholder="이메일"
              aria-invalid={errors?.email && touched?.email ? "true" : "false"}
            />
            {errors?.email && touched?.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div>
            <input
              {...getInputProps("password")}
              className={`${baseInputStyles} ${
                errors?.password && touched?.password
                  ? errorInputStyles
                  : validInputStyles
              }`}
              type="password"
              placeholder="비밀번호"
              aria-invalid={
                errors?.password && touched?.password ? "true" : "false"
              }
            />
            {errors?.password && touched?.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            disabled={isDisabled || isPending}
            className="w-full flex justify-center items-center bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              "로그인"
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-700 border border-gray-300 py-3 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center gap-4">
            <img
              src="/images/googlelogo.png"
              alt="Google Logo"
              className="w-7 h-7"
            />
            <span>Google 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
