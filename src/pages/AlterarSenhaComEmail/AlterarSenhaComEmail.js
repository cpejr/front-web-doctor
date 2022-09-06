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
import AddToast from "../../components/AddToast/AddToast";
import { toast } from "react-toastify";
import { sleep, redirecionamento } from "../../utils/sleep";

function AlterarSenhaComEmail() {
  const history = useHistory();
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [carregando, setCarregando] = useState(false);

  const [email, setEmail] = useState();

  const [erro, setErro] = useState(false);
  const [camposVazios, setCamposVazios] = useState(false);
  const errors = {};
  const referenciaCamposNulos = {
    email: false,
  };

  async function validacaoEmail(e) {
    const { value, name } = e.target;

    if (value) {
      setCamposVazios({ ...camposVazios, [name]: false });
    } else {
      setCamposVazios({ ...camposVazios, [name]: true });
    }

    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(value)) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }
    
    setEmail(value);
  };

  async function alterarSenha() {
    if (!email) errors.email = true;

    setCamposVazios({ ...camposVazios, ...errors });

    if (_.isEqual(camposVazios, referenciaCamposNulos)) {
    setCarregando(true);
    const resposta = await managerService.GetDadosPessoais();
    let achei = 0;
    resposta.forEach((usuario) => {
      if (usuario.email === email) {
        achei++;
      }
    })

    if (achei) {
      toast.warn("Aguarde um pouco.");
      await sleep(3000);
      await managerService.EnviandoEmail(email);
      setCarregando(false);
    } else {
      toast.error("Esse e-mail não está cadastrado.");
      setCarregando(false);
    }
  } else {
    setCarregando(true);
      toast.warn("Preencha com um email.");
      setCarregando(false);
  }
  }

  return (
    <div>
      <Conteudo>
        <Caixa>
          <Titulo>Recuperação de senha:</Titulo>
          <InputVertical>
            <Input
              placeholder="Digite seu e-mail registrado no DoctorApp"
              backgroundColor={Cores.cinza[7]}
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              marginTop="2%"
              name="email"
              value={email}
              camposVazios={camposVazios.email}
              erro={erro.email}
              onChange={validacaoEmail}
            ></Input>
            {erro.email && (
            <Rotulo>Digite um email no formato email@email.com</Rotulo>
          )}
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
              onClick={() => history.push("/login")}
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
              onClick={() => alterarSenha()}
            >
               {carregando ? <Spin indicator={antIcon} /> : "CONFIRMAR"}
            </Button>
          </BotoesMesmaLinha>
        </Caixa>
      </Conteudo>
      <AddToast />
    </div>
  );
}

export default AlterarSenhaComEmail;