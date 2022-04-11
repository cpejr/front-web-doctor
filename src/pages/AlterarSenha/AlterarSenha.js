import React, { useEffect, useState } from "react";
import Input from "../../styles/Input";
import { useHistory } from "react-router-dom";
import Button from "../../styles/Button";
import {
  Conteudo,
  Caixa,
  InputVertical,
  BotoesMesmaLinha,
  Titulo,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";

function AlterarSenha() {
  const history = useHistory();

  const [confirmandoSenha, setConfirmandoSenha] = useState(true);
  const [confirmouSenha, setConfirmouSenha] = useState(false);
  const [alterador, setAlterador] = useState(true);

  useEffect(() => {
    if (alterador === true) {
      setConfirmandoSenha(true);
      setConfirmouSenha(false);
    } else if (alterador === false) {
      setConfirmandoSenha(false);
      setConfirmouSenha(true);
    }
  }, [alterador]);

  const [senhaAtual, setSenhaAtual] = useState("");
  const email = sessionStorage.getItem("@doctorapp-Email");

  async function conferirSenha() {
    //função que recebe como parâmetro a senha digitada e o email do usuário logado, 
    //retorna true como valor para alterador se as senhas forem diferentes, e false se as senhas forem iguais;
    setAlterador(await managerService.ConferirSenha(email, senhaAtual));
  }

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function trocarSenha() {
    //conferir se a "novaSenha" é igual a "confirmarSenha"; se for igual postar a nova senha do usuário; 
    //se não for igual alertar que as senhas digitadas não conferem
    if (novaSenha === confirmarSenha) {
      const resposta = await managerService.GetDadosUsuario(email);
      await managerService.AlterarSenha(novaSenha, resposta.dadosUsuario.id);
    } else {
      alert("As senhas digitadas são diferentes!");
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
                  backgroundColor="#E4E6F4"
                  borderColor="#151B57"
                  color="black"
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
                  backgroundColor="#FFFFFF"
                  borderColor="rgba(255, 0, 0, 0.25)"
                  color="#8D8D8D"
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
                  backgroundColor="#434B97"
                  borderColor="#151B57"
                  color="white"
                  fontSize="1.5em"
                  fontWeight="bold"
                  fontSizeMedia="1.2em"
                  fontSizeMedia950="1.1em"
                  boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                  onClick={() => conferirSenha()}
                >
                  CONFIRMAR
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
                  backgroundColor="#E4E6F4"
                  borderColor="#151B57"
                  color="black"
                  fontSize="1em"
                  width="100%"
                  marginTop="2%"
                  type="password"
                  name="senha"
                  onChange={(e) => setNovaSenha(e.target.value)}
                ></Input>
                <Input
                  placeholder="Confirme sua nova senha"
                  backgroundColor="#E4E6F4"
                  borderColor="#151B57"
                  color="black"
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
                  backgroundColor="#FFFFFF"
                  borderColor="rgba(255, 0, 0, 0.25)"
                  color="#8D8D8D"
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
                  backgroundColor="#434B97"
                  borderColor="#151B57"
                  color="white"
                  fontSize="1.5em"
                  fontWeight="bold"
                  fontSizeMedia="1.2em"
                  fontSizeMedia950="1.1em"
                  boxShadow="0 4px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                  onClick={() => trocarSenha()}
                >
                  ALTERAR
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
