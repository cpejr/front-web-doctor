import React, { useState } from 'react';
import {
    BotaoGenerico,
    CarrosselContainer,
    Centro,
    Direita,
    Esquerda,
    InteriorCarrossel
} from './Styles';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import Patinho from "../../assets/patinho.jpg"
import Patao from "../../assets/patao.jpg"
import PatoBravo from "../../assets/patobravo.jpg"

const imagens = [
    { title: "imagemPatinho", img: Patinho },
    { title: "imagempatao", img: Patao },
    { title: "imagemPatoBravo", img: PatoBravo },
];

function CarrosselEditarHome() {

    const [imgAtual, setImgAtual] = useState(0);

    return (
        <CarrosselContainer>
            <InteriorCarrossel
                style={{ backgroundImage: `url(${imagens[imgAtual].img})` }}
            >
                <Esquerda
                    onClick={() => {
                        imgAtual > 0 && setImgAtual(imgAtual - 1);
                    }}
                >
                    <LeftOutlined style={{ fontSize: 30 }} />
                </Esquerda>
                <Centro>
                    <BotaoGenerico>Alterar Imagens</BotaoGenerico>
                </Centro>
                <Direita
                    onClick={() => {
                        imgAtual < imagens.length - 1 && setImgAtual(imgAtual + 1);
                    }}
                >
                    <RightOutlined style={{ fontSize: 30 }} />
                </Direita>
            </InteriorCarrossel>
        </CarrosselContainer>
    );
}

export default CarrosselEditarHome;