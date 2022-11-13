import React from 'react'

const Header = () => {
    return (
        <div className="mt-6 w-[100vw] h-10 flex items-center justify-around">
            <div>
                <h1 className="text-2xl">Pomodation</h1>
            </div>
            <div className="">
                <button className="bg-[#6D9886] w-32 rounded-md p-3 mr-2">
                    Dark Mode
                </button>
                <button className="bg-[#6D9886] w-32 rounded-md p-3 ml-2">
                    Login
                </button>
            </div>
        </div>
    )
}

export default Header
