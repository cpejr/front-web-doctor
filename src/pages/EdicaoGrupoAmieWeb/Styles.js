import styled from "styled-components";
import { Cores, Fontes } from "../../variaveis";

export const ContainerEditarGrupoAmieWeb = styled.div`
  width: 80%;
  padding: 30px;
  border-color: ${Cores.preto};
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction:column;
  row-gap: 40px;
  @media (max-width: 600px) {
    width: 100%;
  }

  `

export const DadosGrupoAmie = styled.div`
  padding: 30px;
  display: flex;
  height: 60%;
  width: 40%;
  align-items: center;
  justify-content: center;
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

export const CaixaBotaoUpload = styled.div`
`


export const Botoes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
`

export const TextArea = styled.textarea`
  font-size: 16px;
  width: 80%;
  max-height: 500px;
  overflow:hidden;
  @media (max-width: 600px) {
    width: 100%;
  }
`

export const Titulo = styled.div`
  font-size: 40px;
  color: black;
  font-weight: 500;
  text-align:center;
  `

export const UploadButton = styled.div`
  display: flex;
  align-items:center;
  justify-content: center;
`

export const UploadContainer = styled.div`
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size:cover;
  background-position: 50% 50%;

  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  outline: 1px black solid;
  padding: 5px;
`

export const TheOneAboveAll = styled.div`
font-family: Barlow;
  width: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    padding: 20px;
  }
`