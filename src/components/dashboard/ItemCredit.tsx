import React, { useEffect, useState } from "react";
import { MdClose, MdModeEdit, MdDelete } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";
import Modal from "react-modal";
import CallApi from '../../utils/callApi';
import { toast } from 'react-toastify';
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
function ItemCredit({ body, index }: any) {
    const [modalIsOpenD, setIsOpenD] = React.useState(false);
    let subtitle: any = {
        style: {
            color: "#f00",
        }
    };
    function afterOpenModal() {

    }
    function closeModalD() {
        setIsOpenD(false);
    }
    function openModalD() {
        setIsOpenD(true);
    }
    async function deleteD() {
        const response = await CallApi(
            true,
            "credit/credit/" + body.id + "/",
            'delete',
            null,
            null
        );
        if (response.data) {

            toast.success("  supression du credit réussit !!!")
        }
        else {
            toast.error(" une erreur est survenu pendantla supression du credit!!!")
        }
    };
    return (
        <>
            <tr
                className={`border-b ${(index) % 2 === 0 ? "" : "bg-violet-opci"}  dark:border-neutral-500 dark:bg-neutral-700`}>
                <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
                <td className="whitespace-nowrap px-6 py-4">{body.montant_emprunte}</td>
                <td className="whitespace-nowrap px-6 py-4">{body.duree_credit} Mois</td>
                <td className="whitespace-nowrap px-6 py-4">{body.date_fincredit}</td>
                <td className="whitespace-nowrap px-6 py-4">{body.taux_interet}%</td>
                <td className=" px-3 py-4 flex gap-1">
                    <a href={`/addcredit/${body.id}`}>

                        <MdModeEdit
                            size={20}
                            className=" text-blue-500  hover:text-blue-700 cursor-pointer"
                        />
                    </a>
                    <div onClick={openModalD}>
                        <MdDelete size={20} className="text-red-600  hover:text-red-900 cursor-pointer" />
                    </div>


                </td>
            </tr>

            <Modal
                isOpen={modalIsOpenD}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModalD}
                style={customStyles}
                shouldCloseOnOverlayClick={false}
                contentLabel="Example Modal"
            >
                <div className="w-96">
                    <div className="flex w-full justify-between px-3">
                        <h1 className="text-xl font-bold ">
                            Suppression Credit
                        </h1>
                        <button onClick={closeModalD}>
                            <MdClose size={30} />
                        </button>
                    </div>
                    <form onSubmit={() => deleteD()} className="mt-10 mx-3">
                        <div className="text-center ">
                            Voulez-vous vraiment supprimer ce credit ?
                        </div>
                        <button className="h-10 my-5 w-3/4 mx-auto rounded-md bg-red-500 text-xl font-bold text-white flex justify-center place-items-center">
                            <h1>Supprimer</h1>
                        </button>
                    </form>
                </div>
            </Modal>

        </>

    )
}

export default ItemCredit;
