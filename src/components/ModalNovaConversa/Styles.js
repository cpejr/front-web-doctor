import styled from "styled-components";
import { Cores } from "../../variaveis";
import { Select } from "antd";

export const ContainerModalNovaConversa = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  width: 100%;
  height: 100%;
  min-width:200px;
`;

export const Titulo = styled.div`
  display: flex;
  font-size: 2em;
  font-weight:bold;
  margin-bottom:7%;
  margin-top:3%;

  @media (max-width: 360px) {
    font-size: 1.5em;
  }
`;

export const Subtitulo = styled.div`
  display: flex;
  align-self:flex-start;
  margin-left:16%;
  font-size: 1.3em;
  font-weight:bold;

  @media (max-width: 655px) {
      align-self: flex-start;
      margin-left: 10%;
  }

  @media (max-width: 360px) {
    font-size: 1.1em;
  }
`;

export const TamanhoSelect = styled.div`
  display: flex;
  align-items:center;
  width:80%;
  margin-bottom:25%;
`;

export const LocalBotao = styled.div`
  display: flex;
  align-self:flex-end;
  justify-self:flex-end;
  height:45px;
  width:20%;
  min-width:80px;
`;

export const SelectUsuario = styled(Select)`
  width: 100%;
  color: ${Cores.preto};
  margin-left: 2.5em;
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.erro || props.camposVazios){
        cor = Cores.vermelho;
      } else {
        cor = Cores.azul;
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};

  ::placeholder {
    color:${Cores.preto}
  }
    color: ${Cores.preto};

    @media (max-width: 655px) {
      margin-left: 0em;
  }
`;

