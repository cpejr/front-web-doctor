import React, { useEffect, useState } from "react";
import Input from "../../styles/Input";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Conteudo,
  Caixa,
  InputVertical,
  BotoesMesmaLinha,
  Titulo,
} from "./Styles";
import Button from "../../styles/Button";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";

function AlterarSenha() {
  const history = useHistory();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [confirmandoSenha, setConfirmandoSenha] = useState(true);
  const [confirmouSenha, setConfirmouSenha] = useState(false);
  const [alterador, setAlterador] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const email = sessionStorage.getItem("@doctorapp-Email");

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
    setCarregando(true);
    setAlterador(await managerService.ConferirSenha(email, senhaAtual));
    setCarregando(false);
  }

  async function trocarSenha() {
    if (novaSenha === confirmarSenha) {
      setCarregando(true);
      const resposta = await managerService.GetDadosUsuario(email);
      await managerService.AlterarSenha(novaSenha, resposta.dadosUsuario.id);
      setCarregando(false);
    } else {
      alert("As senhas digitadas são diferentes!");
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
                  borderColor={Cores.azul}
                  color={Cores.preto}
                  fontSize="1em"
                  width="100%"
                  marginTop="2%"
                  type="password"
                  name="senhaatual"
                  onChange={(e) => setSenhaAtual(e.target.value)}
                ></Input>
              </InputVertical>
              <BotoesMesmaLinha>
                <Button
                  width="40%"
                  height="50px"
                  backgroundColor={Cores.branco}
                  borderColor="rgba(255, 0, 0, 0.25)"
                  color={Cores.cinza[1]}
                  fontSize="1.3em"
                  fontWeight="bold"
                  fontSizeMedia="1.1em"
                  fontSizeMedia950="1.0em"
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
                  fontSize="1.3em"
                  fontWeight="bold"
                  fontSizeMedia="1.1em"
                  fontSizeMedia950="1.0em"
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
