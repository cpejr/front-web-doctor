import styled from "styled-components";

export const Corpo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  border: solid 1px black;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  width: 50%;
  height: 100%;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: 400;
  padding: 2%;

  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
    flex-direction: column;
    align-items: center;
    width: 70%;
  }

  @media (max-width: 570px) {

  }
`;

export const TituloPaginaEdicao = styled.div`
  width: 70%;
  padding: 1% 10% 4% 10%;
  font-size: 25px;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 500;
  color: #000000;

  @media (max-width: 570px) {
    width: 100%;
}

  @media (max-width: 425px) {
    font-size: 20px;
  }
  @media (max-width: 360px) {
    font-size: 16px;
  }
`;

