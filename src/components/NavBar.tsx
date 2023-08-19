import { useEffect, useState } from 'react';
import {
    Collapse,
    Dropdown,
    initTE,
} from "tw-elements";
import logo from "../assets/images/logo.svg";
import logoblack from "../assets/images/logoblack.svg";
import { useLocalStorage } from '../hooks';
import jwt_decode from "jwt-decode";
import DropUser from './DropUser';



function NavBar() {
    const [user, setUser] = useLocalStorage("user", null);
    let infoUser: any = null;
    if (user !== null) {
        infoUser = jwt_decode(user?.access)
        console.log(infoUser);
    }



    useEffect(() => {

        initTE({ Collapse, Dropdown });

    }, [])
    return (

        <nav
            className=" top-0 fixed flex-no-wrap  flex w-full items-center justify-between bg-[#FBFBFB] lg:bg-opacity-0 py-2 lg:px-20 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4 z-50"
            data-te-navbar-ref>
            <div className="flex w-full flex-wrap items-center justify-between px-3">

                <button
                    className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                    type="button"
                    data-te-collapse-init
                    data-te-target="#navbarSupportedContent1"
                    aria-controls="navbarSupportedContent1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">

                    <span className="[&>svg]:w-7">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-7 w-7">
                            <path
                                fill-rule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clip-rule="evenodd" />
                        </svg>
                    </span>
                </button>


                <div
                    className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto lg:justify-between"
                    id="navbarSupportedContent1"
                    data-te-collapse-item>

                    <a
                        className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                        href="/">
                        <img
                            src={logo}
                            className=" h-10 lg:h-14"
                            alt="Logo"
                            loading="lazy" />
                    </a>
                    <div className="relative lg:flex items-center gap-4 lg:text-white text-violet-cr px-3 lg:px-0 font-roboto font-light tracking-widest ">
                        {
                            (infoUser === null) ? (
                                <>
                                    <h4 className='lg:my-0 my-2'>
                                        <a href="/">
                                            S’inscrire   /
                                        </a>

                                    </h4>
                                    <h4 className='lg:my-0  my-2'>
                                        <a href="/login">
                                            Se connecter
                                        </a>

                                    </h4>
                                </>
                            ) :
                                <DropUser nameUser={infoUser?.first_name} />
                        }

                    </div>
                </div>
                <div className=" block lg:hidden">
                    <a
                        className=" flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                        href="/">
                        <img
                            src={logoblack}
                            className=" h-10 lg:h-14  "
                            alt="Logo"
                            loading="lazy" />
                    </a>
                </div>



            </div>
        </nav>
    );
}

export default NavBar
