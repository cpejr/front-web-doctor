import React, { useState, useEffect } from "react";
import {
    BotaoGenerico,
    CarrosselContainer,
    Centro,
    Direita,
    Esquerda,
    InteriorCarrossel
} from './Styles';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Button from '../../styles/Button';
import { Cores } from '../../variaveis';

import * as managerService from "../../services/ManagerService/managerService";

import Patinho from "../../assets/patinho.jpg"
import Patao from "../../assets/patao.jpg"
import PatoBravo from "../../assets/patobravo.jpg"

function CarrosselEditarHome() {

    const [imgAtual, setImgAtual] = useState(0);
    const [imgCarrossel, setImgCarrossel] = useState('');

    async function setandoImagemCarrossel (){
        const res = await managerService.GetImagensCarrossel();
        const requests = res.map(({ imagem }) =>
          managerService.GetArquivoPorChave(imagem)
        
        );
        const responses = await Promise.all(requests);
        setImgCarrossel(responses);
        console.log(res.imagem);
    }
    
    useEffect(()=>{
        setandoImagemCarrossel();
    },[])

    const imagens = [
        { img: imgCarrossel[0] },
        { img: imgCarrossel[1] },
        { img: imgCarrossel[2] },
    ];
    console.log(imgCarrossel);

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
                    <Button
                        backgroundColor="green"
                        borderRadius="3px"
                        borderWidth="1px"
                        borderColor={Cores.preto}
                        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                        color={Cores.preto}
                        fontSize="15px"
                        height="50px"
                        width="60%"
                        marginTop="0%"
                        marginLeft="0%"
                        fontSizeMedia950="0.9em"
                    >
                        Alterar Imagens
                    </Button>
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