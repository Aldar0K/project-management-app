import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, userAPI } from 'store';
import { Decoder } from 'utils/Decoder';
import { removeUser } from 'store/slices/UserSlice';

const MainPage = () => {
  const [deleteUser] = userAPI.useDeleteUserMutation();
  const { token } = useAppSelector((state) => state.user);
  const dicpatch = useAppDispatch();
  const handleDeleteUser = async () => {
    if (token) {
      const ID = Decoder(token);
      await deleteUser(ID).unwrap();
      dicpatch(removeUser());
    }
  };
  const handleLogoutUser = async () => {
    if (token) {
      dicpatch(removeUser());
    }
  };
  return (
    <div>
      <h1>Welcome</h1>
      <button type="submit" className="button" onClick={handleDeleteUser}>
        Delete user
      </button>
      <button type="submit" className="button" onClick={handleLogoutUser}>
        logout
      </button>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default MainPage;
