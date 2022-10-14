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
  CaixaMensagem,
  Logo,
  MensagemPacientePrincipal,
  MensagemPaciente,
  TituloDoInput,
} from "./Styles";
import logoGuilherme from "./../../assets/logoGuilherme.png";
import * as managerService from "../../services/ManagerService/managerService";
import { Cores } from "../../variaveis";
import AddToast from "../../components/AddToast/AddToast";
import { toast } from "react-toastify";
import { sleep, redirecionamento } from "../../utils/sleep";

function AlterarSenhaEsquecida() {
  const history = useHistory();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [carregando, setCarregando] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [tokenUsuario, setTokenUsuario] = useState("");

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);

  const [senhaAlterada, setSenhaAlterada] = useState(false);

  const errorsNovaSenha = {};
  const referenciaCamposNulosNovaSenha = {
    senha: false,
    confirmarSenha: false,
  };

  const urlParametro = new URLSearchParams(window.location.search);
  const token = urlParametro.get("token");

  useEffect(() => {
    setTokenUsuario(token);
  }, []);

  async function NovaSenha(e) {
    const { value, name } = e.target;
    setErro({ ...erro, [name]: false });

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    if (value.length < 8) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }

    if (name === "senha") {
      setNovaSenha(value);
    } else {
      setConfirmarSenha(value);
    }
  }

  async function verificandoTrocarSenha(e) {
    if (e.key === "Enter") {
      trocarSenha();
    }
  }

  async function trocarSenha() {
    if (!novaSenha) errorsNovaSenha.senha = true;
    setCamposVazios({ ...camposVazios, ...errorsNovaSenha });
    setErro({ ...erro, ...errorsNovaSenha });

    if (_.isEqual(camposVazios, referenciaCamposNulosNovaSenha)) {
      if (novaSenha === confirmarSenha) {
        if (novaSenha !== "" || confirmarSenha !== "") {
          setCarregando(true);
          const resposta = await managerService.GetDadosUsuarioPorToken(
            tokenUsuario
          );
          await managerService.AlterarSenha(
            novaSenha,
            resposta.dadosUsuario.id
          );
          await sleep(1500);
          if (resposta.dadosUsuario.tipo !== "PACIENTE") {
            redirecionamento("/web/perfil");
            setCarregando(false);
          } else {
            setSenhaAlterada(true);
            setCarregando(false);
          }
        } else {
          toast.error("As senhas digitadas são diferentes!");
          await sleep(1500);
          setCarregando(false);
        }
      } else {
        setCarregando(true);
        toast.warn("Insira uma nova senha!");
        setCarregando(false);
      }
    }
  }

  return (
    <div>
      {senhaAlterada === false ? (
        <Conteudo>
          <Caixa>
            <Titulo>Alterar Senha:</Titulo>
            <InputVertical>
            <TituloDoInput>Defina sua nova senha:</TituloDoInput>
              <Input
                placeholder="Defina sua nova senha"
                backgroundColor={Cores.cinza[7]}
                color={Cores.preto}
                fontSize="1em"
                width="100%"
                marginTop="2%"
                type="password"
                name="senha"
                camposVazios={camposVazios.senha}
                erro={erro.senha}
                onChange={NovaSenha}
              ></Input>
              {erro.senha && (
                <Rotulo>Insira uma nova senha com no minimo 8 digitos</Rotulo>
              )}
              <TituloDoInput>Confirme sua nova senha:</TituloDoInput>
              <Input
                placeholder="Confirme sua nova senha"
                backgroundColor={Cores.cinza[7]}
                color={Cores.preto}
                fontSize="1em"
                width="100%"
                marginTop="5%"
                type="password"
                name="confirmarSenha"
                camposVazios={camposVazios.confirmarSenha}
                erro={erro.confirmarSenha}
                onChange={NovaSenha}
                onKeyPress={verificandoTrocarSenha}
              ></Input>
              {erro.confirmarSenha && <Rotulo>Confirme sua nova senha</Rotulo>}
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
                onClick={() => history.push("/web/login")}
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
      ) : (
        <CaixaMensagem>
          <Logo>
            <img
              src={logoGuilherme}
              className="logo"
              alt="logoGuilherme"
              width="139px"
              height="160px"
            ></img>
          </Logo>
          <MensagemPacientePrincipal>
            Senha alterada com sucesso!
          </MensagemPacientePrincipal>
          <MensagemPaciente>
            Você já pode realizar o login no DoctorApp com sua nova senha
          </MensagemPaciente>
        </CaixaMensagem>
      )}
      <AddToast />
    </div>
  );
}

export default AlterarSenhaEsquecida;
