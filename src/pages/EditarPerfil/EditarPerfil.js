import React, { useEffect, useState } from "react";
import {
  ContainerEditarPerfil,
  ColunaEsquerda,
  ColunaDireita,
  AlterarDados,
  CaixaInputs,
  CaixaBotao,
  ImagemPerfil,
  BlocoSuperior,
  BlocoInferior,
  Rotulo,
  RotuloColuna,
} from "./Styles";
import Select from "../../styles/Select/Select";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";
import { brParaPadrao } from "../../utils/date";
import { toast } from "react-toastify";
import _ from "lodash";
import { sleep, redirecionamento } from "../../utils/sleep";

function EditarPerfil() {
  const history = useHistory();

  const email = sessionStorage.getItem("@doctorapp-Email");
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [enderecoNovo, setEnderecoNovo] = useState({});
  const [enderecoBack, setEnderecoBack] = useState({});
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState({
    cpf: false,
    telefone: false,
    cep: false,
    data_nascimento: false,
    email: false,
  });
  const [erroDataBack, setErroDataBack] = useState(false);
  const [tudoNulo, setTudoNulo] = useState({
    nome: true,
    cpf: true,
    email: true,
    telefone: true,
    cep: true,
    data_nascimento: true,
    pais: true,
    estado: true,
    cidade: true,
    rua: true,
    numero: true,
    bairro: true,
  });

  const [estado, setEstado] = useState({});
  const [estadoBack, setEstadoBack] = useState({});
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [cpfMasked, setCpfMasked] = useState({});
  const [dataMasked, setDataMasked] = useState({});
  const [telMasked, setTelMasked] = useState({});
  const [cepMasked, setCepMasked] = useState({});

  const errors = {};
  const referenciaFormatacao = {
    cpf: false,
    telefone: false,
    cep: false,
    data_nascimento: false,
    email: false,
  };
  const referenciaTudoNulo = {
    nome: true,
    cpf: true,
    email: true,
    telefone: true,
    cep: true,
    data_nascimento: true,
    pais: true,
    estado: true,
    cidade: true,
    rua: true,
    numero: true,
    bairro: true,
  };

  const maskCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const maskTelefone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)$/, "$1");
  };
  const maskApenasNumeros = (value) => {
    return value.replace(/\D/g, "");
  };
  const maskApenasNumerosCpfTel = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{11})(\d)/, "$1");
  };
  const maskApenasNumerosCep = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{8})(\d)/, "$1");
  };

  const maskData = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  const maskDataBack = (value) => {
    return brParaPadrao(value);
  };

  const maskApenasLetras = (value) => {
    return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
  };

  const maskCEP = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})(\d)/, "$1");
  };

  async function pegandoDados() {
    const resposta = await managerService.GetDadosUsuario(email);
    setUsuario(resposta.dadosUsuario);
    setTelefone(resposta.dadosUsuario.telefone);
    setCpf(resposta.dadosUsuario.cpf);
    setDataNascimento(resposta.dadosUsuario.data_nascimento);
    setEndereco(resposta.dadosEndereco);
    setCep(resposta.dadosEndereco.cep);
    setComplemento(resposta.dadosEndereco.complemento);
    setCarregando(false);
  }

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      atualizarDados();
    }
  }
  useEffect(() => {
    setCpfMasked(
      cpf.slice(+0, -8) +
        "." +
        cpf.slice(+3, -5) +
        "." +
        cpf.slice(+6, -2) +
        "-" +
        cpf.slice(-2)
    );
  }, [cpf]);
  useEffect(() => {
    setCepMasked(cep.slice(+0, -3) + "-" + cep.slice(-3));
  }, [cep]);
  useEffect(() => {
    setTelMasked(
      "(" +
        telefone.slice(0, -9) +
        ") " +
        telefone.slice(2, -4) +
        "-" +
        telefone.slice(-4)
    );
  }, [telefone]);
  useEffect(() => {
    setDataMasked(
      dataNascimento.slice(8, -14) +
        "/" +
        dataNascimento.slice(5, -17) +
        "/" +
        dataNascimento.slice(0, -20)
    );
  }, [dataNascimento]);

  useEffect(() => {
    if (!estadoBack.nome) errors.nome = true;
    if (!estadoBack.telefone) errors.telefone = true;
    if (!estadoBack.data_nascimento) errors.data_nascimento = true;
    if (!estadoBack.cpf) errors.cpf = true;
    if (!estadoBack.email) errors.email = true;
    if (!enderecoBack.cep) errors.cep = true;
    if (!enderecoBack.pais) errors.pais = true;
    if (!enderecoBack.estado) errors.estado = true;
    if (!enderecoBack.cidade) errors.cidade = true;
    if (!enderecoBack.bairro) errors.bairro = true;
    if (!enderecoBack.rua) errors.rua = true;
    if (!enderecoBack.numero) errors.numero = true;

    setTudoNulo({ ...tudoNulo, ...errors });
  }, [estadoBack]);

  async function atualizarDados() {
    setCarregando(true);
    if (!_.isEqual(tudoNulo, referenciaTudoNulo)) {
      if (_.isEqual(erro, referenciaFormatacao)) {
        await managerService.UpdateDadosUsuario(
          usuario.id,
          endereco.id,
          enderecoBack,
          estadoBack
        );
        sleep(1500);
        window.location.href = "/web/perfil";
      } else {
        toast.warn("Preencha os campos corretamente");
      }
    } else {
      toast.warn("Preencha algum campo");
    }
    setCarregando(false);
  }

  async function validacaoEmail(e) {
    const { value, name } = e.target;
    if (value) {
      setTudoNulo({ ...tudoNulo, [name]: false });
    }

    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(value)) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    if (value.length < 1) {
      setErro({ ...erro, [name]: false });
    }

    setEstadoBack({ ...estadoBack, [name]: value });
  }

  async function validacaoData(e) {
    const { value, name } = e.target;
    if (value) {
      setTudoNulo({ ...tudoNulo, [name]: false });
    }

    if (name === "data_nascimento" && value.length < 10 && value.length > -1) {
      setErro({ ...erro, [name]: true });
      setErroDataBack(false);
      if(value.length === 0) setErro({ ...erro, [name]: false });
    } else if (maskDataBack(value) === "Data Invalida") {
      setErro({ ...erro, [name]: true });
      setErroDataBack(true);
    } else {
      setErro({ ...erro, [name]: false });
    }

    setEstado({ ...estado, [name]: maskData(value) });
    setEstadoBack({ ...estadoBack, [name]: maskDataBack(value) });
  }

  function preenchendoDados(e) {
    const { name, value } = e.target;
    if (value) {
      setTudoNulo({ ...tudoNulo, [name]: false });
    }

    if (name === "data_nascimento") {
      e.target.value = maskData(value);
    }
    if (
      (name === "cpf" && value.length < 14 && value.length > 0) ||
      (name === "telefone" && value.length < 15 && value.length > 0)
    ) {
      setErro({ ...erro, [name]: true });
    } else if (name === "cpf" || name === "telefone") {
      setErro({ ...erro, [name]: false });
    }

    setEstado({ ...estado, [name]: value });
    setEstadoBack({ ...estadoBack, [name]: value });

    if (name === "nome") {
      setEstado({
        ...estado,
        [name]: maskApenasLetras(value),
      });
    }
    if (name === "cpf") {
      setEstado({ ...estado, [name]: maskCPF(value) });
      setEstadoBack({ ...estadoBack, [name]: maskApenasNumerosCpfTel(value) });
    }
    if (name === "telefone") {
      setEstado({ ...estado, [name]: maskTelefone(value) });
      setEstadoBack({ ...estadoBack, [name]: maskApenasNumerosCpfTel(value) });
    }
  }

  function preenchendoEndereco(e) {
    const { name, value } = e.target;
    if (value) {
      setTudoNulo({ ...tudoNulo, [name]: false });
    }

    if (name === "cep" && value.length <= 8 && value.length > 0) {
      setErro({ ...erro, [name]: true });
    } else if (name === "cep") {
      setErro({ ...erro, [name]: false });
    }

    setEnderecoNovo({ ...enderecoNovo, [name]: value });
    setEnderecoBack({ ...enderecoBack, [name]: value });

    if (name === "cep") {
      setEnderecoNovo({ ...enderecoNovo, [name]: maskCEP(value) });
      setEnderecoBack({
        ...enderecoBack,
        [name]: maskApenasNumerosCep(value),
      });
    }
    if (name === "pais" || name === "cidade" || name === "bairro") {
      setEnderecoNovo({
        ...enderecoNovo,
        [name]: maskApenasLetras(value),
      });
    }
    if (name === "numero") {
      setEnderecoNovo({
        ...enderecoNovo,
        [name]: maskApenasNumeros(value),
      });
    }
  }

  useEffect(() => {
    pegandoDados();
  }, []);

  return (
    <ContainerEditarPerfil>
      <ColunaEsquerda>
        <BlocoSuperior>
          <ImagemPerfil>
            <img
              src={fotoPerfil}
              className="fotoPerfil"
              alt="fotoPerfil"
              width="100%"
              height="90%"
            ></img>
          </ImagemPerfil>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="green"
            fontSize="1em"
            textDecoration="underline"
            height="10px"
            onClick={() => {}}
          >
            Alterar Foto de Perfil
          </Button>
        </BlocoSuperior>
        <BlocoInferior>
          <Button
            width="100%"
            backgroundColor={Cores.lilas[2]}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            height="50px"
            borderColor={Cores.azul}
            color={Cores.azul}
            onClick={() => {
              history.push("/web/alterarsenha");
            }}
          >
            ALTERAR SENHA
          </Button>
          <Button
            width="100%"
            backgroundColor={Cores.branco}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderColor={Cores.vermelho}
            height="50px"
            color={Cores.vermelho}
            onClick={() => {
              history.push("/web/perfil");
            }}
          >
            CANCELAR
          </Button>
        </BlocoInferior>
      </ColunaEsquerda>
      <ColunaDireita>
        <AlterarDados>Alterar Dados:</AlterarDados>
        <CaixaInputs>
          <Input
            placeholder={usuario.nome}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="nome"
            marginTop="2%"
            onChange={preenchendoDados}
          ></Input>
          <RotuloColuna>
            <Input
              placeholder={cpfMasked}
              backgroundColor={Cores.cinza[7]}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              name="cpf"
              erro={erro.cpf}
              value={estado.cpf}
              marginTop="2%"
              onChange={preenchendoDados}
            ></Input>
            {erro.cpf && (
              <Rotulo>Digite um CPF no formato xxx.xxx.xxx-xx</Rotulo>
            )}
          </RotuloColuna>
        </CaixaInputs>
        <CaixaInputs>
          <RotuloColuna>
            <Input
              placeholder={usuario.email}
              backgroundColor={Cores.cinza[7]}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              name="email"
              marginTop="2%"
              onChange={validacaoEmail}
              erro={erro.email}
            ></Input>
            {erro.email && (
              <Rotulo>Digite um email no formato email@email.com</Rotulo>
            )}
          </RotuloColuna>
          <RotuloColuna>
            <Input
              placeholder={telMasked}
              backgroundColor={Cores.cinza[7]}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              name="telefone"
              erro={erro.telefone}
              value={estado.telefone}
              marginTop="2%"
              onChange={preenchendoDados}
            ></Input>
            {erro.telefone && (
              <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
            )}
          </RotuloColuna>
        </CaixaInputs>
        <CaixaInputs>
          <RotuloColuna>
            <Input
              placeholder={dataMasked}
              backgroundColor={Cores.cinza[7]}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              name="data_nascimento"
              value={estado.data_nascimento}
              marginTop="2%"
              onChange={validacaoData}
              erro={erro.data_nascimento}
            ></Input>
            {erro.data_nascimento && (
              <>
                {erroDataBack ? (
                  <Rotulo>Digite uma data válida.</Rotulo>
                ) : (
                  <Rotulo>Digite uma data no formato xx/xx/xxxx</Rotulo>
                )}
              </>
            )}
          </RotuloColuna>
          <RotuloColuna>
            <Input
              placeholder={cepMasked}
              backgroundColor={Cores.cinza[7]}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              name="cep"
              erro={erro.cep}
              value={enderecoNovo.cep}
              marginTop="2%"
              onChange={preenchendoEndereco}
            ></Input>
            {erro.cep && <Rotulo>Digite um cep no formato xxxxx-xxx</Rotulo>}
          </RotuloColuna>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.pais}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="pais"
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
          <Select
            id="estado"
            name="estado"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="50%"
            borderWidth="1px"
            marginTop="2%"
            onChange={preenchendoEndereco}
          >
            <option value="">{endereco.estado}</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
            <option value="EX">Estrangeiro</option>
          </Select>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.cidade}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="cidade"
            value={enderecoNovo.cidade}
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder={endereco.bairro}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="bairro"
            value={enderecoNovo.bairro}
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder={endereco.rua}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="rua"
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
          <Input
            placeholder={endereco.numero}
            backgroundColor={Cores.cinza[7]}
            borderColor={Cores.preto}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color={Cores.preto}
            fontSize="1em"
            width="50%"
            name="numero"
            value={enderecoNovo.numero}
            marginTop="2%"
            onChange={preenchendoEndereco}
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          {complemento === null ? (
            <Input
              placeholder="Complemento: "
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.preto}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="49%"
              name="complemento"
              value={endereco.complemento}
              marginTop="2%"
              onChange={preenchendoEndereco}
              onKeyPress={verificandoEnter}
            ></Input>
          ) : (
            <Input
              placeholder={complemento}
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.preto}
              boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
              borderWidth="1px"
              color={Cores.preto}
              fontSize="1em"
              width="49%"
              name="complemento"
              marginTop="2%"
              onChange={preenchendoEndereco}
              onKeyPress={verificandoEnter}
            ></Input>
          )}
        </CaixaInputs>
        <CaixaBotao>
          <Button
            width="30%"
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            height="50px"
            color={Cores.branco}
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            fontSize="1.5em"
            fontWeight="bold"
            marginTop="2%"
            onClick={() => atualizarDados()}
          >
            {carregando ? <Spin indicator={antIcon} /> : <>CONFIRMAR</>}
          </Button>
        </CaixaBotao>
      </ColunaDireita>
    </ContainerEditarPerfil>
  );
}
export default EditarPerfil;
