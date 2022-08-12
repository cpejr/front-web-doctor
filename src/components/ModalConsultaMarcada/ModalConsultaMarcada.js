import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Caixa, CaixaInformações, CaixaNome, Container, FotoPerfil, Texto, TextoDescricao, TextoInformacoes } from "./Styles";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";







function ModalConsultaMarcada (props) {

  const [consulta, setConsulta] = useState({});
  const [carregando, setCarregando] = useState();
  const [dataHora, setDataHora] = useState("");

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: Cores.azul }} spin />
  );

  async function setandoValoresConsulta() {
    setCarregando(true);
    await sleep(1500);
    setConsulta(props.consulta);
    setDataHora(String(props.consulta.data_hora));
    setCarregando(false);
  }

  useEffect(() => {
    setandoValoresConsulta();
  }, [props]);

  return(

    <Container>
      {carregando ? (
        <div
        style={{
          position: "absolute",
          left: "45%"
        }}
        >
            <Spin indicator={antIcon} />
          </div>
          ) : (
      <Caixa>
        <CaixaNome>
        <FotoPerfil>
          <img
            src={logoGuilherme}
            className="foto"
            alt="logoGuilherme"
          ></img>
        </FotoPerfil>
          <Texto>
            {consulta.nome}
          </Texto>
        </CaixaNome>
        <TextoDescricao>
          {consulta.descricao}
        </TextoDescricao>
        <CaixaInformações>
          <TextoInformacoes>
            Data: {dataHora.slice(8,10)}/{dataHora.slice(5,7)}/{dataHora.slice(0,4)} 
          </TextoInformacoes>
          <TextoInformacoes>
            Horário: {parseInt(dataHora.slice(11, 13)) < 12 ? (
                      parseInt(dataHora.slice(11, 13)) + ":" + dataHora.slice(14, 16) + " am"
                    ) : (
                      parseInt(dataHora.slice(11, 13) - 12) + ":" + dataHora.slice(14, 16) + " pm")}
          </TextoInformacoes>
          <TextoInformacoes>
            Duração: {consulta.duracao_em_minutos} min
          </TextoInformacoes>
        </CaixaInformações>
      </Caixa>
      )}
    </Container>

  )
}

export default ModalConsultaMarcada;