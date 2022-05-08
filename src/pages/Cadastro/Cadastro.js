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
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";

function Cadastro() {
  const history = useHistory();
  const [estado, setEstado] = useState({});
  const [endereco, setEndereco] = useState({});
  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazio] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  async function verificandoEnter(e) {
    if (e.key === "Enter") {
      preenchendoDados();
    }
  }

  async function requisicaoCadastro() {
    if (estado.nome.length === 0) {
      setCamposVazio({ ...camposVazios, nome: true });
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

  function preenchendoDados(e) {
    if ((e.target.name === "cpf" || e.target.name === "telefone") &&
      e.target.value.length !== 11
    ) {
      setErro({ ...erro, [e.target.name]: true });
    } else {
      setErro({ ...erro, [e.target.name]: false });
    }
    setEstado({ ...estado, [e.target.name]: e.target.value });
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
          <Input
            placeholder="Nome Completo"
            status="error"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="nome"
            onChange={preenchendoDados}
            onKeyPress={verificandoEnter}
            camposVazios={camposVazios.nome}
          ></Input>
          <InputMesmaLinha>
            <Input
              placeholder="Telefone"
              backgroundColor="#E4E6F4"
              color="black"
              fontSize="1em"
              marginTop="2%"
              width="48%"
              name="telefone"
              onChange={preenchendoDados}
              onKeyPress={verificandoEnter}
              erro={erro.telefone}
              camposVazios={camposVazios.telefone}
            ></Input>
            <Input
              placeholder="Data de Nascimento"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="#807D7D"
              fontSize="1.25em"
              width="48%"
              marginTop="2%"
              name="data_nascimento"
              type="date"
              onChange={preenchendoDados}
              camposVazios={camposVazios.data_nascimento}
            ></Input>
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
            camposVazios={camposVazios.cpf}
          ></Input>
          <Input
            placeholder="Endereço de e-mail"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="email"
            onChange={preenchendoDados}
            camposVazios={camposVazios.email}
          ></Input>
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
            camposVazios={camposVazios.cep}
          ></Input>
          <Input
            placeholder="País"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="pais"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.pais}
          ></Input>
          <Select
            id="estado"
            name="estado"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="#8D8D8D"
            width="100%"
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
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="cidade"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.cidade}
          ></Input>
          <Input
            placeholder="Bairro"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="bairro"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.bairro}
          ></Input>
          <Input
            placeholder="Rua"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="rua"
            onChange={preenchendoEndereco}
            camposVazios={camposVazios.rua}
          ></Input>
          <InputMesmaLinha>
            <Input
              placeholder="Número"
              backgroundColor="#E4E6F4"
              borderColor="#151B57"
              color="black"
              fontSize="1em"
              width="48%"
              name="numero"
              onChange={preenchendoEndereco}
              camposVazios={camposVazios.numero}
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
            borderColor="#151B57"
            color="black"
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senha"
            id="senha"
            type="password"
            onChange={preenchendoDados}
            camposVazios={camposVazios.senha}
          ></Input>

          <Input
            placeholder="Confirme sua senha"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="black"
            width="100%"
            marginTop="2%"
            fontSize="1em"
            name="senhaConfirmada"
            id="senhaConfirmada"
            type="password"
            onChange={preenchendoDados}
            camposVazios={camposVazios.senhaConfirmada}
          ></Input>

          <Select
            id="tipos"
            backgroundColor="#E4E6F4"
            borderColor="#151B57"
            color="#8D8D8D"
            width="100%"
            name="tipo"
            onChange={preenchendoDados}
            camposVazios={camposVazios.tipo}
          >
            <option value="">Tipo de Usuário</option>
            <option value="SECRETARIA" borderColor="#151B57">
              Secretária
            </option>
            <option value="PACIENTE" borderColor="#151B57">
              Paciente
            </option>
          </Select>
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
