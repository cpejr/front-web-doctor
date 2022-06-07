import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import Form from "@rjsf/antd";
import {
  ContainerListadeUsuarios,
  DadosUsuario,
  Titulo,
  ContainerUsuarios,
  Usuario,
  Imagem,
  Nome,
  Telefone,
  UltimaVisita,
  CódigoPaciente,
  CaixaVazia,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";

function POC4(props) {
  const [respostas, setRespostas] = useState([]);
  const history = useHistory();

  useEffect(() => {
    pegandoRespostasFormulario();
  }, []);

  async function pegandoRespostasFormulario() {
    const resposta = await managerService.GetRespostasFormulario();
    setRespostas(resposta);
  }

  async function encaminhando(id) {
    history.push({
      pathname: "/web/poc5",
      state: {id},
    })
  }

  return (
    <div>
    <ContainerListadeUsuarios>
      <DadosUsuario>
        <Titulo></Titulo>
        <Nome>Nome do Usuário</Nome>
        <Telefone>Telefone</Telefone>
        <UltimaVisita>Última Visita</UltimaVisita>
        <CódigoPaciente>Código do Paciente</CódigoPaciente>
        <CaixaVazia></CaixaVazia>
      </DadosUsuario>
      <ContainerUsuarios>
        {respostas?.map((value) => (
          <Usuario key={value.id}>
            <Imagem>{value.avatar_url}</Imagem>
            <Nome>
              
                <div
                  onClick={() => encaminhando(value.id)
                  }
                >
                  {value.word}
                </div>
            
            </Nome>
          </Usuario>
        ))}
      </ContainerUsuarios>
    </ContainerListadeUsuarios>
  </div>
  );
}

export default POC4;
