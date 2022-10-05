import React, { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Caixa, CaixaInformações, CaixaNome, Container, FotoPerfil, Texto, TextoDescricao, TextoInformacoes } from "./Styles";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { Cores } from "../../variaveis";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

function ModalConsultaMarcada(props) {

  const [consulta, setConsulta] = useState({});
  const [carregando, setCarregando] = useState();
  const [dataHora, setDataHora] = useState("");
  const [consultorio, setConsultorio] = useState("");
  const [comparaDescricao, setComparaDescricao] = useState(false);
  const [fotoDePerfil, setFotoDePerfil] = useState('');
  const [carregandoFoto, setCarregandoFoto] = useState(true);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: Cores.azul }} spin />
  );

  async function setandoValoresConsulta() {
    setCarregando(true);
    await sleep(1500);
    setConsulta(props.consulta);
    setDataHora(String(props.consulta.data_hora));
    const resposta = await managerService.GetConsultorioPorId(
      props.consulta.id_consultorio
    );
    setConsultorio(resposta.nome);
    setCarregando(false);

    if (props.consulta.descricao !== null)
      setComparaDescricao(true);
    else
      setComparaDescricao(false);
  }

  async function setandoFotoDePerfil() {
    const resposta = await managerService.GetDadosUsuario(props.email);
    const chave = resposta.dadosUsuario.avatar_url;
    if (chave === null || chave === '') return;
    setCarregandoFoto(true);
    const arquivo = await managerService.GetArquivoPorChave(chave);
    setFotoDePerfil(arquivo);
    await sleep(1500);
    setCarregandoFoto(false);
  }

  useEffect(() => {
    setandoValoresConsulta();
    setandoFotoDePerfil();
  }, [props]);

  const margemBottomDescricao = comparaDescricao ? "8%" : "0%";
  const margemTopDescricao = comparaDescricao ? "10%" : "0%";

  const margemTopInformacoes = comparaDescricao ? "0%" : "8%";
  const margemBottomInformacoes = comparaDescricao ? "0%" : "2%";

  return (
    <Container>
      {carregando ? (
        <div
          style={{
            display: "flex",
            height: "30px",
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
            {carregandoFoto ? (
                <div
                  style={{
                    display: 'flex',
                    height: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Spin indicator={antIcon} />
                </div>
              ) : (
                <img
                  src={fotoDePerfil}
                  className='foto'
                  alt='fotoDePerfil'
                  height='100%'
                  width='100%'
                ></img>
              )}
            </FotoPerfil>
            <Texto>
              {consulta.nome}
            </Texto>
          </CaixaNome>

          <TextoDescricao
            marginTop={margemTopDescricao}
            marginBottom={margemBottomDescricao}
          >
            {consulta.descricao}
          </TextoDescricao>

          <CaixaInformações
            marginTop={margemTopInformacoes}
            marginBottom={margemBottomInformacoes}
          >
            <TextoInformacoes>
              <b>Tipo: </b>{consulta.tipo}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Consultório: </b> {consultorio}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Data: </b> {dataHora.slice(8, 10)}/{dataHora.slice(5, 7)}/{dataHora.slice(0, 4)}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Horário: </b> {parseInt(dataHora.slice(11, 13)) < 12 ? (
                parseInt(dataHora.slice(11, 13)) + ":" + dataHora.slice(14, 16) + " am"
              ) : (
                parseInt(dataHora.slice(11, 13) - 12) + ":" + dataHora.slice(14, 16) + " pm")}
            </TextoInformacoes>
            <TextoInformacoes>
              <b>Duração: </b> {consulta.duracao_em_minutos} min
            </TextoInformacoes>
          </CaixaInformações>
        </Caixa>
      )}
    </Container>

  )
}

export default ModalConsultaMarcada;