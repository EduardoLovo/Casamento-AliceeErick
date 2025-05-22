import React, { useEffect, useState } from 'react';
import '../AdminListas.css';
import { Api } from '../../../services/Api';
import { Loading } from '../../Loading/Loading';

export const MensagensRecebidas = () => {
    const [mensagens, setMensagens] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState('');

    const loadData = async () => {
        try {
            const response = await Api.get(Api.readAllUrl('messages'), true);
            setMensagens(response.data);
            setIsLoading(false);
        } catch (error) {
            setError('Erro ao carregar usuarios. Tente novamente.');
            setIsLoading(false);
            console.error('Erro ao buscar usuario:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(mensagens);

    return (
        <div className="content-listas-admin">
            {isLoading && <Loading />}
            <h1>Mensagens Recebidas</h1>
            {mensagens.map((mensagem, index) => (
                <div key={index} className="cardMensagem">
                    <div>
                        <h2>{mensagem.user.name}</h2>
                        <p>{mensagem.content}</p>
                    </div>
                    <hr />
                </div>
            ))}

            {error && <p>{error}</p>}
        </div>
    );
};
