// src/pages/SignupPage.tsx
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";

// 🔐 스키마 (메시지는 스샷처럼 한글로)
const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "8자 이상이어야 합니다." })
    .max(20, { message: "20자 이하여야 합니다." }),
    
    passwordCheck: z
    .string()
    .min(8, { message: "8자 이상이어야 합니다." })
    .max(20, { message: "20자 이하여야 합니다." }),
  
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
})

.refine((data) => data.password === data.passwordCheck,
{message: "비밀번호가 일치하지 않습니다.",
    path:['passwordCheck']
} );

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
  });

  const onSubmit : SubmitHandler<FormFields> = async(data) => {

    const {passwordCheck, ...rest} = data;

    const response = await postSignup(rest);

    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">

        <input
            {...register('email')}
            
            name="email"
          type="email"
          placeholder="이메일"
          className={`w-[300px] p-[10px] rounded-sm focus:border-[#807bff] border
            ${
              errors?.email
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
        />
        {errors.email && (
            <div className={"text-red-500 text-sm"}>{errors.email.message}</div>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="비밀번호"
          className={`w-[300px] p-[10px] rounded-sm focus:border-[#807bff] border
            ${
              errors?.password
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
        />
        {errors.password && (
            <div className={"text-red-500 text-sm"}>{errors.password.message}</div>
        )}

        <input
          {...register("passwordCheck")}
          type="password"
          placeholder="비밀번호 확인"
          className={`w-[300px] p-[10px] rounded-sm focus:border-[#807bff] border
            ${
              errors?.passwordCheck
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
        />
        {errors.passwordCheck && (
            <div className={"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>
        )}

        <input
          {...register("name")}
          type="text"
          placeholder="이름"
          className={`w-[300px] p-[10px] rounded-sm focus:border-[#807bff] border
            ${
              errors?.name
                ? "border-red-500 bg-red-200"
                : "border-[#ccc]"
            }`}
        />
        {errors.name && (
            <div className={"text-red-500 text-sm"}>{errors.name.message}</div>
        )}

        <button 
        disabled = {isSubmitting}
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
            회원가입
        </button>

      </div>
    </div>
  );
};

export default SignupPage;
