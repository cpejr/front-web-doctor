import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Input, Select } from "antd";
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
import * as managerService from "../../services/ManagerService/managerService";
import logoGuilherme from "../../assets/logoGuilherme.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Cores } from "../../variaveis";

function ModalAgendamentoEspecifico(props) {
  const { TextArea } = Input;
  const { Option } = Select;
  const [usuario, setUsuario] = useState({});
  const [carregando, setCarregando] = useState();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function pegandoDados() {
    setCarregando(true);
    const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
    setUsuario(resposta.dadosUsuario);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoDados();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <Container>
      <Caixa>
        <InfoEsquerdaEDireita>
          <Usuario>
            <Imagem src={logoGuilherme} alt="logoGuilherme"></Imagem>
            {carregando ? (
              <Spin indicator={antIcon} />
            ) : (
              <Nome>{usuario.nome}</Nome>
            )}
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
              <Select style={{ width: "100%" }} size="large" placeholder="Tipo">
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
            backgroundColor="green"
            // backgroundColor={Cores.lilas[2]} -estatico
            borderColor={Cores.azul}
            color={Cores.azulEscuro}
            fontSize="1.1em"
            fontWeight="bold"
            fontSizeMedia="0.9em"
            fontSizeMedia950="1.1em"
          >
            Cadastrar novo agendamento
          </Button>
        </InfoEsquerdaEDireita>
      </Caixa>
    </Container>
  );
}

export default ModalAgendamentoEspecifico;
