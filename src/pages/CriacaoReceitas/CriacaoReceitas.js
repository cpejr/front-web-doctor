import React, { useEffect, useState } from "react";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import Select from "../../styles/Select";
import { Cores } from "../../variaveis";
import * as managerService from "../../services/ManagerService/managerService";
import { ContainerCriacaoReceitas, CardCriacaoReceitas, CriacaoReceitaNome, CriacaoReceitaCorpo, Titulo, NomeDoPaciente, Descricao, CriacaoReceitaBotoes, BotaoEnviar, BotaoCancelar } from "./Styles";

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
          <Select
            backgroundColor={Cores.cinza[7]}
            color={Cores.preto}
            fontSize="1em"
            width="100%"
            marginTop="2%"
            size="large"
            name="id_usuario"
            placeholder="Nome do usuário"
            boxShadow="0px 4px 4px 0px #00000040"
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
          <Descricao>Descrição:</Descricao>
          <Input
          placeholder="Descrição"
          paddingBottom="23%"
          backgroundColor={Cores.cinza[7]}
          color={Cores.preto}
          fontSize="1em"
          width="100%"
          height="150px"
          marginTop="2%"
          boxShadow="0px 4px 4px 0px #00000040"
          ></Input>
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
          fontSizeMedia1080="0.8em"
          fontSizeMedia950="0.1em"
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
          fontSizeMedia1080="0.8em"
          fontSizeMedia950="0.1em"
          onClick={() => {}}
          >ENVIAR</Button>
          </BotaoEnviar>
        </CriacaoReceitaBotoes>  
      </CardCriacaoReceitas>
    </ContainerCriacaoReceitas>
  );
}

export default CriacaoReceitas;