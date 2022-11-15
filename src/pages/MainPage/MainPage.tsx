import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Boards page</h1>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default MainPage;
