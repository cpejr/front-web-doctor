import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Checkbox } from "antd";
import AddToast from "../AddToast/AddToast";
import { toast } from "react-toastify";
import { sleep } from "../../utils/sleep";
import {
  ContainerModalCodigo,
  Titulo,
  TextoCheckbox,
  SelectPaciente,
  SelectContainer,
  CheckboxContainer,
} from "./Styles";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import * as managerService from "../../services/ManagerService/managerService";

function ModalEnvioFormulario(props) {
  const [idUsuario, setIdUsuario] = useState();
  const [enviarNotificacao, setEnviarNotificacao] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 22, color: Cores.azul }} spin />
  );

  // useEffect(() => {
  //   setandoMensagem(formularioPaciente.tipo);
  // }, [formularioPaciente]);

  async function enviandoFormularioPaciente() {
    setCarregando(true);
    if (idUsuario) {
      if (enviarNotificacao === false) {
        await managerService.EnviandoFormularioPaciente(
          false,
          false,
          props.idFormulario,
          idUsuario
        );
        await sleep(2000);
        setCarregando(false);
        await sleep(1000);
        props.fechandoModal()

      } else if (enviarNotificacao === true) {
        await managerService.EnviandoFormularioPaciente(
          false,
          true,
          props.idFormulario,
          idUsuario
        );

        const Token =
          await managerService.TokenById(idUsuario);
        for (var i = 0; i <= Token.length - 1; i++) {
          const Message = {
            to: Token[i].token_dispositivo.replace("expo/", ''),
            sound: 'default',
            title: 'Doctor App',
            body: "Você tem um novo formulário enviado!",
          };

          fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            body: JSON.stringify(Message),
          }
          );
        }
        setCarregando(false);
        toast.success('Notificação encaminhada para o paciente.');
        setEnviarNotificacao(false)
        await sleep(1000);
        props.fechandoModal()
      };
    } else {
      toast.error("Escolha um paciente para enviar o formulario");
    }
  }

  async function preenchendoDados(e) {
    setIdUsuario(e);
  }

  const ordenarusuarios = (a, b) => {
		var nome1 = a.nome.toUpperCase();
		var nome2 = b.nome.toUpperCase();
	
		  if (nome1 > nome2) {
			return 1;
		  } else {
			return -1;
		  };
    }
    
  	function maiusculaMinuscula (match, input) {
      return match
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
        input
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .trim()
        );
      }

  return (
    <>
      <ContainerModalCodigo>
        <Titulo>Enviar formulário para:</Titulo>
        <SelectContainer borderWidth="2px" width="100%">
          <SelectPaciente
            name="id_usuario"
            marginTop="0px"
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            onChange={preenchendoDados}
            placeholder="Escolha o Paciente"
            showSearch
           					filterOption={(inputValue, option) =>
              				maiusculaMinuscula(option.children, inputValue)
            				}
          >
            {props.usuarios?.sort(ordenarusuarios).map((valor) => (
              <>
                <option value={valor.id}>{valor.nome}</option>
              </>
            ))}
          </SelectPaciente>
        </SelectContainer>
        <CheckboxContainer>
          <Checkbox
            status={enviarNotificacao ? "checked" : "unchecked"}
            onChange={() => {
              setEnviarNotificacao(!enviarNotificacao)
            }}
          >
            <TextoCheckbox>Notificar paciente</TextoCheckbox>
          </Checkbox>
        </CheckboxContainer>
        <Button
          width="100%"
          height="50px"
          backgroundColor="#434B97"
          borderColor="#151B57"
          color="white"
          marginTop="3.5%"
          fontSize="1.5em"
          fontWeight="bold"
          fontSizeMedia="1.2em"
          onClick={() => enviandoFormularioPaciente()}
        >
          {carregando ? <Spin indicator={antIcon} /> : "ENVIAR"}
        </Button>
      </ContainerModalCodigo>
    </>
  );
}

export default ModalEnvioFormulario;
