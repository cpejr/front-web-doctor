import React, { useState, useEffect } from "react";
import {
    CarrosselContainer,
    Centro,
    Direita,
    Esquerda,
    InteriorCarrossel,
    CaixaCarregando,
    CaixaUpload,
} from "./Styles";
import {
    LeftOutlined,
    RightOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import { Cores } from "../../variaveis";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import * as managerService from "../../services/ManagerService/managerService";
import { Spin, Upload } from 'antd';

function CarrosselEditarHome(props) {
    const [imgAtual, setImgAtual] = useState(0);
    const [imgCarrossel, setImgCarrossel] = useState("");
    const [carregandoImg, setCarregandoImg] = useState(false);
    const history = useHistory();

    const antIcon = (
        <LoadingOutlined style={{ fontSize: 50, color: Cores.branco }} spin />
    );

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);

    };

    const antesUpload = (file) => {
        const ehImagem = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/avif';

        if (!ehImagem) {
            toast.error('Insira uma imagem!');
            setCarregandoImg(true);
        }

        const tamanhoPermitido = file.size / 1024 / 1024 < 2;

        if (!tamanhoPermitido) {
            toast.error('Imagem deve ser menor que 2MB!');
            setCarregandoImg(true);
        }

        return ehImagem && tamanhoPermitido;
    };

    async function preenchendoImagem(info) {
        setCarregandoImg(true);
        getBase64(info.file.originFileObj, (url) => {
            const imagensAtualizadas = [...imgCarrossel];
            imagensAtualizadas[imgAtual] = url;
            setCarregandoImg(false);
            setImgCarrossel(imagensAtualizadas);
        });
    }

    async function atualizandoImg(id, url) {
        for (let i = 0; i < imgCarrossel.length; i++) {
            id = i;
            url = imgCarrossel[id]
            await managerService.updateImagemCarrossel(id, url)
        }
        props.setAlterouCarrossel(true);

    }

    async function setandoImagemCarrossel() {
        setCarregandoImg(true);
        const res = await managerService.GetImagensCarrossel();

        const requests = res.map(({ imagem }) =>
            managerService.GetArquivoPorChave(imagem)
        );

        const responses = await Promise.all(requests);
        setImgCarrossel(responses);
        setCarregandoImg(false);
    }

    useEffect(() => {
        setandoImagemCarrossel();
    }, []);

    useEffect(() => {
        atualizandoImg();
        console.log("teste")
    }, [props.toggle]);

    const imagens = [
        { img: imgCarrossel[0] },
        { img: imgCarrossel[1] },
        { img: imgCarrossel[2] },
        { img: imgCarrossel[3] }
    ];

    return (
        <CarrosselContainer>
            <Esquerda
                onClick={() => {
                    imgAtual > 0 && setImgAtual(imgAtual - 1);
                }}
            >
                <LeftOutlined style={{ fontSize: 25 }} />
            </Esquerda>
            {carregandoImg ? (
                <CaixaCarregando>
                    <Spin size="small" indicator={antIcon} />
                </CaixaCarregando>
            ) : (
                <>
                    <InteriorCarrossel
                        style={{ backgroundImage: `url(${imagens[imgAtual].img})` }}
                    >
                        <Centro>
                            <CaixaUpload>
                                <Upload
                                    showUploadList={false}
                                    beforeUpload={antesUpload}
                                    onChange={preenchendoImagem}
                                >
                                    Alterar Imagens
                                </Upload>

                            </CaixaUpload>
                        </Centro>
                    </InteriorCarrossel>
                </>
            )}
            <Direita
                onClick={() => {
                    imgAtual < imagens.length - 1 && setImgAtual(imgAtual + 1);
                }}
            >
                <RightOutlined style={{ fontSize: 25 }} />
            </Direita>
        </CarrosselContainer>
    );
}

export default CarrosselEditarHome;
