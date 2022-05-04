import React from "react";
import Button from "../../styles/Button";
import {
  Container,
  Caixa,
  Titulo,
  CorpoCaixa,
  InfoEsquerda,
  InfoDireita,
  CaixaAgendamento,
  DiaAgendamento,
  HorarioAgendamento,
  Agendamento,
  TextoAgendamentoEspecifico,
  NumeroAgendamentos,
  BarraEstetica,
  BotoesEditarExcluir,
} from "./Styles";
// import * as managerService from "../../services/ManagerService/managerService";
// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin } from "antd";

function ModalAgendamento() {
  //   const { TextArea } = Input;
  //   const { Option } = Select;
  //   const [usuario, setUsuario] = useState({});
  //   const [carregando, setCarregando] = useState();
  //   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <Container>
      <Caixa>

        <Titulo>Agendamentos Marcados:</Titulo>
        
        <CorpoCaixa>
          <InfoEsquerda>
            
            <Agendamento>
              <CaixaAgendamento>
                <DiaAgendamento>18/18/2018</DiaAgendamento>
                <BarraEstetica></BarraEstetica>
                <TextoAgendamentoEspecifico>
                  Agendamento
                </TextoAgendamentoEspecifico>
                <BarraEstetica></BarraEstetica>
                <HorarioAgendamento>20:20</HorarioAgendamento>
              </CaixaAgendamento>
              <BotoesEditarExcluir>
              <Button
                width="45%"
                height="40px"
                backgroundColor="#EFEFEF"
                borderColor="#BBC0F4"
                color="#8D8D8D"
                fontSize="0.9em"
                fontWeight="bold"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia560="30px"
              >
                EDITAR
              </Button>
              <Button
                width="45%"
                height="40px"
                backgroundColor="#FFFFFF"
                borderColor="rgba(255, 0, 0, 0.25)"
                color="#8D8D8D"
                fontSize="0.9em"
                fontWeight="bold"
                fontSizeMedia="0.8em"
                fontSizeMedia950="1em"
                heightMedia560="30px"
              >
                EXCLUIR
              </Button>
              </BotoesEditarExcluir>
            </Agendamento>
          </InfoEsquerda>

          <InfoDireita>
            <NumeroAgendamentos>
              O paciente ja realizou 10 agendamentos
            </NumeroAgendamentos>
            <Button
              width="100%"
              height="50px"
              backgroundColor="green"
              // backgroundColor="#A7ADE8" -estatico
              borderColor="#151B57"
              color="#0A0E3C"
              fontSize="1.1em"
              fontWeight="bold"
              fontSizeMedia="0.9em"
              fontSizeMedia950="1.1em"
            >
              Cadastrar novo agendamento
            </Button>
          </InfoDireita>
        </CorpoCaixa>
      </Caixa>
    </Container>
  );
}

export default ModalAgendamento;
