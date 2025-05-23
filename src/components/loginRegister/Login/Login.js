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
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // Verificação de login automático
    useEffect(() => {
        const isLogged = JwtHandler.isJwtValid();
        if (isLogged) {
            navigate('/');
        }
    }, [navigate]);

    // Função para carregar o script do reCAPTCHA
    const loadReCaptchaScript = () => {
        return new Promise((resolve, reject) => {
            if (window.grecaptcha) {
                resolve();
                return;
            }
            const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
            if (!siteKey) {
                reject(
                    new Error('REACT_APP_RECAPTCHA_SITE_KEY não está definido')
                );
                return;
            }
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = () =>
                reject(new Error('Falha ao carregar script do reCAPTCHA'));
            document.body.appendChild(script);
        });
    };

    // Carrega o script ao montar o componente
    useEffect(() => {
        loadReCaptchaScript().catch((err) => {
            console.error(err);
            setError('Erro ao carregar reCAPTCHA');
        });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Garante que o script do reCAPTCHA esteja carregado
            await loadReCaptchaScript();

            const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
            if (!window.grecaptcha || !siteKey) {
                throw new Error('reCAPTCHA não disponível');
            }

            // Executa o reCAPTCHA para obter o token fresco
            const recaptchaToken = await window.grecaptcha.execute(siteKey, {
                action: 'login',
            });

            // Envia o login para o backend junto com o token do reCAPTCHA
            const response = await Api.post(Api.loginUrl(), {
                email,
                password,
                recaptchaToken,
            });

            JwtHandler.setJwt(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/home');
            window.location.reload();
        } catch (error) {
            console.error('Erro no login:', error);
            setError('Credenciais inválidas ou erro no reCAPTCHA.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
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
