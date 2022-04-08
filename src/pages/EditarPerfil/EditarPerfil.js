import React from "react";
import {
  ContainerEditarPerfil,
  ColunaEsquerda,
  ColunaDireita,
  AlterarDados,
  CaixaInputs,
  CaixaBotao,
  ImagemPerfil,
  BlocoSuperior,
  BlocoInferior,

} from "./Styles";
import Input from "../../styles/Input";
import Button from "../../styles/Button";
import fotoPerfil from "./../../assets/fotoPerfil.png";
import { useHistory } from "react-router-dom";

function EditarPerfil() {
    const history = useHistory();
  return (
    <ContainerEditarPerfil>
      <ColunaEsquerda>
        <BlocoSuperior>
          <ImagemPerfil>
            <img
              src={fotoPerfil}
              className="fotoPerfil"
              alt="fotoPerfil"
              width="100%"
              height="90%"
            ></img>
          </ImagemPerfil>
          <Button
            backgroundColor="transparent"
            borderColor="transparent"
            color="#151B57"
            fontSize="1em"
            textDecoration="underline"
            height="10px"
            onClick={() => {}}
          >
            Alterar Foto de Perfil
          </Button>
        </BlocoSuperior>
        <BlocoInferior>
          <Button
            width="100%"
            backgroundColor="#A7ADE8"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            height="50px"
            borderColor="#151B57"
            color="#151B57"
          >
            ALTERAR SENHA
          </Button>
          <Button
            width="100%"
            backgroundColor="white"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderColor="#DD0D0D"
            height="50px"
            color="#DD0D0D"
            onClick={() => {history.push("/web/perfil")}}
          >
            CANCELAR
          </Button>
        </BlocoInferior>
      </ColunaEsquerda>
      <ColunaDireita>
        <AlterarDados>Alterar Dados:</AlterarDados>
        <CaixaInputs>
          <Input
            placeholder="Nome Completo:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
          <Input
            placeholder="Telefone:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder="Email:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
          <Input
            placeholder="Data de Nascimento:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder="País:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
          <Input
            placeholder="Estado:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder="Estado:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
          <Input
            placeholder="CEP:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
        </CaixaInputs>
        <CaixaInputs>
          <Input
            placeholder="Endereço:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
          <Input
            placeholder="Complemento:"
            backgroundColor="#E4E6F4"
            borderColor="black"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
            borderWidth="1px"
            color="black"
            fontSize="1em"
            width="50%"
          ></Input>
        </CaixaInputs>
        <CaixaBotao>
          <Button
            width="30%"
            backgroundColor="#434B97"
            borderColor="#151B57"
            height="50px"
            color="white"
            boxShadow="3px 3px 5px 0px rgba(0, 0, 0, 0.2)"
          >
            CONFIRMAR
          </Button>
        </CaixaBotao>
      
        
      </ColunaDireita>
    </ContainerEditarPerfil>
  );
}
export default EditarPerfil;
