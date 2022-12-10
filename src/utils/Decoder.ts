import jwt_decode from 'jwt-decode';
import { IDecoder } from 'models';

export const Decoder = (token: string) => {
  let decoded: IDecoder = {
    id: '',
    login: '',
    iat: null,
  };
  if (token) {
    decoded = jwt_decode(token);
  }

  return decoded;
};
