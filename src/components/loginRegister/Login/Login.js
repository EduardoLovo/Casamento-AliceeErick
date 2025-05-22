import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JwtHandler } from '../../../services/jwt_handler';
import { Api } from '../../../services/Api';
import { Loading } from '../../Loading/Loading';
import '../Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

    const navigate = useNavigate();

    // Mova a verificação para dentro de um useEffect
    useEffect(() => {
        const isLogged = JwtHandler.isJwtValid();
        if (isLogged) {
            navigate('/');
        }
    }, [navigate]); // Adicione navigate como dependência

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Faz a requisição de login
            const response = await Api.post(Api.loginUrl(), {
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
            setError('Credenciais inválidas. Tente novamente.');
            console.error('Erro no login:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="">
            {isLoading && <Loading />}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleLogin} className="formulario-login">
                <h1>Login</h1>
                <label>Email:</label>
                <input
                    type="text"
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
    );
};

export default Login;
