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

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;


export const InfoEsquerda = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 5%;
  padding-top: 3%;
  margin-top: 5%;

  @media (max-width: 800px) {
    width: 100%;
    height: 20%;
    padding-top: 10%;
    margin-top: 0%;
  }
`;

export const InfoDireita = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 100%;
  min-height: 80vh;
  padding: 5%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ContainerHorario = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
  height: 40px;
  @media (max-width: 1470px) {
    margin-bottom: 5%;
  }
  @media (max-width: 1260px) and (min-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
  @media (max-width: 560px) {
    width: 100%;
    margin-bottom: 13%;
    margin-top: 13%;
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
  border-color: ${Cores.preto};
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 60%;
  overflow: auto;
  min-height: 60px;

  ::-webkit-scrollbar {
    width: 0px;
  }

  @media (max-width: 800px) {
    margin-bottom: 10%;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    height: 100%;
    padding: 2%;
  }
  @media (max-width: 470px) {
    height: 120px;
  }
`;

export const TipoAgendamento = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 18%;
  margin-bottom: 20%;

  @media (max-width: 620px) {
    height: 25%;
    width: 100%;
  }
  @media (max-width: 560px) {
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

export const Imagem = styled.img`
  justify-content: center;
  object-fit: fill;
  width: 20%;
  width: 40px;
  display: flex;
`;

export const Nome = styled.div`
  width: 50%;
  display: flex;
  justify-content: start;
  font-family: ${Fontes.barlow};
  font-weight: 400;
  font-size: 1.3em;
  color: ${Cores.azulEscuro};

  @media (max-width: 1319px) {
    width: 55%;
    height: 55px;
    justify-content: center;
    text-align: center;
  }
  @media (max-width: 900px) {
    font-size: 1.2em;
  }
  @media (max-width: 800px) {
    width: 50%;
    font-size: 1.3em;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
  @media (max-width: 460px) {
    font-size: 1.1em;
    width: 80%;
  }
  @media (max-width: 370px) {
    width: 80%;
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

export const ContainerNotificar = styled.h3`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 0;
`;

export const ContainerBotaoCheckbox = styled.h3`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-top: 10%;

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const TextAreaDescricao = styled(TextArea)`
  border-color: ${Cores.preto};
  border-width: 1px;
  color: ${Cores.preto};
  ::placeholder {
    color: ${Cores.preto};

    @media (max-width: 1260px) and (min-width: 800px) {
    margin-top: 6%;
  }
  }
`;

export const DoisSelect = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
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
  margin-top: 5%;

  @media (max-width: 601px) and (min-width: 560px) {
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

  @media (max-height: 750px) {
    margin-top: 5%;
  }
`;

export const InputData = styled.input`
  width: 100%;
  height: 40px;
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
    if (props.camposVazios) {
      cor = Cores.vermelho;
    } else {
      cor = Cores.azul;
    }
    return cor;
  }};
`;

export const InputHora = styled(Input)`
  width: 100%;
  height: 34px;
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
      if (props.camposVazios) {
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
    color: ${Cores.preto};
  }
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
      if (props.camposVazios) {
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

export const TextoSelecioneUmaData = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 1.1em;
  color: ${Cores.azulEscuro};
  display: flex;
  justify-content: end;
  align-items: center;
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

export const TextoDoisSelects = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 1.1em;
  color: ${Cores.azulEscuro};
  display: flex;
  justify-content: start;
  align-items: center;

  @media (max-width: 560px) {
    margin-top: 15%;
  }
`;

export const ContainerConsultorio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
  height: 35px;
  padding-top: 5%;
  @media (max-width: 1717px) {
    margin-bottom: 5%;
  }
  @media (max-width: 1260px) and (min-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
  @media (max-width: 560px) {
    width: 100%;
    margin-bottom: 5%;
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

export const ContainerDuracaoConsulta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 40%;
  height: 40px;
  @media (max-width: 1622px) {
    margin-bottom: 5%;
  }
  @media (max-width: 763px) and (min-width: 697px) {
    margin-bottom: 9%;
  }
  @media (max-width: 560px) {
    width: 100%;
    //margin-bottom: 13%;
  }
  @media (max-width: 1260px) and (min-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
`;
