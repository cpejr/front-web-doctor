import React from "react";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import Select from "../../styles/Select";
import { ContainerCriacaoReceitas, CardCriacaoReceitas, CriacaoReceitaNome, CriacaoReceitaCorpo, Titulo, NomeDoPaciente, Descricao, CriacaoReceitaBotoes } from "./Styles";

function CriacaoReceitas() {
  return (
    <ContainerCriacaoReceitas>
      <CardCriacaoReceitas>
        <CriacaoReceitaNome>Criação de Receita</CriacaoReceitaNome>
        <CriacaoReceitaCorpo>
          <Titulo>Título:</Titulo>
          <Input></Input>
          <NomeDoPaciente>Nome do paciente</NomeDoPaciente>
          <Select></Select>
          <Descricao>Descrição:</Descricao>
          <Input></Input>
        </CriacaoReceitaCorpo>
        <CriacaoReceitaBotoes>
          <Button>CANCELAR</Button>
          <Button>ENVIAR</Button>
        </CriacaoReceitaBotoes>  
      </CardCriacaoReceitas>
    </ContainerCriacaoReceitas>
  );
}

export default CriacaoReceitas;