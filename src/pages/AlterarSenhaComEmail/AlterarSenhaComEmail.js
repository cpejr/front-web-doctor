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

  const [email, setEmail] = useState();

  async function validacaoEmail(e) {
    setEmail(e.target.value);
    console.log(email);
  };

  async function alterarSenha() {
    const resposta = await managerService.GetDadosPessoais();
    let achei = 0;
    resposta.forEach((usuario) => {
      if (usuario.email === email) {
        achei++;
      }
    })
    if (achei) {
      toast.success("ATUMALAKA!");
      await sleep(3000);
      await managerService.EnviandoEmail(email);
    } else {
      toast.error("Email Inválido");
    }
  }

  return (
    <div>
      <Conteudo>
        <Caixa>
          <Titulo>Alterar Senha:</Titulo>
          <InputVertical>
            <Input
              placeholder="Digite seu e-mail registrado no DoctorApp"
              backgroundColor={Cores.cinza[7]}
              color={Cores.preto}
              fontSize="1em"
              width="100%"
              marginTop="2%"
              name="senhaAtual"
              // camposVazios={camposVazios.senhaAtual}
              // erro={erro.senhaAtual}
              onChange={validacaoEmail}
            // onKeyPress={conferirSenha}
            ></Input>
            {/* {erro.senhaAtual && <Rotulo>Insira seu e-mail de login!</Rotulo>} */}
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
              {/* {carregando ? <Spin indicator={antIcon} /> : "CONFIRMAR"} */} oi
            </Button>
          </BotoesMesmaLinha>
        </Caixa>
      </Conteudo>
      <AddToast />
    </div>
  );
}

export default AlterarSenhaComEmail;