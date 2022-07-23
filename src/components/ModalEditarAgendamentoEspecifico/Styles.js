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
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 100%;
  min-height: 70vh;
  padding: 5%;
  margin-top: 5%;

  @media (max-width: 800px) {
    width: 100%;
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
  margin-bottom: 2%;

  @media (max-width: 500px) {
    flex-direction: column;
    height: 120px;
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
    height: 100%;
  }

  @media (max-width: 1260px) and (min-width: 800px) {
    flex-direction: column;
    height: 100%;
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

  @media (max-width: 560px) {
    width: 100%;
    margin-bottom: 5%;
  }
  @media (max-width: 1260px) and (min-width: 800px) {
    width: 90%;
    margin-bottom: 5%;
  }
`;

export const InputHora = styled.input`
  width: 100%;
  height: 100%;
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 1em;
  color: ${Cores.preto};
  padding-left: 5%;
  border-color: ${Cores.preto};
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
  ::placeholder {
    color: ${Cores.preto};
  }
`;

export const InputDuracao = styled(Input)`
  width: 100%;
  height: 100%;
  color: ${Cores.preto};
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 0.9em;
  padding-left: 5%;
  border-color: ${Cores.preto};
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;

  .ant-input {
    ::placeholder {
      color: ${Cores.preto};
    }
  }
`;

export const TextoSelecioneUmaData = styled.h3`
  font-family: ${Fontes.barlow};
  font-weight: 500;
  font-size: 0.9em;
  color: ${Cores.azulEscuro};
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const SelecioneUmaData = styled.h3`
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
