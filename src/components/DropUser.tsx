import { useEffect } from 'react';
import {
    Dropdown,
    Ripple,
    initTE,
} from "tw-elements";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useLocalStorage } from '../hooks';
import { useNavigate } from "react-router-dom";



function DropUser({ nameUser }: any) {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();
    function logout() {
        setUser(null);
        navigate("/login")

    }
    useEffect(() => {
        initTE({ Dropdown, Ripple });
    }, []);
    return (
        <div className="relative" data-te-dropdown-ref>
            <a
                className="flex items-center whitespace-nowrap rounded bg-violet-light px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-violet-drk hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-violet-light focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-violet-light active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                href="#"
                type="button"
                id="dropdownMenuButton2"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
                data-te-ripple-init
                data-te-ripple-color="light">
                <FiUser size={20} className="text-white mx-1" /> {nameUser}
                <span className="ml-2 w-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </a>
            <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuButton2"
                data-te-dropdown-menu-ref>
                <li onClick={() => logout()}>
                    <p
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 cursor-pointer text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"

                        data-te-dropdown-item-ref
                    >logout</p>
                </li>
                {/* <li>
                    <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                        href="#"
                        data-te-dropdown-item-ref
                    >Another action</a>
                </li>
                <li>
                    <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                        href="#"
                        data-te-dropdown-item-ref
                    >Something else here</a>
                </li> */}
            </ul>
        </div>
    )
}

export default DropUser;
