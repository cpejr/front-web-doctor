import React from "react";
import { Corpo, Container, TituloPaginaEdicao } from "./Styles";
import { useHistory } from "react-router-dom";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";

function EdicaoConteudo() {
  const history = useHistory();
  return (
    <Corpo>
      <Container>
        <TituloPaginaEdicao>
          Selecione a página do aplicativo que deseja editar
        </TituloPaginaEdicao>
        <Button
          backgroundColor={Cores.azulClaro}
          borderRadius="3px"
          borderWidth="1px"
          borderColor={Cores.preto}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          color={Cores.preto}
          fontSize="15px"
          height="50px"
          width="80%"
          marginTop="0%"
          marginLeft="0%"
          marginBottom="5%"
          fontSizeMedia950="0.9em"
          widthMedia600="75%"
          onClick={() => {
            history.push("/web/edicaohome");
          }}
        >
          Home
        </Button>
        <Button
          backgroundColor={Cores.azulClaro}
          borderRadius="3px"
          borderWidth="1px"
          borderColor={Cores.preto}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          color={Cores.preto}
          fontSize="15px"
          height="50px"
          width="80%"
          marginTop="0%"
          marginLeft="0%"
          fontSizeMedia950="0.9em"
          marginBottom="5%"
          widthMedia600="75%"
          onClick={() => {
            history.push("/web/edicaosobremim");
          }}
        >
          Sobre mim
        </Button>
        <Button
          backgroundColor={Cores.azulClaro}
          borderRadius="3px"
          borderWidth="1px"
          borderColor={Cores.preto}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          color={Cores.preto}
          fontSize="15px"
          height="50px"
          width="80%"
          marginTop="0%"
          marginLeft="0%"
          fontSizeMedia950="0.9em"
          marginBottom="5%"
          widthMedia600="75%"
          onClick={() => {
            history.push("/web/edicaocomentarios");
          }}
        >
          Comentários
        </Button>
        <Button
          backgroundColor={Cores.azulClaro}
          borderRadius="3px"
          borderWidth="1px"
          borderColor={Cores.preto}
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          color={Cores.preto}
          fontSize="15px"
          height="50px"
          width="80%"
          marginTop="0%"
          marginLeft="0%"
          fontSizeMedia950="0.9em"
          marginBottom="5%"
          widthMedia600="75%"
          onClick={() => {
            history.push("/web/edicaoindicacoesesugestoes");
          }}
        >
          Indicações e Sugestões
        </Button>
      </Container>
    </Corpo>
  );
}

export default EdicaoConteudo;
