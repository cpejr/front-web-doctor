import React, { useState, useEffect } from "react";
import { Cores } from "../../variaveis";
import { Modal, Spin } from "antd";
import { sleep } from "../../utils/sleep";
import { useHistory } from "react-router-dom";
import {
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import {
  Container,
  EdicaoContainer,
  ContainerInterno,
  ContainerDireita,
  Titulo,
  Descricao,
  ContainerSugestao,
  Divisoria,
  Informacoes,
  TituloInfo,
  BotoesIndicacao,
  DescricaoInformacoes,
  SaidaMobile,
  mobilePontoDeQuebra,
} from "./Styles";
import ModalAdicionarIndicacao from "../../components/ModalAdicionarIndicacao";
import ModalExcluirIndicacao from "../../components/ModalExcluirIndicacao";
import ModalAlterarIndicacao from "../../components/ModalAlterarIndicacao";
import ModalIndicacao from "../../components/ModalIndicacao";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import { toast } from "react-toastify";

const examesDisponiveis = [
  "Eletroneuromiografia",
  "Ressonância Magnética em Epilespsia",
  "Punção Lombar",
  "Fisioterapia CPAP",
  "Fonoaudiologia - Apneia de Sono",
  "Odontologia do Sono",
  "Psicologia - TCC Insônia",
  "Avaliação Neuropsicológica",
];

function EdicaoIndicacoesESugestoes(props) {
  const [exameSelecionado, setExameSelecionado] = useState("");
  const [dadosIndicacao, setDadosIndicacao] = useState([{}]);
  const [carregando, setCarregando] = useState();
  const [modalAdicionarIndicacao, setModalAdicionarIndicacao] = useState(false);
  const [modalExcluirIndicacao, setModalExcluirIndicacao] = useState(false);
  const [modalAlterarIndicacao, setModalAlterarIndicacao] = useState(false);
  const [modalIndicacao, setModalIndicacao] = useState(false);
  const [Indicados, setIndicados] = useState();
  const [indicacoesEspecificas, setIndicacoesEspecificas] = useState();
  const [medicosIndicados, setMedicosIndicados] = useState([{}]);
  const [idIndicado, setIdIndicado] = useState();
  const history = useHistory();

  async function pegarIndicacoesEspecificas() {
    const Indicacoes = await managerService.GetIndicacaoEspecifica();
    setIndicacoesEspecificas(Indicacoes);
  }
  useEffect(() => {
    pegarIndicacoesEspecificas();
  }, [])

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
  );
  let IDindicado = {};
  async function alterarIndicacao(exame) {
    const larguraJanela = window.innerWidth;
    const mobilePontoDeQuebraNumero = +/\d+/.exec(mobilePontoDeQuebra);
    if (larguraJanela <= mobilePontoDeQuebraNumero) {
      abrirModalIndicacao();
      setExameSelecionado("");
    } else {
      setExameSelecionado(exame);
    }
    setCarregando(true);
    let Texto;
    let Titulo;

    
    const IndicacaoEspecifica = indicacoesEspecificas.forEach((Indicacao) => {
      if (Indicacao.titulo === exame) {
        Texto = Indicacao.texto;
        Titulo = Indicacao.titulo;
        IDindicado = Indicacao.id;
        return Texto;
      }
      else {
        Texto = "";
        return Texto;
      }
    }
    )
    let nomemedico;
    let telefone;
    let local;
    if (IndicacaoEspecifica !== "") {
      const medicos = await managerService.GetMedicosIndicadosPorID(IDindicado);
      setMedicosIndicados(medicos);
      const MedicoIndicado = medicosIndicados.forEach((medico) => {
        telefone = medico.telefone;
        nomemedico = medico.nome;
        local = medico.local_atendimento;
        return nomemedico
      })
      
      setIndicados(true);
      const dadosDoBackend = {
        titulo: Titulo,
        nomemedico: nomemedico,
        localmedico: local,
        telefonemedico: telefone,
      };
      setDadosIndicacao(dadosDoBackend);
      setIdIndicado(IDindicado);
    } else {
      const dadosDoBackend = {
        titulo: Titulo,
        nomemedico: "",
        localmedico: "",
        telefonemedico: "",
      };
      setDadosIndicacao(dadosDoBackend);
    }
    setCarregando(false);
  }

  async function abrirModalAdicionarIndicacao() {
    if (Indicados === true) {
      setModalAdicionarIndicacao(true);
    }
    else
      toast.warn("Selecione uma especialidade ao lado para adicionar!");

  }

  async function abrirModalExcluirIndicacao() {
    if (Indicados === true) {
      setModalExcluirIndicacao(true);
    } else
      toast.warn("Selecione uma especialidade ao lado para excluir!");
  }

  async function abrirModalAlterarIndicacao() {
    if (Indicados === true) { setModalAlterarIndicacao(true); }
    else
      toast.warn("Selecione uma especialidade ao lado para alterar!");

  }

  async function abrirModalIndicacao() {
    setModalIndicacao(true);
  }

  async function fecharModalAdicionarIndicacao() {
    setModalAdicionarIndicacao(false);
  }

  async function fecharModalExcluirIndicacao() {
    setModalExcluirIndicacao(false);
  }

  async function fecharModalAlterarIndicacao() {
    setModalAlterarIndicacao(false);
  }

  async function fecharModalIndicacao() {
    setModalIndicacao(false);
  }

  return (
    <Container>
      <SaidaMobile
        onClick={() => {
          history.push("/web/home");
        }}
      >
        <LeftCircleOutlined
          style={{ fontSize: "30px", color: `${Cores.azul}` }}
        />
      </SaidaMobile>

      <EdicaoContainer>
        <ContainerInterno>
          <div>
            <Titulo>
              Indicações e Sugestões
              <br />
              Exames e profissionais
            </Titulo>
            <Descricao>
              São sugestões de profissionais de confiança para realização de
              exames ou tratamentos específicos, não oferecidos em meu
              consultório:
            </Descricao>
          </div>
          <ContainerSugestao>
            {examesDisponiveis.map((exame) => (
              <Button
                key={exame}
                fontSize="14px"
                width="100%"
                backgroundColor={Cores.cinza[7]}
                borderColor={Cores.azulEscuro}
                paddingTop="5px"
                paddingBottom="5px"
                boxShadow={
                  exame === exameSelecionado
                    ? `3px 3px 5px ${Cores.preto}`
                    : "none"
                }
                onClick={() => alterarIndicacao(exame)}
              >
                {exame}
              </Button>
            ))}
          </ContainerSugestao>
        </ContainerInterno>

        <Divisoria />

        <ContainerDireita>
          <Informacoes>
            {carregando ? (
              <Spin
                style={{
                  display: "flex",
                  alignSelf: "center",
                  justifySelf: "center",
                }}
                indicator={antIcon}
              />
            ) : (
              <>
                <TituloInfo>{dadosIndicacao.titulo}</TituloInfo>
                {medicosIndicados.map((medicos) => (
                  <DescricaoInformacoes>
                    <div>{medicos.nome}</div>
                    <div>{medicos.local_atendimento}</div>
                    <div>{medicos.telefone}</div>
                  </DescricaoInformacoes>
                ))}
              </>
            )}
          </Informacoes>
          <BotoesIndicacao>
            <Button
              gap="5px"
              backgroundColor={Cores.azul}
              fontSize="1.7em"
              fontSizeMedia1080="18px"
              width="100%"
              borderColor={Cores.azulEscuro}
              color={Cores.branco}
              height="100%"
              onClick={abrirModalAdicionarIndicacao}
            >
              Adicionar Indicação <PlusSquareOutlined />
            </Button>
            <Button
              gap="5px"
              backgroundColor={Cores.azul}
              fontSize="1.7em"
              fontSizeMedia1080="18px"
              width="100%"
              borderColor={Cores.azulEscuro}
              color={Cores.branco}
              height="100%"
              onClick={abrirModalAlterarIndicacao}
            >
              Alterar Indicação <EditOutlined />
            </Button>
            <Button
              gap="5px"
              backgroundColor={Cores.vermelho}
              fontSize="1.7em"
              fontSizeMedia1080="18px"
              width="100%"
              borderColor={Cores.preto}
              color={Cores.branco}
              height="100%"
              onClick={abrirModalExcluirIndicacao}
            >
              Excluir Indicação <DeleteOutlined />
            </Button>
          </BotoesIndicacao>
        </ContainerDireita>
      </EdicaoContainer>

      <Modal
        visible={modalAdicionarIndicacao}
        onCancel={fecharModalAdicionarIndicacao}
        footer={null}
        width={"50%"}
        centered={true}
        destroyOnClose
        carregando={carregando}
      >
        <ModalAdicionarIndicacao
          idmedicoindicado={idIndicado}
          fechandoModal={fecharModalAdicionarIndicacao}
        />
      </Modal>

      <Modal
        visible={modalExcluirIndicacao}
        onCancel={fecharModalExcluirIndicacao}
        footer={null}
        width={"50%"}
        centered={true}
        destroyOnClose
        carregando={carregando}
      >
        <ModalExcluirIndicacao
          idmedicoindicado={idIndicado}
          fechandoModal={fecharModalExcluirIndicacao} />
      </Modal>

      <Modal
        visible={modalAlterarIndicacao}
        onCancel={fecharModalAlterarIndicacao}
        footer={null}
        width={"50%"}
        centered={true}
        destroyOnClose
        carregando={carregando}
      >
        <ModalAlterarIndicacao
          idmedicoindicado={idIndicado}
          fechandoModal={fecharModalAlterarIndicacao} />
      </Modal>

      <Modal
        visible={modalIndicacao}
        onCancel={fecharModalIndicacao}
        footer={null}
        width={"100%"}
        centered={true}
        carregando={carregando}
        destroyOnClose
      >
        <ModalIndicacao
          dadosIndicacao={dadosIndicacao}
          medicosIndicados={medicosIndicados}
          idIndicado={idIndicado}
          carregando={carregando}
          fechandoModal={fecharModalIndicacao}
        />
      </Modal>
    </Container>
  );
}

export default EdicaoIndicacoesESugestoes;
