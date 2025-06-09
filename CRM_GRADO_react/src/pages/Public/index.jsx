import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function Public() {
    return <Navigate to="/login" />
    return (
        <React.Fragment>
            <Outlet/>
        </React.Fragment>
    );
}

export default Public;