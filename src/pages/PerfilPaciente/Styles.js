import styled from "styled-components";

export const ContainerPerfil = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2% 5% 2% 5%;
`;

export const PerfilEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
`;
export const PerfilDireita = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
`;
export const Perfil = styled.div`
  display: flex;
  height: 30%;
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
`;
export const Formularios = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: #c4c4c4;
  border-width: 2px;
  border-radius: 3px;
  height: 30%;
  margin-bottom: 2%;
  padding: 2%;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
`;
export const Receitas = styled.div`
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-color: #c4c4c4;
  border-width: 2px;
  border-radius: 3px;
  padding: 2%;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  height: 30%;
`;
export const PerfilSuperior = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;
  justify-content: flex-start;
  width: 100%;
`;
export const PerfilInferior = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2%;
  justify-content: space-around;
  width: 100%;
`;
export const FotoPerfil = styled.div`
  .foto {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
`;
export const Dados = styled.div``;
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
`;
export const Botoes = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  padding: 0% 20% 0% 0%;
  justify-content: start;
`;
export const Botao = styled.div`
  margin-bottom: 5%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export const DadosFormulario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
`;
export const DadosContato = styled.div`
  justify-content: start;
  padding: 2%;
`;
export const InfoContato = styled.div`
  text-decoration: ${(props) => props.textDecoration};
  font-size: 1.2em;
  color: #151b57;
`;
export const Formulario = styled.div`
  height: 140px;
  width: 100%;
  border-style: solid;
  border-color: #151b57;
  border-width: 2px;
  border-radius: 3px;
  background-color: "green";
`;
export const Receita = styled.div`
  height: 140px;
  width: 100%;
  border-style: solid;
  border-color: #151b57;
  border-width: 2px;
  border-radius: 3px;
  background-color: "green";
`;
export const DadosReceita = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1% 10% 0% 10%;
`;
export const BotaoReceita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 1% 5% 1% 75%;
`;
export const TituloFormulario = styled.div`
  text-decoration: ${(props) => props.textDecoration};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
`;
export const Resposta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  font-size: 1.5em;
  width: 100%;
`;
export const RespostaPendente = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 1% 5% 1% 75%;
`;
export const TituloReceita = styled.div`
  text-decoration: ${(props) => props.textDecoration};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
`;
export const RuaNomeApartamento = styled.div``;