import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, userAPI } from 'store';
import jwt_decode from 'jwt-decode';

const tokendec = 'eyJ0eXAiO.../// jwt token';

const MainPage = () => {
  const [deleteUser] = userAPI.useDeleteUserMutation();

  const { id, token } = useAppSelector((state) => state.user);

  const handleDeleteUser = async () => {
    const decoded = jwt_decode(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MzQ3YTZhMi03ZmI2LTRiNTMtOTI1OS1jNGY5NDE1NzgxM2EiLCJsb2dpbiI6ItC00YDQsNC60L7QvSIsImlhdCI6MTY2ODAyNjk0M30.TB0CdExY37k1rS-tIQkCm5PeUfzEkPdGLzVdWNP4uvU'
    );
    console.log(id, token, decoded);
    // await deleteUser(id).unwrap();
  };

  return (
    <div>
      <h1>Welcome</h1>
      <button type="submit" className="button" onClick={handleDeleteUser}>
        Delit user
      </button>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default MainPage;
