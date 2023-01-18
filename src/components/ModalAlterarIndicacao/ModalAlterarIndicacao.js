import React, { useState } from "react";
import Button from "../../styles/Button";
import { Titulo, Container, ContainerInputs, Labels, Botao, Selecionar } from "./Styles";
import Input from "../../styles/Input";
import { Fontes } from "../../variaveis";
import { PlusSquareOutlined } from "@ant-design/icons";


function ModalAlterarIndicacao (props) {

    const [nome, setNome] = useState("");
    const [numeroTel, setNumeroTel] = useState("");
    const [localAtendimento, setLocalAtendimento] = useState("");


    return(
        <Container>
            <Titulo>Alterar Indicação:</Titulo>
            <ContainerInputs>
             <Labels>Indicação:</Labels>
              <Selecionar>
                <option value=''>  Escolher indicação para alterar  </option>
              </Selecionar>
            </ContainerInputs>
            <ContainerInputs>
              <Labels>Nome:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                value={nome}
                placeholder="Dr. Médico"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
                paddingBottom="4%"
              >
              </Input>
            </ContainerInputs>
            <ContainerInputs>
              <Labels>Telefone:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                value={numeroTel}
                placeholder="(**)*****_****"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
                paddingBottom="4%"
              >
              </Input>
            </ContainerInputs>
            <ContainerInputs>
              <Labels>Local de Atendimento:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                value={localAtendimento}
                placeholder="Consultório 1"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
                paddingBottom="4%"
              >
              </Input>
            </ContainerInputs>
            <Botao>
                Alterar Indicação <PlusSquareOutlined/>
            </Botao>
        </Container>

    )

}


export default ModalAlterarIndicacao;