import styled from "styled-components";
import { Cores } from "../../variaveis";

export const CarrosselContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
`;

export const InteriorCarrossel = styled.div`
  width: 80%;
  height: 100%;
  background-color: ${Cores.cinza[1]};
  background-image: ${(props) => props.backgroundImage};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
`;

export const Esquerda = styled.div`
  width: 10%;
  height: 100%;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export const Centro = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  text-align: justify;
  text-align-last: center;
`;

export const BotaoGenerico = styled.button`
  background-color: green;
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  align-items: center;

  @media (max-width: 600px) {
    margin-bottom: 5%;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

export const Direita = styled.div`
  width: 10%;
  height: 100%;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export const CaixaCarregando = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const CaixaUpload = styled.div`
.ant-upload{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100% ;
  width: 100% ;
  background-color:${Cores.azulClaro};
  border-radius: 3px;
  border-width: 10px ;
  border-color:${Cores.azul};
  color:${Cores.preto};
  font-size: 20px ;

  @media (max-width: 950px) {
    font-size: 0.9em;
  }
}
`;
