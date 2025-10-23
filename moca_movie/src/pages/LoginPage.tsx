import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      console.log("response:", response);
    } catch (error) {
      alert(error?.message || "Unknown error");
    }
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
      </div>
    </div>
  );
}

export default LoginPage;