import React, { useEffect, useState } from 'react';
import '../AdminListas.css';
import { Api } from '../../../services/Api';
import { Loading } from '../../Loading/Loading';

export const ListaDeConfirmados = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const loadData = async () => {
        try {
            const response = await Api.get(Api.readAllUrl('companions'), true);
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
                <div key={index} className="cardMensagem">
                    {usuario.presence && (
                        <div>
                            <ul>
                                <li>
                                    <h2>{usuario.name}</h2>
                                    <strong>Whatsapp: {usuario.fone}</strong>
                                    {usuario.matrix ? (
                                        <strong>
                                            {' '}
                                            - Hotel Matrix ✅ {usuario.matrix}
                                        </strong>
                                    ) : (
                                        ''
                                    )}
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
                            </ul>
                            <hr />
                        </div>
                    )}
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
    );
};
