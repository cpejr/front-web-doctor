import React, { useEffect, useState } from "react";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import Select from "../../styles/Select";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import { ContainerCriacaoReceitas, CardCriacaoReceitas, SelectContainer, CriacaoReceitaNome, DescricaoTextarea, CriacaoReceitaCorpo, Titulo, NomeDoPaciente, Descricao, CriacaoReceitaBotoes, BotaoEnviar, BotaoCancelar } from "./Styles";

function CriacaoReceitas() {

  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);

  async function pegandoPacientes() {
    setCarregando(true);
    const resposta = await managerService.GetDadosPessoais();
    resposta.forEach((usuario) => {
      if (usuario.tipo === "PACIENTE") {
        setUsuarios((usuarios) => [...usuarios, usuario]);
      }
    });
  }

  useEffect(() => {
    pegandoPacientes();
  }, []);
  
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
          boxShadow="0px 4px 4px 0px #00000040"
          ></Input>
          <NomeDoPaciente>Nome do paciente:</NomeDoPaciente>
          <SelectContainer>
          <Select
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            borderColor= "transparent"
            fontSize="1em"
            width="97%"
            marginTop="0px"
            size="large"
            name="id_usuario"
            placeholder="Nome do usuário"
            height="45px"
            borderWidth820="97%"
          >
            <option value="" disabled selected>
              Nome do paciente
            </option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id} color="red">
                {usuario.nome}
              </option>
            ))}
        </Select>
        </SelectContainer>
          <Descricao>Descrição:</Descricao>
          <DescricaoTextarea
          placeholder="Descrição"
          ></DescricaoTextarea>
        </CriacaoReceitaCorpo>
        <CriacaoReceitaBotoes>
          <BotaoCancelar>
          <Button
          height="47px"
          width="100%"
          backgroundColor={Cores.branco}
          borderColor={Cores.cinza[3]}
          color={Cores.cinza[2]}
          fontSize="1em"
          onClick={() => {}}
          >CANCELAR</Button>
          </BotaoCancelar>
          <BotaoEnviar>
          <Button
          height="47px"
          width="100%"
          backgroundColor={Cores.lilas[1]}
          borderColor={Cores.azul}
          color={Cores.branco}
          fontSize="1em"
          onClick={() => {}}
          >ENVIAR</Button>
          </BotaoEnviar>
        </CriacaoReceitaBotoes>  
      </CardCriacaoReceitas>
    </ContainerCriacaoReceitas>
  );
}

export default CriacaoReceitas;