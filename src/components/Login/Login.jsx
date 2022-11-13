import React from 'react';

const Login = () => {
    return (
        <div className="flex text-center align-center justify-center">
            <div className="mt-24 w-[450px] h-[400px] rounded-md align-center justify-center bg-[#6D9886]">
                <div className="mt-12">
                    <form>
                        <legend className="mb-12 text-xl font-bold">
                            Login or Create an Account
                        </legend>
                        <label htmlFor="username" className="mr-4">
                            Username
                        </label>
                        <input
                            className="mb-6 p-2 rounded-md text-[#393e46]"
                            type="text"
                            name="username"
                        />
                        <br></br>
                        <label className="mr-4" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="mb-6 p-2 rounded-md text-[#393e46]"
                            type="password"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
