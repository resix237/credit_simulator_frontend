import React from 'react';
import logo from "../assets/images/logo.svg";
import ButtonStarted from '../components/home/ButtonStarted';
import NavBar from '../components/NavBar';
import { FiChevronsRight } from "react-icons/fi";
import { useLocalStorage } from '../hooks';
import { useNavigate } from "react-router-dom";

function Home() {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();
    function handleCommencer() {
        if (user === null) {
            navigate("/login");
        }
        else {
            navigate("/dashboard");
        }

    }
    return (
        <div className=" h-screen w-screen  bg-[url('../assets/images/home.svg')] bg-no-repeat bg-cover  ">
            <NavBar />
            <div className=' h-full w-full flex flex-col justify-center place-items-center text-center '>
                <h1 className=' lg:text-[45px] w-1/2 font-ubuntu font-bold text-white' >
                    Bienvenue à bord de notre plateforme de simulation de tableaux d'amortissement de crédit.
                </h1>
                <div className='w-[236px] pt-20 '>
                    <ButtonStarted title={"Commencer"} home={true} height={56} icon={<FiChevronsRight size={20} className="text-white" />} handleClick={() => handleCommencer()} />
                </div>

                <p className=' w-5/6 text-white font-ubuntu font-light pt-24 '>

                    L'application permet la simulation détaillée d'un tableau d'amortissement pour un crédit à la consommation. Elle calcule et affiche avec précision les mensualités, intérêts et solde restant dû sur toute la durée. Cette fonction offre une vision claire des paiements, aidant à comprendre les implications financières du prêt. Les utilisateurs peuvent ainsi prendre des décisions éclairées, en ayant une vue globale des coûts et remboursements mensuels attendus.

                </p>

            </div>

        </div>
    )
}

export default Home;
