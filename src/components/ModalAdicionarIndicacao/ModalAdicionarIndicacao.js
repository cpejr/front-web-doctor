import React, { useState } from "react";
import Button from "../../styles/Button";
import { Titulo, Container, ContainerInputs, Labels, Botao } from "./Styles";
import Input from "../../styles/Input";
import { Fontes } from "../../variaveis";
import { PlusSquareOutlined } from "@ant-design/icons";


function ModalAdicionarIndicacao (props) {

    const [nome, setNome] = useState("");
    const [numeroTel, setNumeroTel] = useState("");
    const [localAtendimento, setLocalAtendimento] = useState("");


    return(
        <Container>
            <Titulo>Adicionar Indicação:</Titulo>
            <ContainerInputs>
              <Labels>Nome:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                value={nome}
                placeholder="Insira o Nome do(a) Médico(a)"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
              >
              </Input>
            </ContainerInputs>
            <ContainerInputs>
              <Labels>Telefone:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                value={numeroTel}
                placeholder="Insira o telefone do(a) Médico(a)"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
              >
              </Input>
            </ContainerInputs>
            <ContainerInputs>
              <Labels>Local de Atendimento:</Labels>
              <Input
                backgroundColor = "#EAECFF"
                borderColor = "black"
                value={localAtendimento}
                placeholder="Insira o local de atendimento do(a) Médico(a)"
                color="black"
                fontSize="1em"
                width="100%"
                paddingRight="2%"
              >
              </Input>
            </ContainerInputs>
            <Botao>
                Adicionar Indicação <PlusSquareOutlined/>
            </Botao>
        </Container>

    )

}


export default ModalAdicionarIndicacao;