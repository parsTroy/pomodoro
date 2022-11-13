import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6 w-100 h-10 flex items-center justify-around">
      <div>
        <Link to="/">
          <h1 className="text-2xl">Pomo_Task</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <p className="mr-4">{user ? `Welcome, ${user.displayName}` : ''}</p>
        <Link to="/login">
          {user?.displayName ? (
            <button
              onClick={handleSignOut}
              className="bg-[#6D9886] w-32 rounded-md p-3 ml-2"
            >
              Logout
            </button>
          ) : (
            <button className="bg-[#6D9886] w-32 rounded-md p-3 ml-2">
              Login
            </button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
