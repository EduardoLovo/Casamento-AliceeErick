import React, { useRef } from 'react';
import './Home.css';
import { Loja } from '../../components/Loja/Loja';
import { ConfirmarPresenca } from '../ConfirmarPresenca/ConfirmarPresenca';
import { Header } from '../../components/Header/Header';

export const Home = () => {
    const lojaRef = useRef(null);
    const confirmarPresencaRef = useRef(null);
    return (
        <div className="content-home">
            <Header
                onLojaClick={() =>
                    lojaRef.current.scrollIntoView({ behavior: 'smooth' })
                }
                onConfirmarClick={() =>
                    confirmarPresencaRef.current.scrollIntoView({
                        behavior: 'smooth',
                    })
                }
            />
            <img
                src="static/teste.jpg"
                alt="imagem casal"
                className="imagem-principal"
            />
            <div className="titulo-casal">
                <h1>Alice e Erick</h1>
            </div>
            <div ref={lojaRef}>
                <Loja />
            </div>
            <div ref={confirmarPresencaRef}>
                <ConfirmarPresenca />
            </div>
        </div>
    );
};
