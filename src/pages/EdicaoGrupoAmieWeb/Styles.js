import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const ContainerEditarGrupoAmieWeb = styled.div`
  font-family: Barlow;
  font-weight: 500;
  height:80%;
  width: 80%;
  border-color: ${Cores.preto};
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction:column;
`

export const DadosGrupoAmie = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  padding: 20px;
  box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.2);
`

export const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
`


export const Titulo = styled.div`
  font-size: 40px;
`
export const TheOneAboveAll = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`