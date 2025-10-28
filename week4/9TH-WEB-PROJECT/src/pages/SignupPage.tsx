import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ResponseSignupDto } from "../types/auth";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

const onSubmit: SubmitHandler<FormFields> = async (data) => {
  const { passwordCheck, ...rest } = data;
  const response: ResponseSignupDto = await postSignup(rest);
  console.log(response);
  navigate("/");
};

  const values = watch();
  const isDisabled =
    isSubmitting ||
    Object.values(values).some((v) => v === "") ||
    Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 transition"
      >
        <ArrowLeft size={24} strokeWidth={2} />
      </button>

      <div className="w-[350px] flex flex-col items-center justify-center gap-5">
        <h1 className="text-2xl font-bold mb-2">회원가입</h1>

        <div className="w-full flex flex-col gap-3">
          <input
            {...register("email")}
            className={`border w-full p-[12px] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 bg-red-100 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            type="email"
            placeholder="이메일"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            className={`border w-full p-[12px] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 bg-red-100 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            type="password"
            placeholder="비밀번호"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            {...register("passwordCheck")}
            className={`border w-full p-[12px] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.passwordCheck
                ? "border-red-500 bg-red-100 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            type="password"
            placeholder="비밀번호 확인"
          />
          {errors.passwordCheck && (
            <p className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</p>
          )}

          <input
            {...register("name")}
            className={`border w-full p-[12px] rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 bg-red-100 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
            type="text"
            placeholder="이름"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <button
            disabled={isDisabled}
            type="button"
            onClick={handleSubmit(onSubmit)}
            className={`w-full py-3 rounded-md text-lg font-medium transition-colors ${
              isDisabled
                ? "bg-gray-300 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;