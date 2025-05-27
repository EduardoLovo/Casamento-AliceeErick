import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Checkout.css';
import { Api } from '../../services/Api';

export const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [status, setStatus] = useState('');
    const [pix, setPix] = useState(false);
    const [codigoCopiado, setCodigoCopiado] = useState('');

    const location = useLocation();
    const { product } = location.state || {};

    const comprarProduto = async (e) => {
        e.preventDefault();

        if (!paymentMethod) {
            setStatus('escolha uma forma de pagamento');
        } else {
            setPix(true);
            try {
                await Api.post(
                    Api.addUrl('checkout'),
                    { productId: product.id, paymentMethod: paymentMethod }, // 🔥 Passa o productId no body
                    true // se esse argumento é para usar Authorization, mantenha
                );

                setIsConfirmed(true);
            } catch (error) {
                console.error('Erro ao realizar compra:', error);
                alert('Erro ao realizar a compra.');
            }
        }
    };

    const codepixRef = useRef(null);

    const copyToClipboard = () => {
        const text = codepixRef.current?.innerText;
        if (text) {
            navigator.clipboard
                .writeText(text)
                .then(() => setCodigoCopiado('Código copiado!'))
                .catch((err) => alert('Erro ao copiar: ' + err));
        }
    };

    return (
        <div className="checkout-container">
            <h2>Finalizar Compra</h2>

            {/* Resumo do Pedido */}
            <div className="order-summary">
                <p>Produto: {product?.name}</p>
                <p>Total: R$ {product?.price?.toFixed(2)}</p>
            </div>

            {/* Forma de Pagamento */}
            <form onSubmit={comprarProduto}>
                <h3>Escolha a forma de pagamento:</h3>

                <label>
                    <input
                        type="radio"
                        value="pix"
                        checked={paymentMethod === 'pix'}
                        onChange={() => setPaymentMethod('pix')}
                    />
                    Pix
                </label>

                {/* <label>
                    <input
                        type="radio"
                        value="cartao"
                        checked={paymentMethod === 'cartao'}
                        onChange={() => setPaymentMethod('cartao')}
                    />
                    Cartão de Crédito
                </label> */}
                <button type="submit">Confirmar Compra</button>
            </form>

            {pix ? (
                <div>
                    <p>QrCode:</p>
                    <img src={product?.qrcode} alt="qrcode" />
                    <p>Copia e cola:</p>
                    <p ref={codepixRef}>{product?.codepix}</p>
                    <button onClick={copyToClipboard}>Copiar</button>
                    {codigoCopiado && <p>{codigoCopiado}</p>}
                </div>
            ) : (
                ''
            )}

            {isConfirmed && <p>Compra confirmada com {paymentMethod}!</p>}
            {status && <p>{status}</p>}
        </div>
    );
};
