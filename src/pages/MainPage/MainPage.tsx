import React from 'react';
import { Link } from 'react-router-dom';
import { IDecoder, useAppSelector, userAPI } from 'store';
import jwt_decode from 'jwt-decode';
import { Decoder } from 'store/services/Decoder';

const tokendec = 'eyJ0eXAiO.../// jwt token';

const MainPage = () => {
  const [deleteUser] = userAPI.useDeleteUserMutation();
  const { token } = useAppSelector((state) => state.user);

  const handleDeleteUser = async () => {
    const ID = Decoder(token);
    await deleteUser(ID).unwrap();
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button type="submit" className="button" onClick={handleDeleteUser}>
        Delete user
      </button>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default MainPage;
