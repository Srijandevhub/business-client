import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils/urls";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${backendUrl}/protected`);
            } catch (error) {
                navigate("/login");
            }
        }
        fetchData();
    }, [navigate]);
    return (
        <>
        { children }
        </>
    );
}

export default ProtectedRoute;