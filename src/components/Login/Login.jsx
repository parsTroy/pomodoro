import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/pomo-task');
    }
  }, [user]);

  return (
    <div className="flex text-center align-center justify-center">
      <div className="mt-24 w-[450px] h-[400px] rounded-md align-center justify-center bg-[#6D9886]">
        <div className="flex h-[400px] align-center justify-center items-center">
          <h1 className="absolute top-60 text-xl font-bold">
            Sign-in to Track Your Tasks
          </h1>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Login;
