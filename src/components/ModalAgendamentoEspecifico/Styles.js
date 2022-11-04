import styled from "styled-components";
import { Input } from "antd";
import { Cores, Fontes } from "../../variaveis";
const { TextArea } = Input;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3% 2% 2% 2%;
`;

export const Caixa = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 80vh;
  background-color: ${Cores.branco};
  border-color: rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-radius: 3px;

  @media (max-width: 910px) {
    flex-direction: column;
    
  }
`;

export const InfoEsquerdaEDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 100%;
  min-height: 80vh;
  padding: 5%;
  gap: 8px;

  @media (max-width: 910px) {
    width: 100%;
    padding: 0%;
  }

  @media (max-width: 560px) {
    width: 100%;
    padding: 5%;
  }


`;

export const InfoEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 100%;
  height: 80vh;
  padding: 5%;
  gap: 10px;

  @media (max-width: 910px) {
    width: 100%;
    height: 50vh;
    
  }
`;

export const Usuario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 2%;
  border-color: ${Cores.azul};
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  

  @media (max-width: 500px) {
    flex-direction: column;
    height: auto;
  }
`;


export const Imagem = styled.img`
  justify-content: center;
  object-fit: fill;
  width: 50px;
  display: flex;

  @media (max-width: 500px) {
    display: none;
  }
`;

export const Nome = styled.div`
  width: calc(98% - 50px);
  display: flex;
  justify-content: center;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.2em;
  color: ${Cores.azulEscuro};
  text-align: center;
  

  @media (max-width: 500px) {
    width: 100%;
    font-size: 1.1em;
    justify-content: center;
    text-align: center;
  }
`;

export const NomePaciente = styled.div`
  width: 100%;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.1em;
  color: ${Cores.azulEscuro};

  @media (max-width: 500px) {
    width: 90%;
    font-size: 1.1em;
    justify-content: center;
    text-align: center;
  }
`;

export const TipoAgendamento = styled.div`
  display: flex;
  padding: 2%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: green;
  border-radius: 3px;
  @media (max-width: 620px){
    height: auto;
    width: 100%;
  }
  @media (max-width: 560px){
    height: auto;
    flex-wrap: nowrap;
  }
`;

export const TextoTipoAgendamento = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 600;
  font-size: 1.4em;
  color: ${Cores.azulEscuro};
  text-align: center;

  @media (max-width: 850px) and (min-width: 560px) {
    font-size: 1.2em;
  }

  @media (max-width: 560px) {
    font-size: 1.1em;
  }
`;

export const TextoCheckbox = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 600;
  font-size: 1.2em;
  color: ${Cores.azulEscuro};

  @media (max-width: 560px) {
    font-size: 1em;
  }
`;

export const TextAreaDescricao = styled(TextArea)`
  border-color: ${Cores.preto};
  border-width: 1px;
  color: ${Cores.preto};
  ::placeholder {
    color: ${Cores.preto};
  }
`;



export const Select = styled.select`
  border-color: ${Cores.preto};
  border-width: 1px;
`;

export const TamanhoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
  height: 40px;
  @media  (max-width: 601px) and (min-width: 560px) {
    margin-bottom: 5%;
  }
  @media (max-width: 560px) {
    width: 100%;
    margin-bottom: 5%;
  }
  @media (max-width: 1260px) and (min-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
`;

export const InputData = styled.input`
  width: 100%;
  height: 35px;
  color: ${Cores.preto};
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 15px;
  padding-left: 2%;
  padding-right: 2%;
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.camposVazios){
        cor = Cores.vermelho;
      } else {
        cor = Cores.azul;
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
`;

export const InputHora = styled(Input)`
  width: 100%;
  height: 35px;
  color: ${Cores.preto};
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5%;
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
`;

export const InputDuracao = styled(Input)`
  width: 100%;
  height: 35px;
  color: ${Cores.preto};
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 15px;
  padding-left: 5%;
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.camposVazios){
        cor = Cores.vermelho;
      } else {
        cor = Cores.azul;
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};

  .ant-input {
    ::placeholder {
      color: ${Cores.preto};
    }
  }
`;

export const TextoCaixaSelect = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 1.1em;
  color: ${Cores.azulEscuro};
  display: flex;
  justify-content: end;
  align-items: center;
`;


export const CaixaSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 90%;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const Rotulo = styled.div`
  width: 100%;
  height: 10px;
  margin-bottom: 10px;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1em;
  color: ${Cores.vermelho};

  @media (max-width: 400px){
    margin-bottom: 35px;
  }
`;