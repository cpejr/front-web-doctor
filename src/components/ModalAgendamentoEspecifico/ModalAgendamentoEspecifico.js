import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Container,
  InfoEsquerdaEDireita,
} from "./Styles";
import * as managerService from "../../services/ManagerService/managerService";
import ModalAgendamentoConsulta from "../ModalAgendamentoConsulta";
import ModalAgendamentoExame from "../ModalAgendamentoExame";

function ModalAgendamentoEspecifico(props) {
  const [usuario, setUsuario] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [tipoRadio, setTipoRadio] = useState(String(props.tipoRadio).toLowerCase());

  async function pegandoPacientes() {
    if (props.abertoPeloUsuario) {
      const resposta = await managerService.GetDadosUsuario(props.emailUsuario);
      setUsuario(resposta.dadosUsuario);
    } else {
      const resposta = await managerService.GetDadosPessoaisAlfabetico();
      resposta.forEach((usuario) => {
        if (usuario.tipo === "PACIENTE") {
          setUsuarios((usuarios) => [...usuarios, usuario]);
        }
      });
    }
  }

  useEffect(() => {
    pegandoPacientes();
    return () => {
      setUsuarios([]);
    }
  }, [props]);

  return (
    <Container>
      <InfoEsquerdaEDireita>
        {tipoRadio === "exame" ? (
          <ModalAgendamentoExame
            abertoPeloUsuario={props.abertoPeloUsuario}
            usuario={usuario}
            usuarios={usuarios}
            fechandoModal={() => props.fechandoModal()}
            trocarTipo={(e) => setTipoRadio(e)}
          />
        ) : (
          <ModalAgendamentoConsulta
            abertoPeloUsuario={props.abertoPeloUsuario}
            usuario={usuario}
            usuarios={usuarios}
            fechandoModal={() => props.fechandoModal()}
            trocarTipo={(e) => setTipoRadio(e)}
          />
        )}
      </InfoEsquerdaEDireita>
    </Container>
  );
}

export default ModalAgendamentoEspecifico;
