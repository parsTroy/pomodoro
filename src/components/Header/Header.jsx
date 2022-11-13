import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="mt-6 w-[100vw] h-10 flex items-center justify-around">
            <div>
                <Link to="/">
                    <h1 className="text-2xl">Task_City</h1>
                </Link>
            </div>
            <div className="">
                <Link to="/login">
                    <button className="bg-[#6D9886] w-32 rounded-md p-3 ml-2">
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Header;
