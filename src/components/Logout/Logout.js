import React from 'react';
import { useNavigate } from 'react-router-dom';
import { JwtHandler } from '../../services/jwt_handler';
import './Logout.css';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        JwtHandler.clearJwt(); // Remove o token JWT
        navigate('/'); // Redireciona para a página de login
        window.location.reload();
        localStorage.clear();
    };

    return (
        <div>
            <button className="botaoSair" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
