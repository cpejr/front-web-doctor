import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import { Titulo, Container, ContainerInputs } from "./Styles";
import { Cores } from "../../variaveis";
import { DeleteOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sleep } from '../../utils/sleep';
import { useHistory } from "react-router-dom";
import * as managerService from "../../services/ManagerService/managerService";
function ModalExcluirIndicacao(props) {
  const [medicoEspecifico, setMedicoEspecifico] = useState();
  const [medicos, setMedicos] = useState([{}]);
  const [idMedicoEscolhido, setIdMedicoEscolhido] = useState();
  const [preenchido, setPreenchido] = useState(false);
  const history = useHistory();
  let medicodeletado;
  async function buscarMedicosporId() {
    const resposta = await managerService.GetMedicosIndicadosPorID(props.idmedicoindicado);
    setMedicos(resposta);
  }
  useEffect(() => {
    buscarMedicosporId();
  }, [medicos])

  async function armazenarMedico(event) {
    setIdMedicoEscolhido(event.target.value);
    setPreenchido(true);
  }
  async function deletarIndicacao() {
    console.log(medicodeletado);
    if(preenchido === false){
      toast.warn("Escolha um médico para deletar");
			return;
    }else{
      await managerService.DeletarIndicao(idMedicoEscolhido);
      await sleep(1500);
      history.push("/web/edicaoindicacoesesugestoes");
    }
    

  }
  return (
    <Container>
      <Titulo>Excluir Indicação:</Titulo>
      <ContainerInputs>
        <Select
        width="100%"
        backgroundColor={Cores.cinza[7]} 
        onChange={armazenarMedico}
        name = 'idMedicoEscolhido'
        >
          <option value="" disabled selected>
            Médico
          </option>
          {medicos.map((medico) => (
            <option
              key={medico.id}
              value={medico.id}
              color='red'
              >
              {medico.nome}
            </option>
            ))}
        </Select>
      </ContainerInputs>
      <Button
        gap="5px"
        backgroundColor={Cores.azul}
        fontSize="1.5em"
        width="100%"
        borderColor={Cores.azulEscuro}
        color={Cores.branco}
        paddingTop="5px"
        paddingBottom="5px"
        marginTop="10%"
        onClick={deletarIndicacao}
      >
        Excluir Indicação <DeleteOutlined />
      </Button>
    </Container>
  );
}

export default ModalExcluirIndicacao;
