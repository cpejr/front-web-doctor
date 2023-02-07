import styled from "styled-components";
import { Input } from "antd";
import { Cores, Fontes } from "../../variaveis";
const { TextArea } = Input;

export const Caixa = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 5% 10% 5% 10%;
  }
`;

export const InfoEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  min-height: 80vh;
  padding: 5%;
  justify-content: space-around;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 0;
  }
`;

export const InfoDireita = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
  min-height: 80vh;
  padding: 5%;
  justify-content: space-between;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 0;
  }
`;

export const Usuario = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0% 1% 0% 1%;
  border-color: ${Cores.azul};
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2%;

  @media (max-width: 500px) {
    flex-direction: column;
    height: 60px;
  }
`;

export const Imagem = styled.img`
  justify-content: center;
  object-fit: fill;
  width: 20%;
  width: 40px;
  display: flex;
`;

export const Nome = styled.div`
  width: 40%;
  display: flex;
  justify-content: start;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.4em;
  color: ${Cores.azulEscuro};

  @media (max-width: 500px) {
    width: 50%;
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
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top:18%;
  margin-bottom:20%;
  @media (max-width: 620px){
    height: 25%;
    width: 100%;
  }
  @media (max-width: 560px){
    height: 30%;
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
  margin-top: 100%;
  margin-right:35%;
  ::placeholder {
    color: ${Cores.preto};
  }
`;

export const DoisSelect = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-family: ${Fontes.barlow};
  font-size: 1em;

  @media (max-width: 560px) {
    flex-direction: column;
    height: 120px;
  }

  @media (max-width: 1260px) and (min-width: 800px) {
    flex-direction: column;
    height: 160px;
  }
  @media (max-width: 400px) {
    height: 180px;
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

export const InputConsultorio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
  height: 40px;
  margin-top: 5%;
  @media (max-width: 1717px) {
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
  @media (max-width: 807px) and (min-width: 800px) {
    padding-top: 15%;
  }
`;

export const ContainerDuracaoConsulta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
  height: 40px;
  //margin-bottom: 5%;
  @media (max-width: 1622px) {
    margin-bottom: 5%;
  }
  @media  (max-width: 763px) and (min-width: 697px) {
    margin-bottom: 9%;
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

export const ContainerHorario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
  height: 40px;
  //margin-bottom: 5%;
  @media (max-width: 1470px) {
    margin-bottom: 5%;
  }
  @media (max-width: 560px) {
    width: 100%;
    margin-bottom: 13%;
  }
  @media (max-width: 1260px) and (min-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
`;

export const InputData = styled.input`
  width: 100%;
  height: 36px;
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
export const CaixaLoader = styled.div`
  width: calc(98% - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
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

export const TextoSelecioneUmaData = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 1.1em;
  color: ${Cores.azulEscuro};
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const TextoDoisSelects = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 1.1em;
  color: ${Cores.azulEscuro};
  display: flex;
  justify-content: start;
  align-items: center;

  @media (max-width: 560px){
    margin-top: 15%;
  }
`;

export const SelecioneUmaData = styled.div`
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
`;