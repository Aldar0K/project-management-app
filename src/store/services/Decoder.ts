import { IDecoder } from './UserService';
import jwt_decode from 'jwt-decode';

export const Decoder = (token: string) => {
  let decoded: IDecoder = {
    userId: '',
    login: '',
    iat: null,
  };
  if (token) {
    decoded = jwt_decode(token);
  }

  return decoded.userId;
};
