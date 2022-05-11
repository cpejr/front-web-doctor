import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Body,
  DadosCadastro,
  Logo,
  InputMesmaLinha,
  BotoesMesmaLinha,
  Rotulo,
  RotuloColuna,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";

function Cadastro() {
  const history = useHistory();
  const [usuario, setUsuario] = useState({});
  const [endereco, setEndereco] = useState({});
  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState(false);
  const [tipo, setTipo] = useState(false);
  const [nome, setNome] = useState(false);
  const [telefone, setTelefone] = useState(false);  
  const [dataNascimento, setDataNascimento] = useState(false);
  const [cpf, setCpf] = useState(false);
  const [email, setEmail] = useState(false);
  const [cep, setCep] = useState(false);
  const [pais, setPais] = useState(false);
  const [estado, setEstado] = useState(false);
  const [bairro, setBairro] = useState(false);
  const [rua, setRua] = useState(false);
  const [numero, setNumero] = useState(false);
  const [cidade, setCidade] = useState(false);
  const [senha, setSenha] = useState(false);
  const [senhaConfirmada, setSenhaConfirmada] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      requisicaoCadastro();
    }
  }

  async function requisicaoCadastro() {
    if(usuario.nome === undefined){
      setNome(true);
    }
    if(usuario.telefone === undefined){
      setTelefone(true);
    }
    if(usuario.cpf === undefined){
      setCpf(true);
    }
    if(usuario.email === undefined){
      setEmail(true);
    }
    if(usuario.dataNascimento === undefined){
      setDataNascimento(true);
    }
    if(usuario.senha === undefined){
      setSenha(true);
    }
    if(usuario.senhaConfirmada === undefined){
      setSenhaConfirmada(true);
    }
    if(usuario.tipo === undefined){
      setTipo(true);
    }
    if(endereco.cep === undefined){
      setCep(true);
    }
    if(endereco.rua === undefined){
      setRua(true);
    }
    if(endereco.pais === undefined){
      setPais(true);
    }
    if(endereco.bairro === undefined){
      setBairro(true);
    }
    if(endereco.estado === undefined){
      setEstado(true);
    }
    if(endereco.numero === undefined){
      setNumero(true);
    }
    if(endereco.cidade === undefined){
      setCidade(true);
    }
  
    if (estado.senha === estado.senhaConfirmada) {
      setCarregando(true);
      await managerService.Cadastrando(estado, endereco);
      setCarregando(false);
    } else {
      alert("As senhas digitadas são diferentes.");
      setCarregando(false);
    }
  }

  async function validacaoEmail(e) {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(e.target.value)) {
      console.log("a");
      setErro({ ...erro, [e.target.name]: true });
      console.log(erro.email);
    } else {
      setErro({ ...erro, [e.target.name]: false });
    }

    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function preenchendoDados(e) {
    if (
      ((e.target.name === "cpf" || e.target.name === "telefone") &&
        e.target.value.length !== 11) ||
      (e.target.name === "data_nascimento" && e.target.value.length !== 10) ||
      ((e.target.name === "senha" || e.target.name === "senhaConfirmada") &&
        e.target.value.length < 6)
    ) {
      setErro({ ...erro, [e.target.name]: true });
    } else {
      setErro({ ...erro, [e.target.name]: false });
    }

    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function preenchendoEndereco(e) {
    if (e.target.name === "cep" && e.target.value.length !== 8) {
      setErro({ ...erro, [e.target.name]: true });
    } else {
      setErro({ ...erro, [e.target.name]: false });
    }
    setEndereco({ ...endereco, [e.target.name]: e.target.value });
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
          <Select
            id="tipos"
            backgroundColor="#E4E6F4"
            color="#8D8D8D"
            width="100%"
            name="tipo"
            onChange={preenchendoDados}
            camposVazios={tipo}
          >
            <option value="">Tipo de Usuário</option>
            <option value="SECRETARIA" borderColor="#151B57">
              Secretária
            </option>
            <option value="PACIENTE" borderColor="#151B57">
              Paciente
            </option>
          </Select>
          <Input
            placeholder="Nome Completo"
            status="error"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="nome"
            onChange={preenchendoDados}
            onKeyPress={verificandoEnter}
            erro={erro.nome}
            camposVazios={nome}
          ></Input>
          <InputMesmaLinha>
            <RotuloColuna>
              <Input
                placeholder="Telefone"
                backgroundColor="#E4E6F4"
                color="black"
                fontSize="1em"
                marginTop="2%"
                width="100%"
                name="telefone"
                onChange={preenchendoDados}
                onKeyPress={verificandoEnter}
                erro={erro.telefone}
                camposVazios={telefone}
              ></Input>
              {erro.telefone && (
                <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
              )}
            </RotuloColuna>
            <RotuloColuna>
              <Input
                placeholder="Data de Nascimento"
                backgroundColor="#E4E6F4"
                color="#807D7D"
                fontSize="1.25em"
                width="100%"
                marginTop="2%"
                name="data_nascimento"
                type="date"
                onChange={preenchendoDados}
                erro={erro.data_nascimento}
                camposVazios={dataNascimento}
              ></Input>

              {erro.data_nascimento && (
                <Rotulo>Digite uma data no formato xx/xx/xxxx</Rotulo>
              )}
            </RotuloColuna>
          </InputMesmaLinha>

          <Input
            placeholder="CPF"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            name="cpf"
            onChange={preenchendoDados}
            erro={erro.cpf}
            camposVazios={cpf}
          ></Input>
          {erro.cpf && <Rotulo>Digite um CPF no formato xxx.xxx.xxx-xx</Rotulo>}
          <Input
            placeholder="Endereço de e-mail"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="email"
            onChange={validacaoEmail}
            erro={erro.email}
            camposVazios={email}
          ></Input>
          {erro.email && (
            <Rotulo>Digite um email no formato email@email.com</Rotulo>
          )}
          <Input
            placeholder="CEP"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cep"
            onChange={preenchendoEndereco}
            erro={erro.cep}
            camposVazios={cep}
          ></Input>
          {erro.cep && <Rotulo>Digite um CEP no formato xx.xxx-xxx</Rotulo>}
          <Input
            placeholder="País"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="pais"
            onChange={preenchendoEndereco}
            camposVazios={pais}
          ></Input>
          <Select
            id="estado"
            name="estado"
            backgroundColor="#E4E6F4"
            color="#8D8D8D"
            width="100%"
            marginTop="2%"
            onChange={preenchendoEndereco}
            camposVazios={estado}
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
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cidade"
            onChange={preenchendoEndereco}
            camposVazios={cidade}
          ></Input>
          <Input
            placeholder="Bairro"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="bairro"
            onChange={preenchendoEndereco}
            camposVazios={bairro}
          ></Input>
          <Input
            placeholder="Rua"
            backgroundColor="#E4E6F4"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="rua"
            onChange={preenchendoEndereco}
            camposVazios={rua}
          ></Input>
          <InputMesmaLinha>
            <Input
              placeholder="Número"
              backgroundColor="#E4E6F4"
              color="black"
              fontSize="1em"
              width="48%"
              name="numero"
              onChange={preenchendoEndereco}
              camposVazios={numero}
            ></Input>
            <Input
              placeholder="Complemento"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="black"
              fontSize="1em"
              width="48%"
              name="complemento"
              onChange={preenchendoEndereco}
            ></Input>
          </InputMesmaLinha>

          <Input
            placeholder="Defina sua senha"
            backgroundColor="#E4E6F4"
            color="black"
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senha"
            id="senha"
            type="password"
            onChange={preenchendoDados}
            erro={erro.senha}
            camposVazios={senha}
          ></Input>
          {erro.senha && <Rotulo>A senha deve ter no minimo 6 digitos</Rotulo>}
          <Input
            placeholder="Confirme sua senha"
            backgroundColor="#E4E6F4"
            color="black"
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senhaConfirmada"
            id="senhaConfirmada"
            type="password"
            onChange={preenchendoDados}
            erro={erro.senhaConfirmada}
            camposVazios={senhaConfirmada}
          ></Input>
          {erro.senhaConfirmada && (
            <Rotulo>A senha deve ter no minimo 6 digitos</Rotulo>
          )}

          <BotoesMesmaLinha>
            <Button
              width="42%"
              height="50px"
              backgroundColor="#FFFFFF"
              borderColor="rgba(255, 0, 0, 0.25)"
              color="#8D8D8D"
              fontSize="1.5em"
              fontWeight="bold"
              fontSizeMedia="1.2em"
              onClick={() => history.push("/login")}
            >
              CANCELAR
            </Button>
            <Button
              height="50px"
              width="42%"
              backgroundColor="#434B97"
              borderColor="#151B57"
              color="white"
              fontSize="1.5em"
              fontWeight="bold"
              fontSizeMedia="1.2em"
              onClick={() => requisicaoCadastro()}
            >
              {carregando ? <Spin indicator={antIcon} /> : "ENTRAR"}
            </Button>
          </BotoesMesmaLinha>
        </DadosCadastro>
      </Body>
    </div>
  );
}

export default Cadastro;
