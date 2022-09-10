import React from "react";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import Select from "../../styles/Select";
import { Cores } from "../../variaveis";
import { ContainerCriacaoReceitas, CardCriacaoReceitas, CriacaoReceitaNome, CriacaoReceitaCorpo, Titulo, NomeDoPaciente, Descricao, CriacaoReceitaBotoes } from "./Styles";

function CriacaoReceitas() {
  return (
    <ContainerCriacaoReceitas>
      <CardCriacaoReceitas>
        <CriacaoReceitaNome>Criação de Receita</CriacaoReceitaNome>
        <CriacaoReceitaCorpo>
          <Titulo>Título:</Titulo>
          <Input
          placeholder="Título"
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          marginTop="2%"
          ></Input>
          <NomeDoPaciente>Nome do paciente</NomeDoPaciente>
          <Select
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            name="id_usuario"
            placeholder="Selecione um paciente"
            onChange={(e) => {
              validacaoCampos(e);
            }}
          >
            <option value="" disabled selected>
              Paciente
            </option>

            {usuarios.map((usuario) => (
              <>
                {carregando ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <option key={usuario.id} value={usuario.id} color="red">
                    {usuario.nome}
                  </option>
                )}
              </>
            ))}
          </Select>
          <Descricao>Descrição:</Descricao>
          <Input
          placeholder="Descrição"
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          marginTop="2%"
          ></Input>
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