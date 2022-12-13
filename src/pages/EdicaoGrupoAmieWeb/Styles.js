import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  gap: 2%;
  align-items: center;
  justify-content: center;
  padding: 2% 5% 2% 5%;
`

export const ContainerEditarGrupoAmieWeb = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 15px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction:column;
  row-gap: 40px;
  
  font-family: ${Fontes.barlow};
  border: 1px solid ${Cores.preto},;
  border-radius: 3px;
  
  @media (max-width: 910px) {
    margin: 8px;
  }

  `

export const DadosGrupoAmie = styled.div`
  height: 60%;
  width: 40%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  row-gap: 30px;

  box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 1200px) {
    width: 60%;
  }
  @media (max-width: 800px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  `

export const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
`

export const TextArea = styled.textarea`
  font-size: 16px;
  width: 100%;
  max-width: 22rem;
  height: 10rem;
  max-height: 500px;
  overflow:hidden;
  `

export const Titulo = styled.div`
  font-size: 40px;
  color: black;
  font-weight: 500;
  text-align:center;
  @media (max-width: 600px) {
    font-size: 30px;
  }
  `

export const UploadButton = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
  background-color: ${Cores.cinza[8]};
`

export const UploadContainer = styled.div`
  width: 100%;
  max-width: 22rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  padding: 5px;
  outline: 1px black solid;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`
