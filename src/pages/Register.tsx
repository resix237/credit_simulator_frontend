import { useState } from 'react';
import ButtonStarted from '../components/home/ButtonStarted';
import Input from '../components/Input';
import NavBar from '../components/NavBar';
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import logoblack from "../assets/images/logoblack.svg";
import CallApi from '../utils/callApi.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [confirmPassword, setConfirmPassword] = useState<any>("");
    const [first_name, setFirst_name] = useState<any>("");
    const [last_name, setLast_name] = useState<any>("");
    const navigate = useNavigate();



    async function handleRegister() {
        console.log("register encours");

        const data: any = {
            "email": email,
            "password": password,
            "first_name": first_name,
            "last_name": last_name
        }

        const response = await CallApi(
            false,
            "auth/register/",
            'post',
            null,
            data
        );
        if (response.data) {
            toast.success("Enregistrement réussit !!!")
            navigate("/login")
        }
        else {
            toast.error(" une erreur est survenu pendant l'enregistrement !!!")
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
                            id="name"
                            type="text"
                            value={first_name}
                            label="Entrer votre nom, prenom... "
                            icon={<FiUser size={20} />}
                            onChange={(event: any) => {
                                setFirst_name(event.target.value);
                                setLast_name(event.target.value);
                            }}
                        />
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

                        <ButtonStarted height={50} title={"CONTINUER"} handleClick={() => handleRegister()} disable={(email == "") || (password == confirmPassword) || (password == "") || (first_name == "") || (last_name == "") ? true : false} />
                    </div>

                    <p className="pt-16 pb-32 lg:px-16  px-2 text-center font-ubuntu font-light text-md text-zinc-400">
                        Si vous avez déjà un  compte cliquer <a href='/login' className=' underline text-violet-light cursor-pointer'>ici </a>
                    </p>



                </div>

            </div>

        </div>
    )
}

export default Register
