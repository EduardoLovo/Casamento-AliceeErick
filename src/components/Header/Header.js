import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import LogoutButton from '../Logout/Logout';

export const Header = ({ onLojaClick, onConfirmarClick }) => {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    return (
        <div className="content-cabecalho">
            <div className="cabecalho">
                {user.role === 'admin' ? (
                    <Link to="/admin">
                        <button>Admin</button>
                    </Link>
                ) : (
                    ''
                )}
                <button onClick={onLojaClick}>
                    <p>Lista de Presentes</p>
                </button>
                <div className="botoes-direita">
                    <button
                        onClick={onConfirmarClick}
                        className="link-cabecalho"
                    >
                        Confirmar Presença
                    </button>
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};
