import React, { useState, useEffect } from "react";
import Button from "../../styles/Button";
import { sleep } from '../../utils/sleep';
import { Titulo, Container, ContainerInputs, Labels, Rotulo } from "./Styles";
import Input from "../../styles/Input";
import Select from "../../styles/Select/Select";
import { Cores } from "../../variaveis";
import { telefone, apenasLetras } from "../../utils/masks";
import { PlusSquareOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';
import * as managerService from "../../services/ManagerService/managerService";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { Spin } from "antd";
function ModalAlterarIndicacao(props) {
  const [camposVazios, setCamposVazios] = useState({});
  const [carregandoCriacao, setCarregandoCriacao] = useState(false);
  const [medicoEspecifico, setMedicoEspecifico] = useState([{}]);

  const [estado, setEstado] = useState({
    nome: "",
    telefone: "",
    local_atendimento: "",
    id_indicacao_especifica: props.idmedicoindicado,
  });
  const [erro, setErro] = useState(false);

  const [camposVaziosReferencia, setCamposVaziosReferencia] = useState({
    nome: false,
    telefone: false,
    local_atendimento: false,
  });
  const [selecionarMedico, setSelecionarMedico] = useState({
    nome: false,
    telefone: false,
    local_atendimento: false,
  });

  function preenchendoDados(e) {
    const { value, name } = e.target;
    if (value) setCamposVazios({ ...camposVazios, [name]: false });

    if (name === "telefone" && value.length < 15) {
      setErro({ ...erro, [name]: true });
    } else {
      setErro({ ...erro, [name]: false });
    }
    setEstado({ ...estado, [name]: value });

    if (name === "nome") {
      setEstado({
        ...estado,
        [name]: apenasLetras(value),
      });
    }

    if (name === "telefone") {
      setEstado({ ...estado, [name]: telefone(value) });
    }
    if (name === "local_atendimento") {
      setEstado({
        ...estado,
        [name]: apenasLetras(value),
      });
    }
  }
  async function buscarMedicosporId(){
   const medicosespecificos = await managerService.GetMedicosIndicadosPorID(props.idmedicoindicado);
   setMedicoEspecifico(medicosespecificos);
  }
  useEffect(() => {buscarMedicosporId()}, [medicoEspecifico])
  async function preenchendoPlaceholder(medico) {
    setSelecionarMedico(medico);
  }
 

 async function alterar(e) {
  e.preventDefault();
  
  if (!estado.nome) erro.nome = true;
  if (!estado.telefone) erro.telefone = true;
  if (!estado.local_atendimento) erro.local_atendimento = true;
  
  
  setCamposVazios({...camposVazios, ...erro});
  console.log(camposVazios);
  console.log(estado);
  if (!_.isEqual(camposVazios, camposVaziosReferencia)) {
    toast.warn("Preencha todos os campos");
    return;
  }else{
    setCarregandoCriacao(true);
    await managerService.EditarMedicoIndicado(selecionarMedico.id,estado);
    await sleep(1500);
    setCarregandoCriacao(false);
  }

  
 }
 const antIcon = (
  <LoadingOutlined style={{ fontSize: 25, color: Cores.azul }} spin />
);
  return (
    <Container>
      
      <Titulo>Alterar Indicação:</Titulo>
      
      <ContainerInputs>
        <Labels>Indicação:</Labels>
       {medicoEspecifico.map((medico) => ( 
        <Select 
        id="indicar"
        backgroundColor={Cores.cinza[7]} 
        onClick={() => preenchendoPlaceholder(medico)}
        width="100%">
          <option>Escolher indicação para alterar</option>
          
              <option key={medico} value={medico} color='red'>
                {medico.nome}
              </option> 
         
        </Select>
       ))}   
      </ContainerInputs>
     
      <ContainerInputs>
        <Labels>Nome:</Labels>
        <Input
          backgroundColor="#EAECFF"
          borderColor="black"
          placeholder={selecionarMedico.nome}
          color="black"
          fontSize="1em"
          width="100%"
          paddingRight="2%"
          onChange={preenchendoDados}
          erro={erro.nome}
          camposVazios={camposVazios.nome}
          name="nome"
          value={estado.nome}
        ></Input>
      </ContainerInputs>
      <ContainerInputs>
        <Labels>Telefone:</Labels>
        <Input
          backgroundColor="#EAECFF"
          borderColor="black"
          placeholder={selecionarMedico.telefone}
          color="black"
          fontSize="1em"
          width="100%"
          paddingRight="2%"
          type="tel"
          onChange={preenchendoDados}
          erro={erro.nome}
          camposVazios={camposVazios.nome}
          name="telefone"
          value={estado.telefone}
        ></Input>
        {erro.telefone && (
          <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
        )}
      </ContainerInputs>
      <ContainerInputs>
        <Labels>Local de Atendimento:</Labels>
        <Input
          backgroundColor="#EAECFF"
          borderColor="black"
          placeholder={selecionarMedico.local_atendimento}
          color="black"
          fontSize="1em"
          width="100%"
          paddingRight="2%"
          onChange={preenchendoDados}
          erro={erro.nome}
          camposVazios={camposVazios.nome}
          name="local_atendimento"
          value={estado.local_atendimento}
        ></Input>
      </ContainerInputs>
      <Button
        gap="5px"
        backgroundColor={Cores.azul}
        fontSize="1.5em"
        width="80%"
        borderColor={Cores.azulEscuro}
        color={Cores.branco}
        paddingTop="5px"
        paddingBottom="5px"
        marginTop="10%"
        onClick = {alterar}
      >
        {carregandoCriacao ? (
								<Spin indicator={antIcon} />
							) : (
                    <div>Alterar Indicação</div>
                )}
         <PlusSquareOutlined />
      </Button>
    </Container>
  );
}

export default ModalAlterarIndicacao;
