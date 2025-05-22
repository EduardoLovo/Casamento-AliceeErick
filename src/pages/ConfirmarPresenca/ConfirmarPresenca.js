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

    const confirmarPresenca = async (e) => {
        e.preventDefault();

        if (!user) {
            setStatus('Usuário não encontrado.');
            return;
        }

        const newPresence = !user.presence;

        try {
            // Atualiza a presença do usuário
            await Api.patch(
                Api.updateUrl('users', user.id),
                { presence: newPresence, fone: fone },
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

            <div className="btnPresenca">
                <div className="whats-confirmar">
                    <label>Telefone whatsapp</label>
                    <input onChange={(e) => setFone(e.target.value)} />
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
                <button type="button" onClick={confirmarPresenca}>
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
            </div>

            <form onSubmit={handleSubmit}>
                <label>Deixe sua mensagem de carinho:</label>
                <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    rows="5"
                    cols="40"
                    placeholder="Digite aqui sua mensagem para os noivos..."
                ></textarea>

                <button type="submit">Enviar</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};
