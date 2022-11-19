export interface UserResponse {
  _id: string;
  email: string;
  message: string;
}

export interface UserRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  image: string;
  name: string;
  // isCoinbaseAuthorized: boolean;
}
