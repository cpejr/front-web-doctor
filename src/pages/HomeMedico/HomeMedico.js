import React from "react";
import Button from "../../styles/Button";
import { useHistory } from "react-router-dom";
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
  BotoesSecretario,
  Info,
} from "./Styles";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Cores } from "../../variaveis";

function HomeMedico() {
  const history = useHistory();

  function passandoTipoParaCadastro(tipo){
    history.push({
      pathname: "/cadastro",
      state: { tipo },
    });
  }


  return (
    <ContainerHome>
      <ContainerSuperior>
        <ContainerSecretario>
          <Secretarios>
            Nova(o) secretária(o) aguardando informação:
            <Dados>
              <Info>
                <InfoSecretario>Adrianus Babaca Vieira</InfoSecretario>
                <InfoSecretario>adrianus@babaca.com.br</InfoSecretario>
              </Info>
              <BotoesSecretario>
                <Button
                  backgroundColor={Cores.amarelo}
                  color={Cores.preto}
                  width="100%"
                  height="40px"
                  borderColor={Cores.preto}
                  fontSize="1em"
                  gap="1%"
                  boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                  borderRadius="6px"
                  fontSizeMedia="0.8em"
                >
                  Aceitar Solicitação
                </Button>
                <Button
                  backgroundColor={Cores.amarelo}
                  color={Cores.preto}
                  width="100%"
                  height="40px"
                  borderColor={Cores.preto}
                  fontSize="1em"
                  gap="1%"
                  boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                  borderRadius="6px"
                  fontSizeMedia="0.8em"
                >
                  Negar Solicitação
                </Button>
              </BotoesSecretario>
            </Dados>
          </Secretarios>
          <Secretarios>
            Nova(o) secretária(o) aguardando informação:
            <Dados>
              <Info>
                <InfoSecretario>Adrianus Babaca Vieira</InfoSecretario>
                <InfoSecretario>adrianus@babaca.com.br</InfoSecretario>
              </Info>
              <BotoesSecretario>
                <Button
                  backgroundColor={Cores.amarelo}
                  color={Cores.preto}
                  width="100%"
                  height="40px"
                  borderColor={Cores.preto}
                  fontSize="1em"
                  gap="1%"
                  boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                  borderRadius="6px"
                  fontSizeMedia="0.8em"
                >
                  Aceitar Solicitação
                </Button>
                <Button
                  backgroundColor={Cores.amarelo}
                  color={Cores.preto}
                  width="100%"
                  height="40px"
                  borderColor={Cores.preto}
                  fontSize="1em"
                  gap="1%"
                  boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
                  borderRadius="6px"
                  fontSizeMedia="0.8em"
                >
                  Negar Solicitação
                </Button>
              </BotoesSecretario>
            </Dados>
          </Secretarios>
        </ContainerSecretario>
        <ContainerFormulario>
          <Formulario>Formulário 1</Formulario>
          <Formulario>Formulário 2</Formulario>
          <Formulario>Formulário 3</Formulario>
          <Formulario>Formulário 4</Formulario>
          <Formulario>Formulário 5</Formulario>
          <Formulario>Formulário 6</Formulario>
        </ContainerFormulario>
      </ContainerSuperior>
      <ContainerBotoes>
        <Botoes>
          <Button
            backgroundColor={Cores.cinza[7]}
            color={Cores.azul}
            width="100%"
            height="50px"
            borderColor={Cores.azul}
            fontSize="1em"
            gap="1%"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            onClick={() => history.push("/web/editarconteudo")}
          >
            Editar Conteúdo do Aplicativo
          </Button>
          <Button
            backgroundColor="green"
            color={Cores.azul}
            width="100%"
            height="50px"
            borderColor={Cores.azul}
            fontSize="1em"
            gap="1%"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            // onClick={() => history.push("avaliar-app")}
          >
            Avaliação do Aplicativo
          </Button>
        </Botoes>
        <Botoes>
          <Button
            backgroundColor={Cores.cinza[7]}
            color={Cores.azul}
            width="100%"
            height="50px"
            borderColor={Cores.azul}
            fontSize="1em"
            gap="1%"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            onClick={() => passandoTipoParaCadastro("PACIENTE")}
          >
            Cadastrar Novo Paciente
            <PlusCircleOutlined style={{ color: Cores.azul }} />
          </Button>
          <Button
            backgroundColor={Cores.cinza[7]}
            color={Cores.azul}
            width="100%"
            height="50px"
            borderColor={Cores.azul}
            fontSize="1em"
            gap="1%"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            onClick={() => passandoTipoParaCadastro("SECRETARIA(O)")}
          >
            Cadastrar nova(o) Secretária(o)
            <PlusCircleOutlined style={{ color: Cores.azul }} />
          </Button>
        </Botoes>
      </ContainerBotoes>
    </ContainerHome>
  );
}
export default HomeMedico;
