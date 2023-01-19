import React, { useState } from "react";
import { telefone, apenasLetras, apenasNumerosCpfTel } from "../../utils/masks";
import { Titulo, Container, ContainerInputs, Labels, Rotulo } from "./Styles";
import Input from "../../styles/Input";
import { Cores } from "../../variaveis";
import Button from "../../styles/Button";
import { PlusSquareOutlined } from "@ant-design/icons";


function ModalAdicionarIndicacao (props) {

    const [indicacao, setIndicacao] = useState({});
    const [estado, setEstado] = useState({});
    const [erro, setErro] = useState(false);

    const [camposVazios, setCamposVazios] = useState({
      nome: false,
      telefone: false,
      local: false
    });
    function preenchendoDados(e) {
      const { value, name } = e.target;
      if (value) setCamposVazios({ ...camposVazios, [name]: false });
  
      if (name === 'telefone' && value.length < 15) {
        setErro({ ...erro, [name]: true });
      } else {
        setErro({ ...erro, [name]: false });
      }
  
      setIndicacao({ ...indicacao, [name]: value });
      setEstado({ ...estado, [name]: value });
  
      if (name === 'nome') {
        setEstado({
          ...estado,
          [name]: apenasLetras(value),
        });
        setIndicacao({ ...indicacao, [name]: apenasLetras(value) });
      }
  
      if (name === 'telefone') {
        setEstado({ ...estado, [name]: telefone(value) });
        setIndicacao({ ...indicacao, [name]: apenasNumerosCpfTel(value) });
      }
      if(name === 'local'){
        setEstado({
          ...estado,
          [name]: apenasLetras(value),
        });
        setIndicacao({ ...indicacao, [name]: apenasLetras(value) });
      }
      
    }

    return(
        <Container>
            <Titulo>Adicionar Indicação:</Titulo>
            <ContainerInputs>
              <Labels>Nome:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                placeholder="Insira o Nome do(a) Médico(a)"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
                onChange={preenchendoDados}
                erro={erro.nome}
                camposVazios={camposVazios.nome}
                name="nome"
                value={estado.nome}
              >
              </Input>
            </ContainerInputs>
            <ContainerInputs>
              <Labels>Telefone:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                placeholder="Insira o telefone do(a) Médico(a)"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
                type="tel"
                onKeyUp={telefone}
                onChange={preenchendoDados}
                erro={erro.nome}
                camposVazios={camposVazios.nome}
                name="telefone"
                value={estado.telefone}
              >
              </Input>
              {erro.telefone && (
                <Rotulo>Digite um telefone no formato (xx)xxxxx-xxxx</Rotulo>
              )}
            </ContainerInputs>
            <ContainerInputs>
              <Labels>Local de Atendimento:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                placeholder="Insira o local de atendimento do(a) Médico(a)"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
                onChange={preenchendoDados}
                erro={erro.nome}
                camposVazios={camposVazios.nome}
                name="local"
                value={estado.local}
              >
              </Input>
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
              >
               Adicionar Indicação <PlusSquareOutlined/>
            </Button>
        </Container>

    )

}


export default ModalAdicionarIndicacao;