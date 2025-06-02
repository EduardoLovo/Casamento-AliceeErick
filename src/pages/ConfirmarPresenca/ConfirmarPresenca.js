import React, { useState } from 'react';
import './ConfirmarPresenca.css';
import { Api } from '../../services/Api';

export const ConfirmarPresenca = () => {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    const [mensagem, setMensagem] = useState('');
    const [status, setStatus] = useState('');
    const [companions, setCompanions] = useState([]);
    const [fone, setFone] = useState('');
    const [matrix, setMatrix] = useState(null);
    const [error, setError] = useState('');

    const confirmarPresenca = async (e) => {
        e.preventDefault();

        const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/;

        if (!user) {
            setStatus('Usuário não encontrado.');
            return;
        }
        if (!telefoneRegex.test(fone)) {
            alert('Por favor, insira um número de telefone válido com DDD.');
            return;
        }

        if (matrix === null) {
            setError('Por favor, selecione uma opção.');
            return;
        }
        setError('');
        const newPresence = !user.presence;

        try {
            // Atualiza a presença do usuário
            await Api.patch(
                Api.updateUrl('users', user.id),
                { presence: newPresence, fone: fone, matrix: matrix },
                true
            );

            // Filtra os nomes dos convidados válidos
            const validCompanions = companions
                .map((name) => name.trim())
                .filter((name) => name !== '');

            // Se houver convidados válidos, envia todos de uma vez
            if (validCompanions.length > 0) {
                const companionsData = validCompanions.map((name) => ({
                    name,
                }));
                await Api.post(
                    Api.addUrl('companions'),
                    { userId: user.id, companions: companionsData },
                    true
                );
            }

            // Atualiza o localStorage com a nova presença
            const updatedUser = { ...user, presence: newPresence };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Define a mensagem de status
            setStatus(
                newPresence
                    ? validCompanions.length > 0
                        ? 'Presença confirmada e convidados adicionados! 🎉'
                        : 'Presença confirmada!'
                    : 'Confirmação cancelada!'
            );

            // Limpa os campos de convidados
            setCompanions([]);

            // Recarrega a página para refletir as mudanças
            window.location.reload();
        } catch (error) {
            console.error(error);
            setStatus('Erro ao atualizar presença ou adicionar convidados.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mensagem.trim()) {
            setStatus('Por favor, escreva uma mensagem.');
            return;
        }

        try {
            await Api.post(
                Api.readAllUrl('messages'),
                { content: mensagem, userId: user.id },
                true
            );

            setStatus('Mensagem enviada com sucesso! 💌');
            setMensagem('');
        } catch (error) {
            setStatus('Erro ao enviar mensagem.');
        }
    };

    const handleAddCompanion = (e) => {
        e.preventDefault();
        setCompanions([...companions, '']); // adiciona novo input vazio
    };

    const handleCompanionChange = (index, value) => {
        const updated = [...companions];
        updated[index] = value;
        setCompanions(updated);
    };

    return (
        <div className="content-confirmar-presenca">
            <div className="titulo-confirmar-presenca">
                <p>Olá</p>
                <p className="nome-do-usuario">{user.name},</p>
                <p>confirme sua presença</p>
            </div>

            <form onSubmit={confirmarPresenca} className="btnPresenca">
                <div className="whats-confirmar">
                    <label>Telefone whatsapp</label>
                    <input
                        type="tel"
                        required
                        pattern="^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$"
                        value={fone}
                        onChange={(e) => setFone(e.target.value)}
                        placeholder="(99) 99999-9999"
                    />
                </div>
                <p>Adicine seus acompanhantes antes de confirmar</p>
                <button onClick={handleAddCompanion}>
                    + Adicionar acompanhante{' '}
                </button>

                {companions.length > 0 && (
                    <div className="companions">
                        <h4>Acompanhantes:</h4>
                        {companions.map((name, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Nome completo ${index + 1}`}
                                value={name}
                                onChange={(e) =>
                                    handleCompanionChange(index, e.target.value)
                                }
                            />
                        ))}
                    </div>
                )}

                <div>
                    <label>Você irá se hospedar no hotel Matrix?</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="matrix"
                                value="true"
                                checked={matrix === true}
                                onChange={() => setMatrix(true)}
                            />
                            Sim
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="matrix"
                                value="false"
                                checked={matrix === false}
                                onChange={() => setMatrix(false)}
                            />
                            Não
                        </label>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <button type="submit">
                    {user.presence ? 'Cancelar confirmação' : 'Confirmar'}
                </button>

                {user.presence && (
                    <div>
                        <img
                            src="static/confirmado.png"
                            alt="imagem de confirmação"
                        />
                        <p>Você confirmou presença</p>
                    </div>
                )}
            </form>

            <form onSubmit={handleSubmit}>
                <label>Deixe sua mensagem de carinho:</label>
                <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    rows="5"
                    cols="40"
                    placeholder="Digite aqui sua mensagem para os noivos..."
                ></textarea>

                <button type="submit">Enviar mensagem</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};
