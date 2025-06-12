import React, { useEffect, useState } from 'react';
import '../AdminListas.css';
import { Api } from '../../../services/Api';
import { Loading } from '../../Loading/Loading';

export const ListaDePresentes = () => {
    const [vendas, setVendas] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState('');

    const loadData = async () => {
        try {
            const response = await Api.get(Api.readAllUrl('purchases'), true);
            setVendas(response.data);
            setIsLoading(false);
        } catch (error) {
            setError('Erro ao carregar produtos. Tente novamente.');
            setIsLoading(false);
            console.error('Erro ao buscar produto:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(vendas, 'ola');

    return (
        <div className="content-listas-admin">
            {isLoading && <Loading />}
            <h1>Lista de Presentes</h1>
            {vendas.map((product, index) => (
                <div key={index} className="cardMensagem">
                    <div>
                        <h2>{product.user.name}</h2>
                        <p>{product.product.name}</p>
                        <p>R$ {product.product.price}</p>
                    </div>
                    <hr />
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
    );
};
