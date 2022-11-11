export interface IUser {
  name?: string;
  login: string;
  id: string;
  password?: string;
}
export interface IDecoder {
  userId: string;
  login: string;
  iat: number | null;
}
export interface IUserAuthorization {
  name?: string;
  login: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IError {
  data: {
    message: string;
    stack: string;
  };
  status: number;
}
