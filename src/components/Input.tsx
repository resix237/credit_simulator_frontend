import React from 'react';
interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
    icon?: any;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type, icon }) => {
    return (
        <div className='relative border rounded-md'>
            <input
                id={id}
                onChange={onChange}
                value={value}
                type={type}
                className='
                         block
                         pl-12
                         pr-6
                         pt-5
                         w-full
                         font-light
                         text-md bg-white rounded-md
                        text-black appearance-none focus:outline-none focus:ring-0 peer

                        '
                placeholder=''

            />
            <label htmlFor={id}
                className={` absolute
                            text-md
                          text-zinc-400
                            duration-150
                            transform
                            scale-75
                            top-2
                            z-10
                            ${value !== "" ? " -translate-y-2 font-light" : "translate-y-2"}
                            origin-[0]
                            left-6
                            peer-placeholder-shown:scale-100
                            peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75
                            peer-focus:font-light
                            peer-focus:-translate-y-2 flex
                             `}
            >
                <span className='mr-3 mt-1 '>{icon}</span> {label}
            </label>

        </div>

    )
}

export default Input;
