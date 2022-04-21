import styled from "styled-components";

export const ContainerListadeUsuarios = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2% 5% 2% 5%;
`;
export const TopoPagina = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
export const Filtros = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2%;
`;
export const FiltroUsuario = styled.div``;
export const FiltroDatas = styled.div``;

export const BarraEstetica = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
  height: 2px;
  width: 100%;
  background-color: #151b57; ;
`;
export const DadosUsuario = styled.div`
  color: #151b57;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
`;
export const Titulo = styled.div``;
export const ContainerUsuarios = styled.div`
  padding: 2% 0% 2% 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Usuario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
  border-color: black;
  border-style: solid;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2% ;
`;
export const Imagem = styled.img`
    object-fit:fill;
    width: 40px;
`;
