import React from "react";
// import { useHistory } from "react-router-dom";
import { Checkbox, Row, Col, Input, Select } from "antd";
// import Input from "../../styles/Input";
import Button from "../../styles/Button";
import {
  Container,
  Caixa,
  InfoEsquerdaEDireita,
  Usuario,
  Imagem,
  Nome,
  TipoAgendamento,
  TextoTipoAgendamento,
  TextoCheckbox,
  DoisSelect,
  TamanhoInput,
  SelecioneUmaData,
  TextoSelecioneUmaData,
} from "./Styles";

import logoGuilherme from "../../assets/logoGuilherme.png";

function ModalAgendamentoEspecifico(props) {
  //   const history = useHistory();
  const { TextArea } = Input;
  const { Option } = Select;

  return (
    <Container>
      <Caixa>
        <InfoEsquerdaEDireita>
          <Usuario>
            <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
            <Nome>{props.NomeUsuario}</Nome>
          </Usuario>
          <TipoAgendamento>
            <TextoTipoAgendamento>
              Selecione o Tipo de Agendamento:
            </TextoTipoAgendamento>
            <Row gutter={60} justify={"space-around"}>
              <Col>
                <Checkbox>
                  <TextoCheckbox>Exame</TextoCheckbox>
                </Checkbox>
              </Col>
              <Col>
                <Checkbox>
                  <TextoCheckbox>Consulta</TextoCheckbox>
                </Checkbox>
              </Col>
            </Row>
          </TipoAgendamento>
          <TextArea placeholder="Adicione uma descrição" rows={4}></TextArea>
        </InfoEsquerdaEDireita>
        <InfoEsquerdaEDireita>
          <SelecioneUmaData>
              <TextoSelecioneUmaData>Selecione uma data:</TextoSelecioneUmaData>
              <Input
                placeholder="Selecione uma data"
                type="date"
                size="large"
              ></Input>
            </SelecioneUmaData>
          <DoisSelect>
            <TamanhoInput>
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Tipo"
              >
                <Option value="1">Consulta 1</Option>
                <Option value="2">Consulta 2</Option>
                <Option value="3">Consulta 3</Option>
              </Select>
            </TamanhoInput>
            <TamanhoInput>
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Consultório "
              >
                <Option value="1">Consulta 1</Option>
                <Option value="2">Consulta 2</Option>
                <Option value="3">Consulta 3</Option>
              </Select>
            </TamanhoInput>
          </DoisSelect>
          <DoisSelect>
            <TamanhoInput>
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Horário"
              >
                <Option value="1">Consulta 1</Option>
                <Option value="2">Consulta 2</Option>
                <Option value="3">Consulta 3</Option>
              </Select>
            </TamanhoInput>
            <TamanhoInput>
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Duração"
              >
                <Option value="1">Consulta 1</Option>
                <Option value="2">Consulta 2</Option>
                <Option value="3">Consulta 3</Option>
              </Select>
            </TamanhoInput>
          </DoisSelect>
          <Checkbox>
            <TextoCheckbox>Notificar paciente</TextoCheckbox>
          </Checkbox>
          <Button
            width="80%"
            height="50px"
            backgroundColor="#A7ADE8"
            borderColor="#151B57"
            color="#0A0E3C"
            fontSize="1.5em"
            fontWeight="bold"
            fontSizeMedia="0.9em"
            fontSizeMedia950="1em"
          >
            {" "}
            Cadastrar novo agendamento
          </Button>
        </InfoEsquerdaEDireita>
      </Caixa>
    </Container>
  );
}

export default ModalAgendamentoEspecifico;
