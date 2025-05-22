import React, { useEffect } from 'react';
import Login from '../../components/loginRegister/Login/Login';
import Register from '../../components/loginRegister/Register/Register';
import './LoginRegister.css';
import { useNavigate } from 'react-router-dom';

export const LoginRegister = () => {
    const userData = localStorage.getItem('user');

    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            navigate('/home');
        }
    }, [userData, navigate]); // dependências corretas

    return (
        <div>
            <h1 className="titulo-login">Alice e Erick</h1>
            <div className="content-login">
                <Login />
                <Register />
            </div>
        </div>
    );
};
