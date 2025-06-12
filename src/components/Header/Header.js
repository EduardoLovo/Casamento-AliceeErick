import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import LogoutButton from '../Logout/Logout';

export const Header = () => {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    return (
        <div className="cabecalho">
            {user?.role === 'admin' && (
                <Link to="/admin">
                    <button>Admin</button>
                </Link>
            )}
            <Link to="/home">
                <button>Pagina Inicial</button>
            </Link>
            <Link to="/lista-de-presentes">
                <button>Lista de Presentes</button>
            </Link>
            <Link to="/cerimonia">
                <button>Cerimônia</button>
            </Link>
            <Link to="/confirmar-presenca">
                <button>Confirmar Presença</button>
            </Link>
            {user?.presence === true && (
                <Link to="/manual-do-convidado">
                    <button>Manual do Convidado</button>
                </Link>
            )}
            <LogoutButton />
        </div>
    );
};
