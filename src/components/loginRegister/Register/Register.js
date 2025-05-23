import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JwtHandler } from '../../../services/jwt_handler';
import { Api } from '../../../services/Api';
import { Loading } from '../../Loading/Loading';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const isLogged = JwtHandler.isJwtValid();
        if (isLogged) {
            navigate('/');
        }
    }, [navigate]);

    // Carrega o script do reCAPTCHA v3 e obtém o token
    useEffect(() => {
        const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

        const loadReCaptcha = () => {
            if (!window.grecaptcha) {
                setError('Erro ao carregar reCAPTCHA');
                return;
            }

            window.grecaptcha.ready(() => {
                window.grecaptcha
                    .execute(siteKey, { action: 'register' })
                    .then((token) => {
                        setRecaptchaToken(token);
                        setError('');
                    })
                    .catch(() => {
                        setError('Erro ao validar reCAPTCHA');
                    });
            });
        };

        if (window.grecaptcha) {
            loadReCaptcha();
        } else {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
            script.async = true;
            script.defer = true;
            script.onload = loadReCaptcha;
            script.onerror = () => {
                setError('Falha ao carregar reCAPTCHA');
            };
            document.body.appendChild(script);
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!recaptchaToken) {
            setError('Erro ao validar reCAPTCHA. Tente novamente.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await Api.post(Api.registerUrl(), {
                name,
                email,
                password,
                recaptchaToken, // envia token para o backend
            });

            JwtHandler.setJwt(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/home');
            window.location.reload();
        } catch (error) {
            setError(
                'Erro ao registrar. Verifique os dados ou tente outro email.'
            );
            console.error('Erro no registro:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <Loading />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
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

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
