import React, { useEffect, useState } from 'react';
import './AdminListas.css';
import { Api } from '../../services/Api';
import { Loading } from '../Loading/Loading';

export const ListAllConfirmeds = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const loadData = async () => {
        try {
            const response = await Api.get(
                Api.listAllConfirmedsUrl('companions')
            );
            setUsuarios(response.data);
            setIsLoading(false);
        } catch (error) {
            setError('Erro ao carregar usuários. Tente novamente.');
            setIsLoading(false);
            console.error('Erro ao buscar usuários:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="content-listas-admin">
            {isLoading && <Loading />}
            <h1>Lista de Confirmados</h1>
            {usuarios.map((usuario, index) => (
                <div key={index}>
                    {usuario.presence && (
                        <ul className="cardMensagem">
                            <li>
                                <strong>{usuario.name}</strong>
                                <strong> - Whatsapp: {usuario.fone}</strong>
                                {usuario.companions &&
                                    usuario.companions.length > 0 && (
                                        <ul>
                                            {usuario.companions.map(
                                                (companion, idx) => (
                                                    <li key={idx}>
                                                        {companion.name}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}
                            </li>
                            <hr />
                        </ul>
                    )}
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
    );
};
