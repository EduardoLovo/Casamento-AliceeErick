import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Carrinho.css';
// import '../Checkout/Checkout.css';
import { Api } from '../../services/Api';
import Modal from './Modal';

export const Carrinho = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [status, setStatus] = useState('');
    const [pix, setPix] = useState(false);
    const [codigoCopiado, setCodigoCopiado] = useState('');
    const [modalAberto, setModalAberto] = useState(false);

    const [nomeCartao, setNomeCartao] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');

    const [bandeira, setBandeira] = useState('');
    const [parcelas, setParcelas] = useState(1);

    const location = useLocation();
    const { product } = location.state || {};

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
    const abrirModal = (e) => {
        e.preventDefault();
        if (!paymentMethod) {
            setStatus('Escolha uma forma de pagamento');
            return;
        }
        setModalAberto(true);
    };

    const confirmarCompra = async (e) => {
        setPix(true); // ativa a troca de conteúdo

        e.preventDefault();

        if (!paymentMethod) {
            setStatus('escolha uma forma de pagamento');
        } else {
            try {
                await Api.post(
                    Api.addUrl('checkout'),
                    { productId: product.id, paymentMethod: paymentMethod }, // 🔥 Passa o productId no body
                    true // se esse argumento é para usar Authorization, mantenha
                );

                console.log('Compra realizada');
            } catch (error) {
                console.error('Erro ao realizar compra:', error);
                alert('Erro ao realizar a compra.');
            }
        }
    };

    const handleCartaoSubmit = async (e) => {
        e.preventDefault();

        // Separar mês e ano da validade (ex: "05/26")
        const [mes, ano] = validade.split('/');

        console.log(mes, ano);

        const dadosCartao = {
            cardNumber: numeroCartao,
            expirationMonth: mes,
            expirationYear: '20' + ano,
            securityCode: cvv,
            cardholderName: nomeCartao,
        };

        const payload = {
            productId: product?.id,
            paymentMethod: 'credit_card',
            dadosCartao: dadosCartao,
            generateToken: true,
            installments: parcelas, // Número de parcelas desejado
        };

        console.log();

        try {
            await Api.post(Api.checkoutUrl(), payload, true);

            alert('Pagamento realizado com sucesso!');
            setModalAberto(false);
        } catch (error) {
            console.error(error);

            const msg =
                error?.response?.data?.message ||
                'Erro ao processar o pagamento';
            alert(`Erro: ${msg}`);
        }
    };

    const handleChange = (e) => {
        let input = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

        // Limita a 4 caracteres
        if (input.length > 4) {
            input = input.substring(0, 4);
        }

        // Adiciona a barra após 2 dígitos
        if (input.length > 2) {
            input = input.substring(0, 2) + '/' + input.substring(2);
        }

        setValidade(input);
    };

    return (
        <div className="checkout-container">
            <h2>Carrrinho</h2>

            {/* Resumo do Pedido */}
            <div className="order-summary">
                <p>Produto: {product?.name}</p>
                <p>Total: R$ {product?.price?.toFixed(2)}</p>
            </div>

            {/* Forma de Pagamento */}
            <form onSubmit={abrirModal}>
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
                {product?.id !== '680fdc46fb29fd1d390b0a7c' && (
                    <label>
                        <input
                            type="radio"
                            value="cartao"
                            checked={paymentMethod === 'cartao'}
                            onChange={() => setPaymentMethod('cartao')}
                        />
                        Cartão de Credito
                    </label>
                )}

                <button type="submit">Confirmar Compra</button>
            </form>

            {modalAberto && (
                <Modal onClose={() => setModalAberto(false)}>
                    {paymentMethod === 'pix' ? (
                        !pix ? (
                            <div>
                                <h3>Deseja confirmar a compra?</h3>
                                <p>Produto: {product?.name}</p>
                                <p>Preço: R$ {product?.price?.toFixed(2)}</p>
                                <p>Pagamento: {paymentMethod}</p>
                                <p>Confirme para gerar o código</p>
                                <button
                                    className="confirmarbtn"
                                    onClick={confirmarCompra}
                                >
                                    Confirmar
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p>QR Code:</p>
                                <img
                                    className="imagemDoModal"
                                    src={product?.qrcode}
                                    alt="qrcode"
                                />
                                <p>Copia e cola:</p>
                                <p ref={codepixRef}>{product?.codepix}</p>
                                <button onClick={copyToClipboard}>
                                    Copiar
                                </button>
                                {codigoCopiado && <p>{codigoCopiado}</p>}
                            </div>
                        )
                    ) : (
                        <form onSubmit={handleCartaoSubmit}>
                            <h3>Informações do Cartão</h3>

                            <label>
                                Nome no Cartão:
                                <input
                                    type="text"
                                    value={nomeCartao}
                                    onChange={(e) =>
                                        setNomeCartao(e.target.value)
                                    }
                                    required
                                />
                            </label>

                            <label>
                                Número do Cartão:
                                <input
                                    type="text"
                                    value={numeroCartao}
                                    onChange={(e) =>
                                        setNumeroCartao(e.target.value)
                                    }
                                    required
                                    inputMode="numeric"
                                />
                            </label>

                            <label>
                                Validade (MM/AA):
                                <input
                                    value={validade}
                                    onChange={handleChange}
                                    placeholder="MM/AA"
                                    maxLength="5" // MM/AA = 5 caracteres (incluindo a barra)
                                    required
                                    className="inputmask"
                                />
                            </label>
                            <label>
                                CVV:
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    required
                                    inputMode="numeric"
                                />
                            </label>

                            <label>
                                Bandeira:
                                <select
                                    value={bandeira}
                                    onChange={(e) =>
                                        setBandeira(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Selecione</option>
                                    <option value="visa">Visa</option>
                                    <option value="mastercard">
                                        MasterCard
                                    </option>
                                    <option value="elo">Elo</option>
                                </select>
                            </label>

                            <label>
                                Parcelas:
                                <select
                                    value={parcelas}
                                    onChange={(e) =>
                                        setParcelas(Number(e.target.value))
                                    }
                                    required
                                >
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}x
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <button type="submit">Finalizar Compra</button>
                        </form>
                    )}
                </Modal>
            )}

            {/* {isConfirmed && <p>Compra confirmada com {paymentMethod}!</p>} */}
            {status && <p>{status}</p>}
        </div>
    );
};
