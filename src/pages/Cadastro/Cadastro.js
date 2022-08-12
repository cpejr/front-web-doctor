import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { Spin, Switch } from "antd";
import { LoadingOutlined, LeftOutlined } from "@ant-design/icons";
import "react-toastify/dist/ReactToastify.min.css";
import AddToast from "../../components/AddToast/AddToast";
import { toast } from "react-toastify";
import {
  Body,
  DadosCadastro,
  Logo,
  InputMesmaLinha,
  Rotulo,
  InputMesmaLinha2,
  Botao,
  RotuloColuna,
  PossuiConvenio,
  PossuiCuidador,
} from "./Styles";
import { Cores } from "../../variaveis";
import {
  cpf,
  apenasLetras,
  apenasNumeros,
  apenasNumerosCep,
  apenasNumerosCpfTel,
  cep,
  data,
  telefone,
  dataBack,
} from "../../utils/masks";
import { sleep } from "../../utils/sleep";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import { recebeTipo, usuarioAutenticado } from "../../services/auth";
import * as managerService from "../../services/ManagerService/managerService";

function Cadastro(props) {
  const history = useHistory();

  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const [erroDataBack, setErroDataBack] = useState(false);

  const [enderecoBack, setEnderecoBack] = useState({});
  const [estado, setEstado] = useState({});

  const [carregando, setCarregando] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [convenio, setConvenio] = useState(false);
  const [cuidador, setCuidador] = useState(false);

  const [teste, setTeste] = useState({
    nome: false,
    telefone: false,
    email: false,
    cep: false,
    pais: false,
    estado: false,
    cidade: false,
    rua: false,
    numero: false,
    cpf: false,
    data_nascimento: false,
    bairro: false,
    senha: false,
    senhaConfirmada: false,
  });

  function funcaoConvenio() {
    setConvenio(!convenio);
    setUsuario({ ...usuario, convenio: null });
  }
  function funcaoCuidador() {
    setCuidador(!cuidador);
    setUsuario({ ...usuario, nome_cuidador: null, telefone_cuidador: null });
  }

  function verificaAutenticacao() {
    if (usuarioAutenticado() === false) {
      window.location.href = "/login";
    }
  }

  function setandoTipoPorProps() {
    if (history.location.state !== undefined) {
      setUsuario({
        ...usuario,
        tipo: props.location.state.tipo,
        nome_cuidador: null,
        telefone_cuidador: null,
        convenio: null,
      });
      setConvenio(false);
      setCuidador(false);
    } else if (
      history.location.state === undefined &&
      recebeTipo() === "SECRETARIA(O)"
    ) {
      setUsuario({
        ...usuario,
        tipo: "PACIENTE",
        nome_cuidador: null,
        telefone_cuidador: null,
        convenio: null,
      });
      setConvenio(false);
      setCuidador(false);
    } else if (
      history.location.state === undefined &&
      recebeTipo() === "MASTER"
    ) {
      setTeste({ ...teste, tipo: false });
    }
  }

  useEffect(() => {
    setandoTipoPorProps();
  }, [props]);

  useEffect(() => {
    verificaAutenticacao();
  }, []);

  const errors = {};

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      requisicaoCadastro();
    }
  }

  async function requisicaoCadastro() {
    if (!usuario.nome) errors.nome = true;
    if (!usuario.telefone) errors.telefone = true;
    if (!usuario.tipo) errors.tipo = true;
    if (!usuario.data_nascimento) errors.data_nascimento = true;
    if (!usuario.cpf) errors.cpf = true;
    if (!usuario.email) errors.email = true;
    if (!enderecoBack.cep) errors.cep = true;
    if (!enderecoBack.pais) errors.pais = true;
    if (!enderecoBack.estado) errors.estado = true;
    if (!enderecoBack.cidade) errors.cidade = true;
    if (!enderecoBack.bairro) errors.bairro = true;
    if (!enderecoBack.rua) errors.rua = true;
    if (!enderecoBack.numero) errors.numero = true;
    if (!usuario.senha) errors.senha = true;
    if (!usuario.senhaConfirmada) errors.senhaConfirmada = true;
    if (erro.data_nascimento === true) errors.data_nascimento = true;
    if (erro.email === true) errors.email = true;

    setCamposVazios({ ...camposVazios, ...errors });

    if (_.isEqual(camposVazios, teste)) {
      if (usuario.senha === usuario.senhaConfirmada) {
        setCarregando(true);
        await managerService.Cadastrando(usuario, enderecoBack);
        await sleep(1500);
        window.location.href = "/login";
        setCarregando(false);
      } else {
        toast.error("As senhas digitadas são diferentes.");
        setCarregando(false);
      }
    } else {
      toast.error("Preencha todos os campos obrigatórios");
    }
  }

  async function validacaoEmail(e) {
    const { value, name } = e.target;
    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    }

    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(value)) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    setUsuario({ ...usuario, [name]: value });
  }

  async function validacaoData(e) {
    const { value, name } = e.target;
    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    }

    if (name === "data_nascimento" && value.length < 10) {
      setErro({ ...erro, [name]: true });
      setErroDataBack(false);
    } else if (dataBack(value) === "Data Invalida") {
      setErro({ ...erro, [name]: true });
      setErroDataBack(true);
    } else {
      setErro({ ...erro, [name]: false });
    }

    setEstado({ ...estado, [name]: data(value) });
    setUsuario({ ...usuario, [name]: dataBack(value) });
  }

  function preenchendoDados(e) {
    const { value, name } = e.target;
    if (
      name !== "convenio" &&
      name !== "nome_cuidador" &&
      name !== "telefone_cuidador"
    ) {
      if (value) setCamposVazios({ ...camposVazios, [name]: false });
    }
    if (name === "nome_cuidador") {
      e.target.value = apenasLetras(value);
    }
    if (name === "telefone_cuidador") {
      e.target.value = telefone(value);
    }
    if (
      (name === "cpf" && value.length < 14) ||
      (name === "telefone" && value.length < 15) ||
      ((name === "senha" || name === "senhaConfirmada") && value.length < 8)
    ) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    setUsuario({ ...usuario, [name]: value });
    setEstado({ ...estado, [name]: value });

    if (name === "nome") {
      setEstado({
        ...estado,
        [name]: apenasLetras(value),
      });
    }

    if (name === "telefone") {
      setEstado({ ...estado, [name]: telefone(value) });
      setUsuario({ ...usuario, [name]: apenasNumerosCpfTel(value) });
    }
    if (name === "telefone_cuidador") {
      setEstado({ ...estado, [name]: telefone(value) });
      setUsuario({ ...usuario, [name]: apenasNumerosCpfTel(value) });
    }
    if (name === "cpf") {
      setEstado({ ...estado, [name]: cpf(value) });
      setUsuario({ ...usuario, [name]: apenasNumerosCpfTel(value) });
    }
    if (name === "tipo") {
      setUsuario({
        ...usuario,
        [name]: value,
        nome_cuidador: null,
        telefone_cuidador: null,
        convenio: null,
      });
      setConvenio(false);
      setCuidador(false);
    }
  }

  function preenchendoEndereco(e) {
    const { value, name } = e.target;
    if (name !== "complemento") {
      if (value) setCamposVazios({ ...camposVazios, [name]: false });
    }

    if (name === "cep" && value.length <= 8) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }
    setEndereco({ ...endereco, [name]: value });
    setEnderecoBack({ ...enderecoBack, [name]: value });

    if (name === "cep") {
      setEndereco({ ...endereco, [name]: cep(value) });
      setEnderecoBack({
        ...enderecoBack,
        [name]: apenasNumerosCep(value),
      });
    }
    if (name === "pais") {
      setEndereco({
        ...endereco,
        [name]: apenasLetras(value),
      });
    }
    if (name === "cidade") {
      setEndereco({
        ...endereco,
        [name]: apenasLetras(value),
      });
    }
    if (name === "numero") {
      setEndereco({
        ...endereco,
        [name]: apenasNumeros(value),
      });
    }
  }

  return (
    <div>
      <Body>
        <DadosCadastro>
          <Logo>
            <img
              src={logoGuilherme}
              className="logo"
              alt="logoGuilherme"
              width="100%"
              height="100%"
            ></img>
          </Logo>
          <Botao onClick={() => history.push("/login")}>
            <LeftOutlined /> Voltar para login
          </Botao>
          {history.location.state === undefined && recebeTipo() === "MASTER" ? (
            <Select
              id="tipos"
              backgroundColor={Cores.cinza[7]}
              color={Cores.preto}
              borderWidth="2px"
              width="100%"
              name="tipo"
              onChange={preenchendoDados}
              camposVazios={camposVazios.tipo}
            >
              <option value="">Tipo de Usuário</option>
              <option value="SECRETARIA(O)" borderColor={Cores.azul}>
                Secretária(o)
              </option>
              <option value="PACIENTE" borderColor={Cores.azul}>
                Paciente
              </option>
            </Select>
          ) : (
            <></>
          )}

          <Input
            placeholder="Nome Completo"
            status="error"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="nome"
            value={estado.nome}
            onChange={preenchendoDados}
            erro={erro.nome}
            camposVazios={camposVazios.nome}
          ></Input>
          <InputMesmaLinha>
            <RotuloColuna>
              <Input
                placeholder="Telefone"
                backgroundColor={Cores.cinza[7]}
                color={Cores.preto}
                fontSize="1em"
                marginTop="2%"
                width="100%"
                name="telefone"
                value={estado.telefone}
                onChange={preenchendoDados}
                onKeyPress={verificandoEnter}
                erro={erro.telefone}
                camposVazios={camposVazios.telefone}
              ></Input>
              {erro.telefone && (
                <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
              )}
            </RotuloColuna>
            <RotuloColuna>
              <Input
                placeholder="Data de Nascimento"
                backgroundColor={Cores.cinza[7]}
                color={Cores.preto}
                fontSize="1em"
                width="100%"
                marginTop="2%"
                name="data_nascimento"
                value={estado.data_nascimento}
                onChange={validacaoData}
                erro={erro.data_nascimento}
                camposVazios={camposVazios.data_nascimento}
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
          </InputMesmaLinha>

          <Input
            placeholder="CPF"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            name="cpf"
            value={estado.cpf}
            onChange={preenchendoDados}
            erro={erro.cpf}
            camposVazios={camposVazios.cpf}
          ></Input>
          {erro.cpf && <Rotulo>Digite um CPF no formato xxx.xxx.xxx-xx</Rotulo>}
          <Input
            placeholder="Endereço de e-mail"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="email"
            onChange={validacaoEmail}
            erro={erro.email}
            camposVazios={camposVazios.email}
          ></Input>
          {erro.email && (
            <Rotulo>Digite um email no formato email@email.com</Rotulo>
          )}

          {usuario.tipo === "PACIENTE" && (
            <>
              <PossuiConvenio>
                {" "}
                Possui Convênio?
                <Switch onChange={funcaoConvenio}></Switch>
              </PossuiConvenio>
              {convenio && (
                <Input
                  placeholder="Nome do Convênio"
                  backgroundColor={Cores.cinza[7]}
                  borderColor={Cores.azul}
                  color={Cores.preto}
                  fontSize="1em"
                  width="100%"
                  marginTop="2%"
                  name="convenio"
                  onChange={preenchendoDados}
                ></Input>
              )}

              <PossuiCuidador>
                {" "}
                Possui Cuidador?<Switch onChange={funcaoCuidador}></Switch>
              </PossuiCuidador>

              {cuidador && (
                <>
                  <Input
                    placeholder="Nome Cuidador"
                    backgroundColor={Cores.cinza[7]}
                    borderColor={Cores.azul}
                    color={Cores.preto}
                    fontSize="1em"
                    width="100%"
                    marginTop="2%"
                    name="nome_cuidador"
                    onChange={preenchendoDados}
                  ></Input>
                  <Input
                    placeholder="Telefone Cuidador"
                    backgroundColor={Cores.cinza[7]}
                    borderColor={Cores.azul}
                    color={Cores.preto}
                    fontSize="1em"
                    width="100%"
                    marginTop="2%"
                    name="telefone_cuidador"
                    onChange={preenchendoDados}
                  ></Input>
                </>
              )}
            </>
          )}

          <Input
            placeholder="CEP"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cep"
            value={endereco.cep}
            onChange={preenchendoEndereco}
            erro={erro.cep}
            camposVazios={camposVazios.cep}
          ></Input>
          {erro.cep && <Rotulo>Digite um CEP no formato xx.xxx-xxx</Rotulo>}
          <Input
            placeholder="País"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="pais"
            value={endereco.pais}
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.pais}
          ></Input>
          <Select
            id="estado"
            name="estado"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="100%"
            borderWidth="2px"
            marginTop="2%"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.estado}
          >
            <option value="">Estado</option>
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
          <Input
            placeholder="Cidade"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cidade"
            value={endereco.cidade}
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.cidade}
          ></Input>
          <Input
            placeholder="Bairro"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="bairro"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.bairro}
          ></Input>
          <Input
            placeholder="Rua"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="rua"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.rua}
          ></Input>
          <InputMesmaLinha2>
            <Input
              placeholder="Número"
              backgroundColor={Cores.cinza[7]}
              color={Cores.preto}
              fontSize="1em"
              width="48%"
              name="numero"
              value={endereco.numero}
              onChange={preenchendoEndereco}
              camposVazios={camposVazios.numero}
            ></Input>
            <Input
              placeholder="Complemento"
              backgroundColor={Cores.cinza[7]}
              borderColor={Cores.azul}
              color={Cores.preto}
              fontSize="1em"
              width="48%"
              marginTop="2%"
              name="complemento"
              onChange={preenchendoEndereco}
            ></Input>
          </InputMesmaLinha2>

          <Input
            placeholder="Defina sua senha"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senha"
            id="senha"
            type="password"
            onChange={preenchendoDados}
            erro={erro.senha}
            camposVazios={camposVazios.senha}
          ></Input>
          {erro.senha && <Rotulo>A senha deve ter no minimo 8 digitos</Rotulo>}
          <Input
            placeholder="Confirme sua senha"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senhaConfirmada"
            id="senhaConfirmada"
            type="password"
            onChange={preenchendoDados}
            onKeyPress={verificandoEnter}
            erro={erro.senhaConfirmada}
            camposVazios={camposVazios.senhaConfirmada}
          ></Input>
          {erro.senhaConfirmada && (
            <Rotulo>A senha deve ter no minimo 8 digitos</Rotulo>
          )}

          <Button
            height="50px"
            width="60%"
            backgroundColor={Cores.lilas[1]}
            borderColor={Cores.azul}
            color={Cores.branco}
            fontSize="1.5em"
            fontSizeMedia="1.2em"
            onClick={() => requisicaoCadastro()}
            fontWeight="bold"
          >
            {carregando ? <Spin indicator={antIcon} /> : "CADASTRAR"}
          </Button>
        </DadosCadastro>
      </Body>
      <AddToast />
    </div>
  );
}

export default Cadastro;
