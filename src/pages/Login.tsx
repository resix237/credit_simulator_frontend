import { useState } from 'react';
import ButtonStarted from '../components/home/ButtonStarted';
import Input from '../components/Input';
import NavBar from '../components/NavBar';
import { FiMail, FiLock } from "react-icons/fi";
import logoblack from "../assets/images/logoblack.svg";
import CallApi from '../utils/callApi.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from '../hooks';

function Login() {
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    async function handleLogin() {
        console.log("register encours");

        const data: any = {
            "email": email,
            "password": password,
        }
        const response = await CallApi(
            false,
            "auth/login/",
            'post',
            null,
            data
        );
        if (response.data) {
            toast.success("Login réussit !!!")
            setUser(response.data);
            navigate("/Dashboard");
        }
        else {
            toast.error(" une erreur est survenu pendant le login !!!")
        }
    }

    return (
        <div className=" h-screen w-screen  bg-[url('../assets/images/home.svg')] bg-no-repeat bg-cover  ">

            <div className=' h-full w-full flex flex-col justify-center place-items-center text-center '>
                <div className=' bg-white rounded-md shadow-md md:w-5/6  w-11/12 lg:w-1/3'>
                    <h1 className=' font-roboto text-2xl font-bold py-10 text-violet-drk flex flex-col justify-center place-items-center text-center'>
                        <a
                            className="mb-3 text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 "
                            href="/">
                            <img
                                src={logoblack}
                                className=" h-16"
                                alt="Logo"
                                loading="lazy" />
                        </a>
                        Se connecter
                    </h1>
                    <div className=" lg:px-16  px-2 pt-10 flex flex-col gap-7 ">
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            label="Saisissez votre adresse e-mail"
                            icon={<FiMail size={20} />}
                            onChange={(event: any) => setEmail(event.target.value)}
                        />
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            label="Saisissez votre mot de password"
                            icon={<FiLock size={20} />}
                            onChange={(event: any) => setPassword(event.target.value)}
                        />
                        <ButtonStarted height={50} title={"CONTINUER"} handleClick={() => handleLogin()} disable={(email == "") || (password == "") ? true : false} />
                    </div>

                    <p className="pt-16 pb-32 lg:px-16  px-2 text-center font-ubuntu font-light text-md text-zinc-400">
                        Si vous n’avez pas de compte cliquer <a href='/register' className=' underline text-violet-light cursor-pointer'>ici </a>
                    </p>



                </div>

            </div>

        </div>
    )
}

export default Login;
