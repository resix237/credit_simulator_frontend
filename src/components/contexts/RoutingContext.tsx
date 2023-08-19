
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks";


export const IsAuthenticated = () => {
    const [user, setUser] = useLocalStorage("user", null)
    return (
        <>
            {user === null ? <Navigate to="/login" /> : <Outlet />}
        </>
    )
}