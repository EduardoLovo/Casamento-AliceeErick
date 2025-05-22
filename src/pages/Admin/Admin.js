import React, { useState } from 'react';
import './Admin.css';
import { ListaDePresentes } from '../../components/Admin/ListaDePresentes/ListaDePresentes';
import { MensagensRecebidas } from '../../components/Admin/MensagensRecebidas/MensagensRecebidas';
import { ListaDeConfirmados } from '../../components/Admin/ListaDeConfirmados/ListaDeConfirmados';

export const Admin = () => {
    const [pagina, setPagina] = useState('');

    if (pagina === 'lista de presentes') {
    }
    return (
        <div className="admin">
            <h1>Admin</h1>
            <div className='linksAdmin'>
                <div>
                    <p onClick={() => setPagina('lista de presentes')}>
                        Lista de Presentes Recebidos
                    </p>
                </div>
                <div>
                    <p onClick={() => setPagina('mensagem recebidas')}>
                        Mensagens Recebidas
                    </p>
                </div>
                <div>
                    <p onClick={() => setPagina('lista de confirmados')}>
                        Lista de Confirmados
                    </p>
                </div>
            </div>
            {pagina === 'lista de presentes' ? (
                <ListaDePresentes />
            ) : pagina === 'mensagem recebidas' ? (
                <MensagensRecebidas />
            ) : pagina === 'lista de confirmados' ? (
                <ListaDeConfirmados />
            ) : (
                ''
            )}
        </div>
    );
};
