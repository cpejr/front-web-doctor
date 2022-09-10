import React, { useEffect, useState } from "react";
import Button from "../../styles/Button";
import Input from "../../styles/Input";
import Select from "../../styles/Select";
import { Cores } from "../../variaveis";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import * as managerService from "../../services/ManagerService/managerService";
import { ContainerCriacaoReceitas, CardCriacaoReceitas, CriacaoReceitaNome, CriacaoReceitaCorpo, Titulo, NomeDoPaciente, Descricao, CriacaoReceitaBotoes } from "./Styles";

function CriacaoReceitas() {

  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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