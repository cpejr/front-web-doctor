import React, { useEffect, useState } from "react";
import Input from "../../styles/Input";
import { useHistory } from "react-router-dom";
import Button from "../../styles/Button";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";
import { Spin } from "antd";
import {
  Conteudo,
  Caixa,
  InputVertical,
  BotoesMesmaLinha,
  Titulo,
  Rotulo,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";
import { toast } from "react-toastify";

function AlterarSenha() {
  const history = useHistory();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [confirmandoSenha, setConfirmandoSenha] = useState(true);
  const [confirmouSenha, setConfirmouSenha] = useState(false);
  const [alterador, setAlterador] = useState(true);
  const [carregando, setCarregando] = useState(false);

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [senhaAtual, setSenhaAtual] = useState("");
  const email = sessionStorage.getItem("@doctorapp-Email");

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const errors = {};
  const referenciaCamposNulos = {
    senhaAtual: false,
  };

  useEffect(() => {
    if (alterador === true) {
      setConfirmandoSenha(true);
      setConfirmouSenha(false);
    } else if (alterador === false) {
      setConfirmandoSenha(false);
      setConfirmouSenha(true);
    }
  }, [alterador]);

  async function conferirSenha() {
    //função que recebe como parâmetro a senha digitada e o email do usuário logado,
    //retorna true como valor para alterador se as senhas forem diferentes, e false se as senhas forem iguais;
    if (!senhaAtual) errors.senhaAtual = true;
    setCamposVazios({ ...camposVazios, ...errors });

    if (_.isEqual(camposVazios, referenciaCamposNulos)) {
      setCarregando(true);
      const resposta = await managerService.ConferirSenha(email, senhaAtual);
      setAlterador(resposta);
      if (resposta === true) {
        setErro({ ...erro, senhaAtual: true });
      }
      setCarregando(false);
    } else {
      setErro({ ...erro, senhaAtual: true });
      setCarregando(true);
      toast.warn("Insira a senha atual!");
      setCarregando(false);
    }
  }

  async function ValidacaoSenhaAtual(e) {
    const { value, name } = e.target;
    setErro({ ...erro, senhaAtual: false });
    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }
    setSenhaAtual(value);
  }

  async function verificandoConferirSenha(e) {
    if (e.key === "Enter") {
      conferirSenha();
    }
  }
  async function verificandoTrocarSenha(e) {
    if (e.key === "Enter") {
      trocarSenha();
    }
  }

  async function trocarSenha() {
    //conferir se a "novaSenha" é igual a "confirmarSenha"; se for igual postar a nova senha do usuário;
    //se não for igual alertar que as senhas digitadas não conferem

    if (novaSenha === confirmarSenha) {
      setCarregando(true);
      const resposta = await managerService.GetDadosUsuario(email);
      await managerService.AlterarSenha(novaSenha, resposta.dadosUsuario.id);
      setCarregando(false);
    } else {
      toast.error("As senhas digitadas são diferentes!");
      await sleep(1500);
      window.location.reload();
      setCarregando(false);
    }
  }

  return (
    <div>
      {confirmandoSenha && (
        <div>
          <Conteudo>
            <Caixa>
              <Titulo>Alterar Senha:</Titulo>
              <InputVertical>
                <Input
                  placeholder="Confirme sua senha atual"
                  backgroundColor={Cores.cinza[7]}
                  color={Cores.preto}
                  fontSize="1em"
                  width="100%"
                  marginTop="2%"
                  type="password"
                  name="senhaAtual"
                  camposVazios={camposVazios.senhaAtual}
                  erro={erro.senhaAtual}
                  onChange={ValidacaoSenhaAtual}
                  onKeyPress={verificandoConferirSenha}
                ></Input>
                {erro.senhaAtual && <Rotulo>Insira sua senha atual!</Rotulo>}
              </InputVertical>
              <BotoesMesmaLinha>
                <Button
                  width="40%"
                  height="50px"
                  backgroundColor={Cores.branco}
                  borderColor="rgba(255, 0, 0, 0.25)"
                  color={Cores.cinza[1]}
                  fontSize="1.5em"
                  fontWeight="bold"
                  fontSizeMedia="1.2em"
                  fontSizeMedia950="1.1em"
                  boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                  onClick={() => history.push("/web/editarperfil")}
                >
                  CANCELAR
                </Button>
                <Button
                  height="50px"
                  width="40%"
                  backgroundColor={Cores.lilas[1]}
                  borderColor={Cores.azul}
                  color={Cores.branco}
                  fontSize="1.5em"
                  fontWeight="bold"
                  fontSizeMedia="1.2em"
                  fontSizeMedia950="1.1em"
                  boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                  onClick={() => conferirSenha()}
                >
                  {carregando ? <Spin indicator={antIcon} /> : "CONFIRMAR"}
                </Button>
              </BotoesMesmaLinha>
            </Caixa>
          </Conteudo>
        </div>
      )}
      {confirmouSenha && (
        <div>
          <Conteudo>
            <Caixa>
              <Titulo>Alterar Senha:</Titulo>
              <InputVertical>
                <Input
                  placeholder="Defina sua nova senha"
                  backgroundColor={Cores.cinza[7]}
                  borderColor={Cores.azul}
                  color={Cores.preto}
                  fontSize="1em"
                  width="100%"
                  marginTop="2%"
                  type="password"
                  name="senha"
                  onChange={(e) => setNovaSenha(e.target.value)}
                ></Input>
                <Input
                  placeholder="Confirme sua nova senha"
                  backgroundColor={Cores.cinza[7]}
                  borderColor={Cores.azul}
                  color={Cores.preto}
                  fontSize="1em"
                  width="100%"
                  marginTop="5%"
                  type="password"
                  name="confirmarSenha"
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  onKeyPress={verificandoTrocarSenha}
                ></Input>
              </InputVertical>
              <BotoesMesmaLinha>
                <Button
                  width="40%"
                  height="50px"
                  backgroundColor={Cores.branco}
                  borderColor="rgba(255, 0, 0, 0.25)"
                  color={Cores.cinza[1]}
                  fontSize="1.5em"
                  fontWeight="bold"
                  fontSizeMedia="1.2em"
                  fontSizeMedia950="1.1em"
                  boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                  onClick={() => history.push("/web/editarperfil")}
                >
                  CANCELAR
                </Button>
                <Button
                  height="50px"
                  width="40%"
                  backgroundColor={Cores.lilas[1]}
                  borderColor={Cores.azul}
                  color={Cores.branco}
                  fontSize="1.5em"
                  fontWeight="bold"
                  fontSizeMedia="1.2em"
                  fontSizeMedia950="1.1em"
                  boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                  onClick={() => trocarSenha()}
                >
                  {carregando ? <Spin indicator={antIcon} /> : "ALTERAR"}
                </Button>
              </BotoesMesmaLinha>
            </Caixa>
          </Conteudo>
        </div>
      )}
    </div>
  );
}

export default AlterarSenha;
