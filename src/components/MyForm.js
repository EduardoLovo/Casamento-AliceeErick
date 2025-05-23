// components/MyForm.jsx
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const MyForm = () => {
    const recaptchaRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await recaptchaRef.current.executeAsync();
            recaptchaRef.current.reset();

            // Enviar o token para o backend
            const response = await axios.post('/api/verify-recaptcha', {
                token,
            });

            if (response.data.success) {
                alert('reCAPTCHA validado com sucesso!');
                // Prosseguir com o envio do formulário
            } else {
                alert('Falha na verificação do reCAPTCHA');
            }
        } catch (error) {
            console.error('Erro ao verificar reCAPTCHA:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Meu Formulário</h2>
            {/* outros inputs aqui */}

            <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // ou process.env.REACT_APP_... para CRA
                size="invisible"
                ref={recaptchaRef}
            />
            <button type="submit">Enviar</button>
        </form>
    );
};

export default MyForm;
