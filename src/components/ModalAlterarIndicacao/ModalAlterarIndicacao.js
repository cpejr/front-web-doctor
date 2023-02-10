import React, { useState } from "react";
import Button from "../../styles/Button";
import { Titulo, Container, ContainerInputs, Labels, Rotulo } from "./Styles";
import Input from "../../styles/Input";
import Select from "../../styles/Select/Select";
import { Cores } from "../../variaveis";
import { telefone, apenasLetras } from "../../utils/masks";
import { PlusSquareOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';
import * as managerService from "../../services/ManagerService/managerService";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";

function ModalAlterarIndicacao(props) {
  const [camposVazios, setCamposVazios] = useState({});
  const [carregandoCriacao, setCarregandoCriacao] = useState(false);
  const [estado, setEstado] = useState({
    nome: "",
    telefone: "",
    local: "",
  });
  const [erro, setErro] = useState(false);

  const [camposVaziosReferencia, setCamposVaziosReferencia] = useState({
    nome: false,
    telefone: false,
    local: false,
  });

  function preenchendoDados(e) {
    const { value, name } = e.target;
    if (value) setCamposVazios({ ...camposVazios, [name]: false });

    if (name === "telefone" && value.length < 15) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }
    setEstado({ ...estado, [name]: value });

    if (name === "nome") {
      setEstado({
        ...estado,
        [name]: apenasLetras(value),
      });
    }

    if (name === "telefone") {
      setEstado({ ...estado, [name]: telefone(value) });
    }
    if (name === "local") {
      setEstado({
        ...estado,
        [name]: apenasLetras(value),
      });
    }
  }
 async function alterar(e) {
  e.preventDefault();

  const camposVaziosAtual = {
    nome: !estado.nome,
    telefone: !estado.telefone,
    local: !estado.local
  };

  setCamposVazios(camposVaziosAtual);

  if (!_.isEqual(camposVaziosAtual, camposVaziosReferencia)) {
    toast.warn("Preencha todos os campos");
    return;
  }

  
 }
 const antIcon = (
  <LoadingOutlined style={{ fontSize: 25, color: Cores.azul }} spin />
);
  return (
    <Container>
      <Titulo>Alterar Indicação:</Titulo>
      <ContainerInputs>
        <Labels>Indicação:</Labels>

        <Select id="indicacao" backgroundColor={Cores.cinza[7]} width="100%">
          <option>Escolher indicação para alterar</option>
          <option>Opção 1</option>
          <option>Opção 2</option>
          <option>Opção 3</option>
        </Select>
      </ContainerInputs>
      <ContainerInputs>
        <Labels>Nome:</Labels>
        <Input
          backgroundColor="#EAECFF"
          borderColor="black"
          placeholder="Insira o Nome do(a) Médico(a)"
          color="black"
          fontSize="1em"
          width="100%"
          paddingRight="2%"
          onChange={preenchendoDados}
          erro={erro.nome}
          camposVazios={camposVazios.nome}
          name="nome"
          value={estado.nome}
        ></Input>
      </ContainerInputs>
      <ContainerInputs>
        <Labels>Telefone:</Labels>
        <Input
          backgroundColor="#EAECFF"
          borderColor="black"
          placeholder="Insira o telefone do(a) Médico(a)"
          color="black"
          fontSize="1em"
          width="100%"
          paddingRight="2%"
          type="tel"
          onChange={preenchendoDados}
          erro={erro.nome}
          camposVazios={camposVazios.nome}
          name="telefone"
          value={estado.telefone}
        ></Input>
        {erro.telefone && (
          <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
        )}
      </ContainerInputs>
      <ContainerInputs>
        <Labels>Local de Atendimento:</Labels>
        <Input
          backgroundColor="#EAECFF"
          borderColor="black"
          placeholder="Insira o local de atendimento do(a) Médico(a)"
          color="black"
          fontSize="1em"
          width="100%"
          paddingRight="2%"
          onChange={preenchendoDados}
          erro={erro.nome}
          camposVazios={camposVazios.nome}
          name="local"
          value={estado.local}
        ></Input>
      </ContainerInputs>
      <Button
        gap="5px"
        backgroundColor={Cores.azul}
        fontSize="1.5em"
        width="80%"
        borderColor={Cores.azulEscuro}
        color={Cores.branco}
        paddingTop="5px"
        paddingBottom="5px"
        marginTop="10%"
        onClick = {alterar}
      >
        {carregandoCriacao ? (
								<Spin indicator={antIcon} />
							) : (
                    <div>Alterar Indicação</div>
                )}
         <PlusSquareOutlined />
      </Button>
    </Container>
  );
}

export default ModalAlterarIndicacao;
