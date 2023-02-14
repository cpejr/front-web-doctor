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
    align-items: center;
  }

  @media (max-width: 780px) {
    width: 85%;
  }
 
`;

export const MetadeEsquerda = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-top: 6%;
  margin-bottom: 8%;
  font-weight: 400;
  border-right: 1px solid #151B57;

  
  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: -7%;
    border-right: 0px;
  }

  @media (max-width: 780px) {
    width: 85%;
  }
 
`;

export const MetadeDireita = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-top: 6%;
  margin-bottom: 8%;
  font-weight: 400;
  border-left: 1px solid #151B57;

  @media (max-width: 900px) {
    margin-top: 10%;
    margin-bottom: 10%;
    border-left: 0px;
  }

  @media (max-width: 780px) {
    width: 85%;
  }
  
`;

export const TituloCentral = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 18px;
  font-size: 30px;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 600;
  color: #0A0E3C;

  @media (max-width: 425px) {
    font-size: 20px;
  }
  @media (max-width: 360px) {
    font-size: 16px;
  }
  
`;
export const SubtituloCentral = styled.div`
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 18px;
  padding-bottom: 15px;
  font-size: 25px;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;

  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

export const TextoSaibaMais = styled.div`
padding-left: 10%;
width: 100%;
font-size: 130%;
font-family: "Roboto Condensed", sans-serif;
color: ${(props) => props.color};
text-align: left;
margin-bottom: 0%;

@media (max-width: 280px) {
  padding-left: 20%;
}
`;

export const BoxBemVindo = styled.div`
padding-top: 15px;
padding-bottom: 15px;
  background-color: #FFFFFF; 
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: solid 3px;
  border-color: ${(props) => props.borderColor ?? "white"};
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);

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
  height: 150px;
  width: 70%;
  margin-bottom: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    margin-bottom: 5%;
  }
`;

export const BoxTime = styled.div`
  background-color: #FFFFFF; 
  font-size: 20px;
  height: auto;
  width: 76%;
  margin-bottom: 4%;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: solid 3px;
  border-color: ${(props) => props.borderColor ?? "white"};
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);

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
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 4px;
  padding: 4% 0%;
  border: solid 3px;
  border-color: ${(props) => props.borderColor};
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);

  @media (max-width: 600px) {
    margin-bottom: 5%;
  }
  @media (max-width: 425px) {
    font-size: 18px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
  }
  @media (max-width: 280px) {
    align-items: left;
  }
`;

export const BoxAlterarImagem = styled.div`
  background-color: #FFFFFF; 
  font-size: 20px;
  height: auto;
  width: 76%;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: solid 3px white;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.25);

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


export const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  width: 76%;
  gap: 10%;
  font-size: 20px;
  border-radius: 6px;
  border: solid 3px #bbc0f4;
  font-family: "Roboto Condensed", sans-serif;
  border-color: transparent;
  @media (max-width: 900px) {
    gap: 20px;
  }
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

