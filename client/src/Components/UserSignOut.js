import React, { useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { Context } from "../Context";

//Removes the authenticated user and password from the global state
export default function UserSignOut() {

    const context = useContext(Context);

    useEffect( () => {
        context.actions.signOut() 
    });

    return (
       <Navigate to='/' />
    );
}
