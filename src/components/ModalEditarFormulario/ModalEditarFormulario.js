import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Container,
  Pergunta,
  PerguntaBotao,
  TextoSemPerguntas,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import { sleep } from "../../utils/sleep";
import * as managerService from "../../services/ManagerService/managerService";

function ModalEditarFormulario(props) {
  const [carregando, setCarregando] = useState(true);
  const [pergunta, setPergunta] = useState();

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 42, color: Cores.azul }} spin />
  );

  async function pegandoDados() {
    setCarregando(true);
    setPergunta(props.perguntas);
    setCarregando(false);
  }

  useEffect(() => {
    pegandoDados();
  }, [props]);

  async function deletarCampo(valor) {
    delete props.perguntasAlterar.properties[valor[0]];
    await managerService.EditarPerguntasFormulario(
      props.formulario.id,
      props.perguntasAlterar
    );
    await sleep(1500);
    props.fechandoModal();
  }

  return (
    <Container>
      {carregando ? (
        <Spin indicator={antIcon} />
      ) : (
        <>
          {pergunta.length === 0 && (
            <TextoSemPerguntas>
              Esse formulário não possui perguntas
            </TextoSemPerguntas>
          )}
          {pergunta.map((valor) => (
            <PerguntaBotao>
              <Pergunta>{valor[1].title}</Pergunta>
              <Button
                height="40px"
                width="30%"
                backgroundColor={Cores.lilas[1]}
                borderColor={Cores.azul}
                color={Cores.branco}
                fontSize="1.3em"
                fontSizeMedia="1em"
                fontWeight="bold"
                onClick={() => deletarCampo(valor)}
              >
                Apagar
              </Button>
            </PerguntaBotao>
          ))}
        </>
      )}
    </Container>
  );
}

export default ModalEditarFormulario;
