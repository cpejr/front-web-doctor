import React from "react";
import Button from "../../styles/Button";
import {
  ContainerHome,
  Botoes,
  Secretarios,
  ContainerBotoes,
  Formulario,
  ContainerSuperior,
  ContainerFormulario,
  ContainerSecretario,
  Dados,
  InfoSecretario,
} from "./Styles";
import { PlusCircleOutlined } from "@ant-design/icons";

function HomeMedico() {
  return (
    <ContainerHome>
      <ContainerSuperior>
        <ContainerSecretario>
          <Secretarios>
            Nova(o) secretária(o) aguardando informação:
            <Dados>
              <Botoes>
                <InfoSecretario>Adrianus Babaca Vieira</InfoSecretario>
                <InfoSecretario>adrianus@babaca.com.br</InfoSecretario>
              </Botoes>
              <Botoes>
                <Button
                  backgroundColor="#FDF1D1"
                  color="black"
                  width="100%"
                  borderColor="black"
                  fontSize="1em"
                  gap="1%"
                >
                  Aceitar Solicitação
                </Button>
                <Button
                  backgroundColor="#FDF1D1"
                  color="black"
                  width="100%"
                  borderColor="black"
                  fontSize="1em"
                  gap="1%"
                >
                  Negar Solicitação
                </Button>
              </Botoes>
            </Dados>
          </Secretarios>

          
        </ContainerSecretario>
        <ContainerFormulario>
          <Formulario>Formulário 1</Formulario>
          <Formulario>Formulário 2</Formulario>
          <Formulario>Formulário 3</Formulario>
        </ContainerFormulario>
      </ContainerSuperior>
      <ContainerBotoes>
        <Botoes>
          <Button
            backgroundColor="#E9EBFC"
            color="#151B57"
            width="100%"
            borderColor="#151B57"
            fontSize="1em"
            gap="1%"
          >
            Editar Conteúdo do Aplicativo
          </Button>
          <Button
            backgroundColor="#E9EBFC"
            color="#151B57"
            width="100%"
            borderColor="#151B57"
            fontSize="1em"
            gap="1%"
          >
            Avaliação do Aplicativo
          </Button>
        </Botoes>
        <Botoes>
          <Button
            backgroundColor="#E9EBFC"
            color="#151B57"
            width="100%"
            borderColor="#151B57"
            fontSize="1em"
            gap="1%"
          >
            Cadastrar Novo Paciente
            <PlusCircleOutlined style={{ color: "#151B57" }} />
          </Button>
          <Button
            backgroundColor="#E9EBFC"
            color="#151B57"
            width="100%"
            borderColor="#151B57"
            fontSize="1em"
            gap="1%"
          >
            Cadastrar Nova Secretária
            <PlusCircleOutlined style={{ color: "#151B57" }} />
          </Button>
        </Botoes>
      </ContainerBotoes>
    </ContainerHome>
  );
}
export default HomeMedico;
