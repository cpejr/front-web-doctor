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
  const [descricao, setDescricao] = useState("");
  const [comparaDescricao, setComparaDescricao] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: Cores.azul }} spin />
  );

  async function setandoValoresConsulta() {
    setCarregando(true);
    await sleep(1500);
    setConsulta(props.consulta);
    setDataHora(String(props.consulta.data_hora));
    setDescricao(props.consulta.descricao);
    setCarregando(false);

    if(props.consulta.descricao !== null)
      setComparaDescricao(true);
    else
      setComparaDescricao(false);
  }

  useEffect(() => {
    setandoValoresConsulta();
  }, [props]);

  const margemBottomDescricao = comparaDescricao ? "8%" : "5%";
  const margemTopDescricao = comparaDescricao ? "10%" : "3%";

  return(

    <Container>
      {carregando ? (
        <div
        style={{
          display: "flex",
          height:"30px",
          justifyContent: "center",
          alignItems: "center",

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
        
          <TextoDescricao 
            marginBottom = {margemBottomDescricao}
            marginTop = {margemTopDescricao}
          >
            {descricao}
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