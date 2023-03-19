import React, { useState } from "react";
import { telefone, apenasLetras } from "../../utils/masks";
import { Titulo, Container, ContainerInputs, Labels, Rotulo } from "./Styles";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import { LoadingOutlined } from '@ant-design/icons';
import { PlusSquareOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import * as managerService from "../../services/ManagerService/managerService";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";

function ModalAdicionarIndicacao(props) {
  const [carregandoCriacao, setCarregandoCriacao] = useState(false);
  const [camposVazios, setCamposVazios] = useState({});
  const [id_indicacao_especifica, setIDindicacaoespecifica] = useState({});
  const history = useHistory();
  //setIDindicacaoespecifica(props.id_indicacao_especifica);
  console.log(props.idmedicoindicado);
  const [estado, setEstado] = useState({
    nome: "",
    telefone: "",
    local: "",
  });
  const [erro, setErro] = useState(false);
  const camposVaziosReferencia = {
    nome: false,
    telefone: false,
    local: false,
  };
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
  async function Indicar(e) {
    e.preventDefault();

    const camposVaziosAtual = {
      nome: !estado.nome,
      telefone: !estado.telefone,
      local: !estado.local
    };

    setCamposVazios(camposVaziosAtual);
    console.log(estado.telefone.length);
    if (!_.isEqual(camposVaziosAtual, camposVaziosReferencia)) {
      toast.warn("Preencha todos os campos");
      return;
    } else if (estado.telefone.length < 15) {
      toast.warn("Preencha todos os campos corretamente");
      return;
    }
    setCarregandoCriacao(true);
    const id = props.idmedicoindicado;

    await managerService.IndicandoMedicos(id, estado.nome, estado.telefone, estado.local, {
      mensagemSucesso: "Indicação realizada",
      tempo: 1500,
      onClose: () => {
        history.push("/web/edicaoindicacoesesugestoes");
      },
    });
    window.location.reload();
    setCarregandoCriacao(false);
  }

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 25 }} spin />
  );

  return (
    <Container>
      <Titulo>Adicionar Indicação:</Titulo>
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
          onChange={preenchendoDados}
          erro={erro.telefone}
          camposVazios={camposVazios.telefone}
          name="telefone"
          value={estado.telefone}
        ></Input>
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
          erro={erro.local}
          camposVazios={camposVazios.local}
          name="local"
          value={estado.local}
        ></Input>
      </ContainerInputs>

      <Button
        gap="5px"
        backgroundColor={Cores.azul}
        fontSize="1.5em"
        width="100%"
        borderColor={Cores.azulEscuro}
        color={Cores.branco}
        paddingTop="5px"
        paddingBottom="5px"
        marginTop="10%"
        onClick={Indicar}
      >
        {carregandoCriacao ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>Adicionar Indicação</div>
        )}

        <PlusSquareOutlined />
      </Button>
    </Container>
  );
}

export default ModalAdicionarIndicacao;
