import styled from "styled-components";

export const ContainerPerfil = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2% 8% 2% 8%;

  @media (max-width: 1080px) {
    padding: 2% 4% 2% 4%;
  }
`;

export const Perfil = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  border-style: solid;
  border-color: #c4c4c4;
  border-width: 2px;
  border-radius: 3px;
  padding: 2%;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  gap: 15%;
  margin-bottom: 2%;

  @media (max-width: 1080px) {
    width: 80%;
    gap: 0%;
    flex-direction: column;
    align-items: center;
  }
`;

export const PerfilEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;

  @media (max-width: 1080px) {
    justify-content: center;
    width: 100%;
    align-items: center;
  }
`;
export const PerfilDireita = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;

  @media (max-width: 1080px) {
    width: 80%;
  }
`;

export const PerfilSuperior = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;
  justify-content: flex-start;
  width: 100%;
  margin: 2% 0% 0% 0%;

  @media (max-width: 1080px) {
    display:block ;
    justify-content: center;
    align-items: center;
    width: 80%;
    padding: 2%;
    border-style: solid;
    border-color: #c4c4c4;
    border-width: 2px;
    border-radius: 3px;
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 640px) {
    flex-direction: column;
    display: block ;
  }
`;
export const PerfilInferior = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2%;
  justify-content: space-around;
  width: 100%;
  margin: 2% 0% 0% 0%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1080px) {
    justify-content: center;
    align-items: center;
    display: block;
    padding: 2%;
    width: 80%;
    border-style: solid;
    border-color: #c4c4c4;
    border-width: 2px;
    border-radius: 3px;
    margin-bottom: 2%;
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const Formularios = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-style: solid;
  border-color: #c4c4c4;
  border-width: 2px;
  border-radius: 3px;
  height: 30%;
  margin-bottom: 2%;
  padding: 2%;
  background-color: green;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);

  @media (max-width: 1080px) {
    width: 80%;
  }
`;
export const Receitas = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-style: solid;
  border-color: #c4c4c4;
  border-width: 2px;
  border-radius: 3px;
  padding: 2%;
  background-color: green;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  height: 30%;

  @media (max-width: 1080px) {
    width: 80%;
  }
`;

export const FotoPerfil = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  object-fit: fill;
  border-radius: 5px;
  justify-content: center;
`;
export const Dados = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 2%;
  justify-content: center;
`;
export const Nome = styled.div`
  width: 100%;
  font-size: 1.8em;
  color: #151b57;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const DataAnos = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 2%;
  width: 100%;
`;
export const Data = styled.div`
  font-size: 1.2em;
  justify-content: flex-start;
  color: #151b57;
`;
export const Anos = styled.div`
  font-size: 1.2em;
  color: #151b57;
`;
export const Titulo = styled.div`
  font-size: 1.5em;
  color: #151b57;
  font-weight: bold;
  margin: 0% 0% 2% 0%;
`;
export const DadosGeo = styled.div`
  font-size: 1.2em;
  color: #151b57;
  margin-bottom: 2%;
  text-decoration: ${(props) => props.textDecoration};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const Botoes = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  padding: 0% 20% 0% 0%;
  justify-content: start;

  @media (max-width: 1080px) {
    padding: 0;
    margin: 0;
    justify-content: center;
  }
`;
export const Botao = styled.div`
  margin-bottom: 5%;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1080px) {
    margin: 0;
  }
`;
export const DadosFormulario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  margin-bottom: 2%;

  @media (max-width: 560px) {
    gap: 2%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;
export const DadosContato = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 1080px) {
    justify-content: center;
    align-items: center;
    width: 100%;
    display: block;
    border-style: solid;
    border-color: #c4c4c4;
    border-width: 2px;
    border-radius: 3px;
    box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  }
`;
export const InfoContato = styled.div`
  text-decoration: ${(props) => props.textDecoration};
  font-size: 1.2em;
  color: #151b57;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const Formulario = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: #151b57;
  border-width: 2px;
  border-radius: 3px;
  justify-content: center;
  padding: 0% 2% 2% 2%;
`;
export const Receita = styled.div`
  width: 100%;
  border-style: solid;
  border-color: #151b57;
  border-width: 2px;
  border-radius: 3px;
  padding: 0 2% 2% 2%;
`;
export const DadosReceita = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0% 10% 0% 10%;
`;
export const BotaoReceita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
`;
export const TituloFormulario = styled.div`
  font-size: 1.5em;
  text-decoration: underline;
  color: "black";

  @media (max-width: 780px) {
    font-size: 1.3em;
  }
  @media (max-width: 560px) {
    font-size: 1.1em;
  }
`;
export const DataFormulario = styled.div`
  font-size: 1.2em;
  color: #434b97;

  @media (max-width: 780px) {
    display: none;
  }
`;
export const TipoFormulario = styled.div`
  font-size: 1.2em;
  color: #434b97;

  @media (max-width: 560px) {
    display: none;
  }
`;
export const UrgenciaFormulario = styled.div`
  font-size: 1.2em;
  color: #434b97;
  @media (max-width: 780px) {
    font-size: 1.3em;
  }
`;
export const Resposta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: end;
  font-size: 1.3em;
  width: 100%;
  @media (max-width: 560px) {
    align-items: center;
  }
`;
export const RespostaPendente = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;
export const TituloReceita = styled.div`
  text-decoration: ${(props) => props.textDecoration};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
`;
