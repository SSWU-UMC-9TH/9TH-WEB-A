import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { postSignup } from '../apis/auth';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, User } from "lucide-react";

const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다."
    })
    .max(20, {
      message: "비밀번호는 20자 이하여야 합니다."
    }),
  passwordCheck: z
    .string()
    .min(8, {
      message: "비밀번호는 8자 이상이어야 합니다.",
    })
    .max(20, {
      message: "비밀번호는 20자 이하여야 합니다.",
    }),
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요." })
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

   const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormFields>({
    defaultValues: { email: '', password: '', passwordCheck: '', name: '' },
    resolver: zodResolver(schema),
    mode: 'onChange', 
  });

  const fields = ["email", "password", "passwordCheck", "name"] as (keyof FormFields)[];
  
  useEffect(() => {
    const validateStep = async () => {
      const valid = await trigger(fields[step]);
      setIsStepValid(valid);
    };
    validateStep();
    // watch로 입력값이 바뀔 때마다 재검증
    const subscription = watch(() => validateStep());
    return () => subscription.unsubscribe();
  }, [step, trigger, watch]);

  const handleBack = () => {
    if (step > 0) setStep(prev => prev - 1);
    else navigate(-1);
  };

  const handleNext = async () => {
    const valid = await trigger(fields[step]);
    if (valid) setStep(prev => prev + 1);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);
    
    navigate("/");

    console.log("회원가입 성공:", response);
  } catch (error: any) {
    console.error("회원가입 실패:", error);
    alert(error?.response?.data?.message || "회원가입에 실패했습니다.");
  }
  };

  const inputClass = (error?: boolean) =>
    `border w-[300px] p-[10px] rounded-sm transition-colors ${error ? "border-red-500 bg-red-200" : "border-gray-300"}`;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        {/* 헤더 */}
        <div className="relative w-[300px] flex items-center justify-center h-12">
          <button
            onClick={handleBack}
            className="absolute left-0 text-xl pl-4"
          >
            {"<"}
          </button>
          <h1 className="text-xl font-bold text-[#343A40]">회원가입</h1>
        </div>

        {/* 이메일 입력 */}
        {step === 0 && (
          <>
            <input
              {...register("email")}
              className={inputClass(!!errors.email)}
              type="email"
              placeholder="이메일"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </>
        )}

        {/* 비밀번호 입력 */}
        {step === 1 && (
          <>
            <h4 className="text-gray-600">💌 {getValues("email")}</h4>

            {/* 비밀번호 */}
            <div className="relative w-[300px]">
              <input
                {...register("password")}
                className={inputClass(!!errors.password)}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* 비밀번호 확인 */}
            <div className="relative w-[300px]">
              <input
                {...register("passwordCheck")}
                className={inputClass(!!errors.passwordCheck)}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 한 번 더 입력해주세요"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.passwordCheck && (
              <p className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </p>
            )}
          </>
        )}

        {/* Step 2 - 이름 입력 */}
        {step === 2 && (
          <>
            <div className="flex flex-col items-center">
              <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <User size={64} className="text-gray-500" />
              </div>
            </div>
            <input
              {...register("name")}
              className={inputClass(!!errors.name)}
              type="text"
              placeholder="이름"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </>
        )}

        {/* 다음/완료 버튼 */}
        <button
          className="w-full bg-[#343A40] text-white py-2 rounded-md text-lg font-medium 
            hover:bg-[#000] transition-colors cursor-pointer 
            disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="button"
          onClick={step === 2 ? handleSubmit(onSubmit) : handleNext}
          disabled={isSubmitting || !isStepValid}
        >
          {step === 2 ? "완료" : "다음"}
        </button>
      </div>
    </div>
  );
}

export default SignupPage;