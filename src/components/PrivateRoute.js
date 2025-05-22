import React from 'react';
import { Navigate } from 'react-router-dom';
import { JwtHandler } from '../services/jwt_handler';

const PrivateRoute = ({ children, redirectTo }) => {
    const isAuthenticated = JwtHandler.isJwtValid(); // Verifica se o token é válido

    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
