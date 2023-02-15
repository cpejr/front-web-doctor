import React, { useState, useEffect } from "react";
import {
  CarrosselContainer,
  Centro,
  Direita,
  Esquerda,
  InteriorCarrossel,
  CaixaCarregando,
} from "./Styles";
import {
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";

import * as managerService from "../../services/ManagerService/managerService";
import { Spin } from "antd";

function CarrosselEditarHome() {
  const [imgAtual, setImgAtual] = useState(0);
  const [imgCarrossel, setImgCarrossel] = useState("");
  const [carregando, setCarregando] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 50, color: Cores.branco }} spin />
  );

  async function setandoImagemCarrossel() {
    setCarregando(true);

    const res = await managerService.GetImagensCarrossel();
    const requests = res.map(({ imagem }) =>
      managerService.GetArquivoPorChave(imagem)
    );
    const responses = await Promise.all(requests);
    setImgCarrossel(responses);

    setCarregando(false);
  }

  useEffect(() => {
    setandoImagemCarrossel();
  }, []);

  const imagens = [
    { img: imgCarrossel[0] },
    { img: imgCarrossel[1] },
    { img: imgCarrossel[2] },
  ];

  return (
    <CarrosselContainer>
      <Esquerda
        onClick={() => {
          imgAtual > 0 && setImgAtual(imgAtual - 1);
        }}
      >
        <LeftOutlined style={{ fontSize: 30 }} />
      </Esquerda>
      {carregando ? (
        <CaixaCarregando>
          <Spin size="small" indicator={antIcon} />
        </CaixaCarregando>
      ) : (
        <>
          <InteriorCarrossel
            style={{ backgroundImage: `url(${imagens[imgAtual].img})` }}
          >
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
          </InteriorCarrossel>
        </>
      )}
      <Direita
        onClick={() => {
          imgAtual < imagens.length - 1 && setImgAtual(imgAtual + 1);
        }}
      >
        <RightOutlined style={{ fontSize: 30 }} />
      </Direita>
    </CarrosselContainer>
  );
}

export default CarrosselEditarHome;
