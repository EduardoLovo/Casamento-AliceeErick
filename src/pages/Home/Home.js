import React from 'react';
import './Home.css';

export const Home = () => {
    return (
        <div className="content-home">
            <img
                src="static/teste.jpg"
                alt="imagem casal"
                className="imagem-principal"
            />
            <div className="titulo-casal">
                <h1>Alice e Erick</h1>
            </div>
            <div>
                <h2>Nossa história </h2>
                <p>
                    Nos conhecemos em junho de 2015, quando uma amiga resolveu
                    brincar de cupido e mostrou nossos perfis um para o outro no
                    Facebook. A gente não se falou antes, foi tudo marcado para
                    nós. O encontro aconteceu em uma noite de caldos, com mais
                    dois casais. Logo de cara nos demos bem, a conversa foi leve
                    e natural, mas nada aconteceu naquele dia. Durante o jantar,
                    comentaram que no dia seguinte teria uma costela de chão no
                    CTG, e lá fomos nós, todos do jantar e mais algumas pessoas.
                    E foi nesse dia que ficamos pela primeira vez e, desde
                    então, seguimos juntos. O namoro começou no mês seguinte e
                    agora já são quase 10 anos de união. O casamento sempre foi
                    um sonho que dividimos. Muito antes de qualquer pedido
                    oficial ou data marcada, a gente já falava sobre como seria
                    o nosso grande dia. E agora ele está chegando. Estamos muito
                    felizes em compartilhar esse momento especial com vocês. Vai
                    ser incrível celebrar com nossos amigos e familiares.
                    Confirme sua presença, ela é muito importante para nós. Logo
                    abaixo está a nossa lista de presentes. Ter você com a gente
                    já é o maior presente, mas, se quiser e puder, sua lembrança
                    vai nos ajudar muito no início dessa nova fase juntos. 💛
                </p>
            </div>
        </div>
    );
};
