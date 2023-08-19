import { useState, useRef, useEffect } from 'react';
import Input from '../components/Input';
import NavBar from '../components/NavBar';
import { FiLock, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import ButtonStarted from '../components/home/ButtonStarted';
import ReactToPrint from 'react-to-print';
import * as ExcelJS from 'exceljs';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useDownloadExcel } from "react-export-table-to-excel";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CallApi from '../utils/callApi';
import { useLocalStorage } from '../hooks';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';
interface LigneAmortissement {
    mois: number;
    mensualite: number;
    paiementInterets: number;
    paiementCapital: number;
    soldeRestant: number;
}

function AddCredit() {
    let { id } = useParams();
    const [date_fincredit, setDate_fincredit] = useState<any>();
    const [montant_emprunte, setMontant_emprunte] = useState<any>();
    const [taux_interet, setTaux_intere] = useState<any>();
    const [duree_credit, setDuree_credit] = useState<any>();
    const [tableauAmortissement, setTableauAmortissement] = useState<LigneAmortissement[]>([]);
    const [tolePay, setTolePay] = useState<number>();
    let componentRef: any = useRef();
    const tableRef: any = useRef(null);
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage("user", null);

    // function for generate 
    function genererTableauAmortissement(
        montantPrincipal: number,
        tauxInteretAnnuel: number,
        dureeCreditMois: number
    ): any[] {
        const tauxInteretMensuel = tauxInteretAnnuel / (12 * 100);
        console.log(montantPrincipal, tauxInteretAnnuel, dureeCreditMois);

        //const mensualite = (montantPrincipal * tauxInteretMensuel) / (1 - Math.pow(1 + tauxInteretMensuel, -tauxInteretMensuel));
        const mensualite = montantPrincipal * (tauxInteretMensuel * (Math.pow((1 + tauxInteretMensuel), dureeCreditMois))) / (Math.pow((tauxInteretMensuel + 1), dureeCreditMois) - 1);

        const tableauAmortissement: LigneAmortissement[] = [];
        let soldeRestant = mensualite * dureeCreditMois;
        let soldeRestantTotal = mensualite * dureeCreditMois;

        for (let mois = 1; mois <= dureeCreditMois; mois++) {
            const paiementInterets = soldeRestant * tauxInteretMensuel;
            const paiementCapital = mensualite - paiementInterets;
            soldeRestant -= paiementCapital;

            tableauAmortissement.push({
                mois,
                mensualite,
                paiementInterets,
                paiementCapital,
                soldeRestant,
            });

        }

        return [tableauAmortissement, soldeRestantTotal];
    }
    // for excel export 

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "TableauDamortissement",
        sheet: "table"
    });

    async function saveCredit() {
        console.log("register encours");

        const data: any = {
            "montant_emprunte": montant_emprunte,
            "taux_interet": taux_interet,
            "duree_credit": duree_credit,
            "date_fincredit": date_fincredit
        }
        const response = await CallApi(
            true,
            "credit/credit/",
            'post',
            null,
            data
        );
        if (response.data) {
            toast.success("Enregistrement du credit réussit !!!")
            navigate("/Dashboard");
        }
        else {
            toast.error(" une erreur est survenu pendant l'enregistrement du credit !!!")
        }

    }
    async function getOneCredit(id: any) {

        const response = await CallApi(
            true,
            "credit/credit/" + id + "/",
            'get',
            null,
            null
        );
        if (response.data) {
            setDate_fincredit(response.data.date_fincredit)
            setMontant_emprunte(response.data.montant_emprunte)
            setTaux_intere(response.data.taux_interet)
            setDuree_credit(response.data.duree_credit)
        }
        else {
            toast.error(" une erreur est survenu pendant l'enregistrement du credit !!!")
        }


    }
    useEffect(() => {
        if (id) {
            getOneCredit(id)
        }
    }, [])
    return (
        <div className=" h-screen w-screen  bg-[url('../assets/images/dashboard.svg')] bg-no-repeat bg-cover  ">
            <NavBar />

            <div className=' w-full lg:pt-40 pt-20 lg:px-32 px-5'>
                <a href='/dashboard'>
                    <FiChevronLeft size={50} className="text-white my-2" />
                </a>
                <div className='w-full lg:flex'>
                    <div className=' lg:basis-1/4 flex h-96 '>
                        <div className=' bg-white rounded-md shadow-sm lg:w-5/6 w-full mb-5 flex justify-center flex-col gap-3  px-2 '>

                            <p className=' font-ubuntu text-xl font-bold text-violet-light text-center '>
                                {id ? "MODIFICATION" : "CREATION"}  CREDIT
                            </p>
                            <Input
                                id="montant"
                                type="number"
                                value={montant_emprunte}
                                label="Saisissez le monytant"

                                onChange={(event: any) => setMontant_emprunte(event.target.value)}
                            />
                            <Input
                                id="taux"
                                type="number"
                                value={taux_interet}
                                label="Saisissez le taux d'intérêt"

                                onChange={(event: any) => setTaux_intere(event.target.value)}
                            />
                            <Input
                                id="duree"
                                type="number"
                                value={duree_credit}
                                label="Saisissez la durée du credit"

                                onChange={(event: any) => setDuree_credit(event.target.value)}
                            />
                            <Input
                                id="date"
                                type="date"
                                value={date_fincredit}
                                label="Saisissez la date de debut de credit"

                                onChange={(event: any) => setDate_fincredit(event.target.value)}
                            />
                            <ButtonStarted
                                title={"générer"}
                                icon={<FiChevronRight size={20} />}
                                disable={false}
                                height={50}
                                handleClick={() => {
                                    const [table, total] = genererTableauAmortissement(montant_emprunte, taux_interet, duree_credit);
                                    setTolePay(total)
                                    setTableauAmortissement(table);
                                }}
                            />

                        </div>
                    </div>
                    <div className='flex-grow flex flex-col  '>

                        <div ref={(re) => (componentRef = re)} className=' w-full bg-white  rounded-md'>
                            <div className=' font-ubuntu text-violet-light text-center w-full py-5'>
                                TABLEAU D'AMORTISSEMENT
                            </div>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead
                                                    className="border-b bg-white text-violet-drk font-ubuntu font-medium dark:border-neutral-500 dark:bg-neutral-600">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4">#</th>
                                                        <th scope="col" className="px-6 py-4">Montant de la mensualité</th>
                                                        <th scope="col" className="px-6 py-4">Part d'intérêts dans la mensualité </th>
                                                        <th scope="col" className="px-6 py-4">Part de capital remboursé dans la mensualité</th>
                                                        <th scope="col" className="px-6 py-4">Capital restant dû après la mensualité</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        tableauAmortissement.length !== 0 ? (
                                                            tableauAmortissement.map((item: LigneAmortissement, index: Number) => (
                                                                <tr className={`border-b ${item.mois % 2 === 0 ? "" : "bg-violet-opci"}  dark:border-neutral-500 dark:bg-neutral-700`}>
                                                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{item?.mois}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{item?.mensualite.toFixed(2)}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{item?.paiementInterets.toFixed(2)}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{item?.paiementCapital.toFixed(2)}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{item?.soldeRestant.toFixed(2)}</td>

                                                                </tr>

                                                            ))
                                                        ) : (
                                                            ""
                                                        )
                                                    }


                                                </tbody>
                                                {
                                                    tableauAmortissement.length !== 0 && (<div className=' tex-center text-md text-vilet-drk flex w-full my-2 mx-2 '>
                                                        <span>Montant Total Dû avec intérêt:</span>  <span className='text-xl font-bold font-ubuntu text-violet-light'>{tolePay?.toFixed(2)} </span>
                                                    </div>)
                                                }
                                            </table>
                                            {
                                                !(tableauAmortissement.length !== 0) && (
                                                    <div className=' w-full text-center text-zinc-400 font-light text-md my-3'>
                                                        Entrer un credit pour avoir un rendu!!!
                                                    </div>)
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            tableauAmortissement.length !== 0 && (<div className='flex gap-4 my-3'>
                                <ReactToPrint
                                    documentTitle={`Tableau-d'amortissement-pour-`}
                                    trigger={() => <button className='p-3 w-60 bg-violet-light rounded-md text-white text-xs hover:bg-violet-drk cursor-pointer text-center'>Exporter  PDF</button>}
                                    content={() => componentRef}
                                />


                                <button onClick={() =>
                                    onDownload()

                                } className='p-3 w-40 bg-violet-light rounded-md text-white text-xs hover:bg-violet-drk cursor-pointer text-center'>Exporter Excel</button>



                                <div onClick={() => saveCredit()} className='p-3 w-40 bg-violet-light rounded-md text-white text-xs hover:bg-violet-drk cursor-pointer text-center'>Sauvegarder</div>
                                <div className='hidden'>
                                    <table ref={tableRef}>
                                        <tbody>
                                            <tr>
                                                <th >#</th>
                                                <th >Montant de la mensualité</th>
                                                <th >Part d'intérêts dans la mensualité </th>
                                                <th >Part de capital remboursé dans la mensualité</th>
                                                <th >Capital restant dû après la mensualité</th>
                                            </tr>

                                            {
                                                tableauAmortissement.length !== 0 ? (
                                                    tableauAmortissement.map((item: LigneAmortissement, index: Number) => (
                                                        <tr >
                                                            <td >{item?.mois}</td>
                                                            <td >{item?.mensualite.toFixed(2)}</td>
                                                            <td >{item?.paiementInterets.toFixed(2)}</td>
                                                            <td >{item?.paiementCapital.toFixed(2)}</td>
                                                            <td >{item?.soldeRestant.toFixed(2)}</td>

                                                        </tr>

                                                    ))
                                                ) : (
                                                    <div>

                                                    </div>
                                                )
                                            }



                                        </tbody>
                                    </table>
                                </div>
                            </div>)
                        }

                    </div>
                </div>

            </div>


        </div>
    )
}

export default AddCredit;
