import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useLoginMutation } from "../hooks/mutations/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
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
  
  const handleSubmit = async () => {
    loginMutate(values);
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API + "/v1/auth/google/login";
  }

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative w-[300px] flex items-center justify-center h-12">
          <button onClick={() => navigate(-1)} className="absolute left-0 text-xl pl-4">{"<"}</button>
          <h1 className="text-xl bold font-bold">로그인</h1>
        </div>
        <input
          {...getInputProps("email")}
          className={`border w-[300px] p-[10px] focus:border-[#5F7317] rounded-sm placeholder-[#C7C7C7] ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"email"}
          placeholder={"email"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          className={`border w-[300px] p-[10px] focus:border-[#324001] rounded-sm placeholder-[#C7C7C7] ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"password"}
          placeholder={"password"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className='w-full bg-[#343A40] text-white py-2 rounded-md text-lg font-medium hover:bg-[#000] transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
        >
          로그인
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className='w-full bg-[#343A40] text-white py-2 rounded-md text-lg font-medium hover:bg-[#000] transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed'
        >
          <div className="flex items-center justify-center gap-4">
            <img src={"/images/googlelogo.svg"} alt="Google Logo Image" className="w-7 h-7" />
            <span>Google 로그인</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default LoginPage;