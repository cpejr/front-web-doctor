import React, { useEffect, useState } from "react";
import { Cores } from "../../variaveis";
import { Container, Pergunta, PerguntaBotao } from "./Styles";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { sleep } from "../../utils/sleep";

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
    delete props.perguntasAlterar.properties[valor[0]]
    await managerService.EditarPerguntasFormulario(
      props.formulario.id,
      props.perguntasAlterar
    );
    await sleep(1500)
     window.location.href = "/web/listaformularios";
  }


  return (
    <Container>
      {carregando ? (
        <Spin indicator={antIcon} />
      ) : (
        <>
          {pergunta.map((valor) => (
            <PerguntaBotao>
              <Pergunta>{valor[1].title}</Pergunta>
              <Button
                height="40px"
                width="30%"
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
            </PerguntaBotao>
          ))}
        </>
      )}
    </Container>
  );
}

export default ModalEditarFormulario;
