import styled from 'styled-components';
import { Cores } from "../../variaveis";
import { Input } from "antd";
const { TextArea } = Input;

export const EdicaoComentariosPagina = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ContainerEdicaoComentarios = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 1px;
  border-style:solid;
  padding-left: 25%;
  padding-right: 25%;
  padding-top: 2%;
  padding-bottom: 2%;
  margin-top:2%;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 3px;

  @media (max-width: 755px) {
    padding-left: 15%;
    padding-right: 15%;
  }

  @media (max-width: 490px) {
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 5%;
  }

`;

export const TituloEdicaoComentario = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: 40px;
  font-weight: 500;
  line-height: 48px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 10%;

  @media (max-width: 755px) {
    font-size: 35px;
    font-weight: 500;
  }

  @media (max-width: 490px) {
    font-size: 30px;
    font-weight: 500;
  }

  @media (max-width: 351px) {
    font-size: 28px;
    font-weight: 500;
  }

  @media (max-width: 351px) {
    font-size: 23px;
    font-weight: 500;
  }
  
  
`;

export const SubtituloEdicaoComentario = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: 25px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: center;
  border-color: ${Cores.preto};
  border-width: 1px;
  border-style: solid;
  border-bottom: 0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding:19px;
  box-shadow: 0px 4px 4px 0px #00000040;
  padding-top: 10px;

  @media (max-width: 755px) {
    font-size: 20px;
    font-weight: 500;
  }

  @media (max-width: 490px) {
    font-size: 18px;
    font-weight: 500;
  }

  @media (max-width: 351px) {
    font-size: 16px;
    font-weight: 500;
  }

  @media (max-width: 321px) {
    font-size: 14px;
    font-weight: 500;
  }

`;

export const TextAreaComentario = styled(TextArea)`
  border-color: ${Cores.preto};
  border-width: 1px;
  border-top: 0;
  color: ${Cores.preto};
  width: 360px;
  max-height:400px;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  ::placeholder {
    color: ${Cores.preto};
  }

  @media (max-width: 755px) {
    width: 296px;
  }

  @media (max-width: 490px) {
    width: 270px;
  }
    @media (max-width: 351px) {
    width: 244px;
  }
  @media (max-width: 321px) {
    width: 219px;
  }

`;


export const BotaoSalvarAlteracoes = styled.button`
  height: 60px;
  width: 363px;
  border-radius: 3px;
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #8F95D2;
  font-family: 'Barlow', sans-serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0em;
  color: white;
  border-color: #000000;
  border-width: 3px;
  margin-top: 10%;
  margin-bottom:3%;
  border-style:solid;

  @media (max-width: 755px) {
    height: 50px;
    width: 300px;
    font-size: 25px;
    font-weight: 600;
  }

  @media (max-width: 490px) {
    height: 45px;
    width: 250px;
    font-size: 20px;
    font-weight: 600;
  }

  @media (max-width: 351px) {
    height: 45px;
    width: 220px;
    font-size: 18px;
    font-weight: 600;
  }
  @media (max-width: 321px) {
    height: 45px;
    width: 200px;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const BotaoEditarAlteracoes = styled.button`
  height: 60px;
  width: 363px;
  border-radius: 3px;
  box-shadow: 0px 4px 4px 0px #00000040;
  background-color: #F8CFCF80;
  font-family: 'Barlow', sans-serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 36px;
  letter-spacing: 0em;
  color: #0A0E3C99;
  border-width: 1px;

  @media (max-width: 755px) {
    height: 50px;
    width: 300px;
    font-size: 25px;
    font-weight: 600;
  }

  @media (max-width: 490px) {
    height: 45px;
    width: 250px;
    font-size: 20px;
    font-weight: 600;
  }

  @media (max-width: 351px) {
    height: 45px;
    width: 220px;
    font-size: 18px;
    font-weight: 600;
  }

  @media (max-width: 321px) {
    height: 45px;
    width: 200px;
    font-size: 16px;
    font-weight: 600;
  }
`;