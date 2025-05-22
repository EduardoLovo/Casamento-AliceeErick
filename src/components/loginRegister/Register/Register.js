import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JwtHandler } from '../../../services/jwt_handler';
import { Api } from '../../../services/Api';
import { Loading } from '../../Loading/Loading';

const Register = () => {
    const isLogged = JwtHandler.isJwtValid();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const navigate = useNavigate();

    useEffect(() => {
        const isLogged = JwtHandler.isJwtValid();
        if (isLogged) {
            navigate('/');
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Faz a requisição de login
            const response = await Api.post(Api.registerUrl(), {
                name,
                email,
                password,
            });

            // Armazena o token JWT no localStorage
            JwtHandler.setJwt(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Redireciona para a página protegida
            navigate('/home');
            window.location.reload();
            // console.log('login efetuado');
            setIsLoading(false);
        } catch (error) {
            setError(
                'Erro ao registrar. Verifique os dados ou tente outro email.'
            );
            console.error('Erro no login:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="">
            {isLoading && <Loading />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <form onSubmit={handleRegister} className="formulario-login">
                    <h1>Registro</h1>
                    <label>Nome completo:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
