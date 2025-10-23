import { useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T; // 예: { email: '', password: '' }
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>();
  const [errors, setErrors] = useState<Record<string, string>>();

  // 사용자 입력값 변경 시 실행
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, // 불변성 유지 (기존 값 유지)
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
  setTouched(prev => ({ ...prev, [name]: true }));
};


  // 이메일 인풋, 패스워드 인풋, 속성들을 좀 가져오는 것
const getInputProps = (name: keyof T) => {
  const value: T[keyof T] = values[name];

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    handleChange(name, e.target.value);

  const onBlur = () => handleBlur(name);

  return { value, onChange, onBlur }
};

  // values가 변경될 때마다 에러 검증 로직이 실행됨.
  // 예: { email: '' }
  useEffect(() => {
    const newErrors: Record<keyof T, string> = validate(values);
    setErrors(newErrors as unknown as Record<string, string>); // 오류 메시지 업뎃
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;