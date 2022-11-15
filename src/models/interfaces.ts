export interface IUser {
  name?: string;
  login: string;
  id: string;
  password?: string;
}

export interface IInitialState {
  name: string;
  token: string;
  id: string;
  password?: string;
  allUser?: IUser[];
}

export interface IDecoder {
  id: string;
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

// Boards
export interface IBoard {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}
