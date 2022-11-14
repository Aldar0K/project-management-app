import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, AuthorizationAPI } from 'store';
import { Decoder } from 'utils/Decoder';
import { removeUser } from 'store/slices/UserSlice';
import { UsersAPI } from 'store/services/UserService';

const WelcomePage = () => {
  // временно для логина
  const [deleteUser] = AuthorizationAPI.useDeleteUserMutation();
  const { data } = UsersAPI.useGetAllUsersQuery();
  const { token } = useAppSelector((state) => state.user);
  const dicpatch = useAppDispatch();
  const handleDeleteUser = async () => {
    if (token) {
      const ID = Decoder(token);
      await deleteUser(ID.userId).unwrap();
      dicpatch(removeUser());
      localStorage.removeItem('token');
    }
  };
  const handleLogoutUser = async () => {
    if (token) {
      dicpatch(removeUser());
      localStorage.removeItem('token');
    }
  };
  const handleGetAllUser = async () => {
    console.log(data);
  };
  // временно для логина и апи

  return (
    <div>
      <h1>Welcome page</h1>
      <button type="submit" className="button" onClick={handleDeleteUser}>
        Delete user
      </button>
      <button type="submit" className="button" onClick={handleLogoutUser}>
        logout
      </button>
      <button type="submit" className="button" onClick={handleGetAllUser}>
        AllGetUser
      </button>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default WelcomePage;
