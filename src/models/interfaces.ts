export interface IUser {
  name?: string;
  login?: string;
  _id?: string;
  password?: string;
}
export interface IUserUpdate {
  id: string;
  body: IUser;
}

export interface IInitialState {
  name: string;
  login: string;
  token: string;
  id: string;
  password?: string;
  allUsers?: IUser[];
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
  // _id?: string;
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IBoardData {
  title: string;
  owner: string;
  users: string[];
}

export interface IBoardParams {
  body: { title: string; owner: string; users: string[] };
  id: string;
}

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface IColumnParams {
  boardId: string;
  columnId: string;
  body: { title: string; order: number };
}

// export interface IColumnResponse {
//   title: string;
//   order: number;
//   boardId: string;
// }

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

export interface ITaskParams {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    users: string[];
  };
}
