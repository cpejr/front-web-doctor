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
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: center;
  margin-top: 3%;
  margin-bottom: 3%;
  font-weight: 400;

  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
    flex-direction: column;
  }
  @media (max-width: 780px) {
    width: 85%;
  }
  @media (max-width: 360px) {
    height: 450px;
  }
`;

export const MetadeEsquerda = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-top: 10%;
  margin-bottom: 3%;
  font-weight: 400;
  border-right: 2px solid #151B57;
  
  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
  }
  @media (max-width: 780px) {
    width: 85%;
  }
  @media (max-width: 360px) {
    height: 450px;
  }
`;

export const MetadeDireita = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-top: 10%;
  margin-bottom: 3%;
  font-weight: 400;
  

  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
  }
  @media (max-width: 780px) {
    width: 85%;
  }
  @media (max-width: 360px) {
    height: 450px;
  }
`;

export const TituloCentral = styled.p`
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 18px;
  font-size: 30px;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 600;
  color: #0A0E3C;
`;
export const SubtituloCentral = styled.p`
  padding-bottom: 18px;
  font-size: 25px;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
`;
export const TituloEsquerda = styled.p`
  padding-left: 10%;
  padding-top: 18px;
  font-size: 30px;
  text-align: left;
  width: 100%;
  font-family: "Roboto Condensed", sans-serif;
  color: ${(props) => props.color};
`;
export const Conteudo = styled.p`
  padding-left: 10%;
  padding-right: 10%;
  width: 100%;
  font-size: 20px;
  text-align: left;
  font-family: "Roboto Condensed", sans-serif;
  color: ${(props) => props.color};
`;

export const TextoSaibaMais = styled.p`
padding-left: 10%;
width: 100%;
font-size: 30px;
font-family: "Roboto Condensed", sans-serif;
color: ${(props) => props.color};
text-align: left;
`;

export const BoxBemVindo = styled.div`
  background-color: #FFFFFF; 
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
export const BoxVideo = styled.div`
  background-color: #C4C4C4; 
  font-size: 20px;
  height: 90%;
  width: 40%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export const BoxTime = styled.div`
  background-color: #FFFFFF; 
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export const BoxSaibaMais = styled.div`
  background-color: ${(props) => props.backgroundColor};
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

export const BoxAlterarImagem = styled.div`
  background-color: #FFFFFF; 
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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


export const SubTitulo = styled.div`
  /* background-color: #CFD3F8; */
  font-size: 20px;
  height: 10%;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;

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

export const BotaoGenerico = styled.button`
  /* background-color: #CFD3F8; */
  background-color: green;
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;

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

export const ContainerBotoes = styled.button`
  background-color: green;
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-top: 10%;
  margin-bottom: 4%;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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