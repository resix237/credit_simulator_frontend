import React from 'react';

function ButtonStarted({ title, icon, handleClick, height, fontSize, disable, home }: any) {
    return (
        <div onClick={(disable === false) || home ? handleClick : null} className={` w-full h-[${height}px] ${(disable === false) || home ? " bg-violet-light hover:bg-violet-drk cursor-pointer " : " bg-gray-400"} text-white transition-all duration-300  rounded-md flex ${icon ? "justify-between px-8 " : "justify-center"} place-items-center text-center text-xl font-ubuntu font-bold `}>
            <p> {title}</p><>{icon}</>
        </div>
    )
}

export default ButtonStarted;
