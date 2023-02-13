import Button from "../../styles/Button";
import Select from "../../styles/Select/Select";
import { Titulo, Container, ContainerInputs } from "./Styles";
import { Cores } from "../../variaveis";
import { DeleteOutlined } from "@ant-design/icons";
import React,{ useEffect,useState } from "react";
import * as managerService from "../../services/ManagerService/managerService";
function ModalExcluirIndicacao(props) {
  const [medicoEspecifico, setMedicoEspecifico] = useState();
  const [idMedicoEscolhido, setIdMedicoEscolhido] = useState();
  async function buscarMedicosporId(){
    const medicosespecificos = await managerService.GetMedicosIndicadosPorID(props.idmedicoindicado);
    setMedicoEspecifico(medicosespecificos);
   }
   useEffect(() => {buscarMedicosporId()}, [medicoEspecifico])
  async function armazenarMedico(medico) {
    setIdMedicoEscolhido(medico.id);
  }
  async function deletarIndicacao(e) {
    e.preventDefault();
    await deletarIndicacao(idMedicoEscolhido);

  }
  return (
    <Container>
      <Titulo>Excluir Indicação:</Titulo>
      <ContainerInputs>
      {medicoEspecifico.map((medico) => (  
        <Select 
        id="indicacao"
         backgroundColor={Cores.cinza[7]}
          width="100%"
          onClick={armazenarMedico(medico)}
          >
         
          <option 
          
          key={medico} 
          value={medico} 
          color='red'>
            {medico.nome}
          </option>
          
        </Select>
        ))} 
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
        onClick={() => deletarIndicacao()}
      >
        Excluir Indicação <DeleteOutlined />
      </Button>
    </Container>
  );
}

export default ModalExcluirIndicacao;
