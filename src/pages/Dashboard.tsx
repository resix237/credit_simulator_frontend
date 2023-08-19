import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useLocalStorage } from '../hooks';
import avatar from "../assets/images/avatar.svg";
import jwt_decode from "jwt-decode";
import { FiPlus } from "react-icons/fi";
import ItemCredit from '../components/dashboard/ItemCredit';
import CallApi from '../utils/callApi';
import { toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';

function Dashboard() {
    const [user, setUser] = useLocalStorage("user", null);
    const [listeCredit, setListeCredit] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    let infoUser: any = null;
    if (user !== null) {
        infoUser = jwt_decode(user?.access)
        console.log(infoUser);
    }
    async function getuserCredit() {

        const response = await CallApi(
            true,
            "credit/credit/",
            'get',
            null,
            null
        );
        if (response.data) {
            setLoading(false)
            setListeCredit(response.data)

        }
        else {
            toast.error(" une erreur est survenu pendantle chargement des credit du credit !!!")
        }
    }
    useEffect(() => {
        getuserCredit();

    }, []);
    return (
        <div className=" h-screen w-screen  bg-[url('../assets/images/dashboard.svg')] bg-no-repeat bg-cover  ">
            <NavBar />
            <div className=' flex w-full pt-40 lg:px-32 px-5'>
                <div className=' lg:basis-1/4 lg:flex'>
                    <div className=' bg-white rounded-md shadow-sm lg:w-5/6 hidden  mb-5  h-60 lg:flex justify-center flex-col place-items-center  '>
                        <img src={avatar} alt="avatar" className=' h-24 w-24 my-5 ' />
                        <p className=' font-ubuntu text-xl font-bold text-violet-light'>
                            Username
                        </p>
                        <p className='font-ubuntu text-xl font-bold text-violet-light'>Username@gmail.com</p>
                    </div>
                </div>
                <div className='lg:flex-grow  flex flex-col w-full '>
                    <a href='/addcredit' className='h-16 w-60 bg-violet-light hover:bg-violet-drk text-white  rounded-md flex justify-between px-8 py-4  mb-10'>
                        <FiPlus size={29} />
                        <h1 className='font-ubuntu font-light text-xl'>
                            Faire un credit
                        </h1>
                    </a>
                    <div className=' w-full bg-white rounded-md'>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead
                                                className="border-b bg-white text-violet-drk font-ubuntu font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                                <tr>
                                                    <th scope="col" className="px-6 py-4">#</th>
                                                    <th scope="col" className="px-6 py-4">Montant credit</th>
                                                    <th scope="col" className="px-6 py-4">Durée credit</th>
                                                    <th scope="col" className="px-6 py-4">Date de debut</th>
                                                    <th scope="col" className="px-6 py-4">Taux d’intérêt </th>
                                                    <th scope="col" className="px-6 py-4">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    listeCredit.length !== 0 ?
                                                        (listeCredit.map((item: any, index: number) => (
                                                            <ItemCredit body={item} index={index + 1} />

                                                        )))
                                                        :
                                                        <div>
                                                            Aucun credit !!!
                                                        </div>
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard;
