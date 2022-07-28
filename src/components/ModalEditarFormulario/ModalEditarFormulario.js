import React from "react";
import { Cores } from "../../variaveis";
import { Container } from "./Styles";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";

function ModalEditarFormulario(props) {
  async function deletarCampo(valor) {
    delete props.perguntasAlterar[valor[0]];
    await managerService.updatePerguntasFormulario(
      props.formulario.id,
      props.perguntasAlterar
    );
  }

  return (
    <Container>
      {props.perguntas.map((valor) => (
        <>
          {valor[1].title}
          <Button
            height="50px"
            width="100%"
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            color={Cores.branco}
            fontSize="1.5em"
            fontSizeMedia="1.2em"
            fontWeight="bold"
            onClick={() => deletarCampo(valor)}
          >
            Apagar
          </Button>
        </>
      ))}
    </Container>
  );
}

export default ModalEditarFormulario;
