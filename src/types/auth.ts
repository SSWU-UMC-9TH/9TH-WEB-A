export type CommonResponse<T> = {
  // success, code, message 등 팀 규약에 맞게 조정 가능
  message?: string;
  data: T;
};

// Signup
// 요청 DTO
export type RequestSignupDto = {
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  password: string;
};

// 응답 DTO
export type ResponseSignupDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

// Signin
// 요청 DTO
export type RequestSigninDto = {
  email: string;
  password: string;
};

// 응답 DTO
export type ResponseSigninDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// Me
export type ResponseMyInfoDto = CommonResponse<{
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;
