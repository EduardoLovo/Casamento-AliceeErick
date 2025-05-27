import React, { useEffect, useState } from 'react';
import { Api } from '../../services/Api';
import { Loading } from '../Loading/Loading';
import './Loja.css';
import { Link } from 'react-router-dom';

export const Loja = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState('');

    const loadData = async () => {
        try {
            const response = await Api.get(Api.readAllUrl('product'), true);
            setProducts(response.data);
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

    return (
        <div className="content-loja">
            {isLoading && <Loading />}
            <h2>Lista de Presentes</h2>
            <div className="list-product">
                {products.map((product, index) => (
                    <div key={index} className="card-product">
                        <img src={product.image} alt="imagem do produto" />
                        <p>{product.name}</p>
                        <p className="preco">R$ {product.price.toFixed(2)}</p>
                        <Link to="/carrinho" state={{ product }}>
                            <button>Comprar</button>
                        </Link>
                    </div>
                ))}
            </div>
            {error && <p>{error}</p>}
        </div>
    );
};
