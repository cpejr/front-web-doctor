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
import { Titulo } from "../ModalFormulario/Styles";

function ModalPerguntaFormulario(props) {

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
  }, []);


  return (
    <Container>
      <Titulo>Perguntas do formulário:</Titulo>
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
            </PerguntaBotao>
          ))}
        </>
      )}  
    </Container>
  );


}

export default ModalPerguntaFormulario;