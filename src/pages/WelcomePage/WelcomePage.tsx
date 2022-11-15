import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t, i18n } = useTranslation();

  const handleLangChange = (event: React.FormEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.currentTarget.value);
  };

  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <select onClick={(e) => handleLangChange(e)}>
        <option value="ru">Ru</option>
        <option value="en">En</option>
      </select>
      <Link to="/login"> login </Link>
    </div>
  );
};

export default WelcomePage;

// код для теста логина и некоторых апиметодов
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAppDispatch, useAppSelector, AuthorizationAPI } from 'store';
// import { Decoder } from 'utils/Decoder';
// import { removeUser, setAllUser } from 'store/slices/UserSlice';
// import { UsersAPI } from 'store/services/UserService';

// const WelcomePage = () => {
//   const { token } = useAppSelector((state) => state.user);
//   const ID = Decoder(token);
//   const [deleteUser] = AuthorizationAPI.useDeleteUserMutation();
//   const { data: dataAll } = UsersAPI.useGetAllUsersQuery();
//   const { data: dataSingle } = UsersAPI.useGetUserByIdQuery(ID.id);
//   const dicpatch = useAppDispatch();

//   const handleDeleteUser = async () => {
//     if (token) {
//       await deleteUser(ID.id).unwrap();
//       dicpatch(removeUser());
//       localStorage.removeItem('token');
//     }
//   };
//   const handleLogoutUser = async () => {
//     if (token) {
//       dicpatch(removeUser());
//       localStorage.removeItem('token');
//     }
//   };

//   // записываем в состояние всех юзеров
//   const handleGetAllUser = async () => {
//     dicpatch(setAllUser(dataAll));
//     console.log(dataSingle);
//   };

//   return (
//     <div>
//       <h1>Welcome page</h1>
//       <button type="submit" className="button" onClick={handleDeleteUser}>
//         Delete user
//       </button>
//       <button type="submit" className="button" onClick={handleLogoutUser}>
//         logout
//       </button>
//       <button type="submit" className="button" onClick={handleGetAllUser}>
//         AllGetUser
//       </button>
//       <Link to="/login"> login </Link>
//     </div>
//   );
// };

// export default WelcomePage;
