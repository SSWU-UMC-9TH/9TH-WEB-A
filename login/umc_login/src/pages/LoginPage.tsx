import useForm from '../hooks/useForm';
import type { UserSigninInformation } from '../utils/validate';
import { validateSignin } from '../utils/validate';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: '',
        password: '',
      },
      validate: validateSignin,
    });

  const handleSubmit = () => {
    console.log('폼 제출:', values);
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error?.length > 0) ||
    Object.values(values).some((value) => value === '');

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute top-10 left-4
        w-10 h-10
        flex items-center justify-center
        bg-white rounded-full shadow-md
        text-blue-600 text-lg font-bold
        hover:bg-blue-50 hover:scale-110 transition"
      >
        &lt;
      </button>

      <div className="flex flex-col gap-3">
        <input
          {...getInputProps('email')}
          name="email"
          type="email"
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
            errors.email && touched?.email
              ? 'border-red-500 bg-red-200'
              : 'border-gray-300'
          }`}
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps('password')}
          name="password"
          type="password"
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff] ${
            errors.password && touched?.password
              ? 'border-red-500 bg-red-200'
              : 'border-gray-300'
          }`}
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
