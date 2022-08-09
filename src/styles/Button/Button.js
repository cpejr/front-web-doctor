import styled from "styled-components";
import { Fontes } from "../../variaveis";

const Button = styled.button`
  /*Posição */
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: center;
  justify-content: center;
  /*Medidas*/
  border-radius: 3px;
  margin-top: ${(props) => props.marginTop?? "2%"};
  margin-left: ${(props) => props.marginLeft};
  padding-top: ${(props) => props.paddingTop};
  height: ${(props) => props.height};
  gap: ${(props) => props.gap};
  width: ${(props) => props.width};
  /*cor e estilo do botão*/
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  border-radius: ${(props) => props.borderRadius};
  box-shadow: ${(props) => props.boxShadow};
  cursor: pointer;
  /*características do texto*/
  font-family: ${Fontes.roboto};
  font-size: ${(props) => props.fontSize};
  text-decoration: ${(props) => props.textDecoration};
  text-align: center;
  font-weight: ${(props) => props.fontWeight};
  @media (max-width: 480px) {
    font-size: ${(props) => props.fontSizeMedia};
  }
  @media (max-width: 560px) {
    width: 100%;
    height: ${(props) => props.heightMedia560};
  }
  @media (max-width: 920px) and (min-width: 560px){
    width: ${(props) => props.widthMedia ?? props.width};
  }

  @media (max-width: 600px) 
    width: ${(props) => props.widthMedia600};
  }

  @media (max-width: 800px)
  {
    margin-top: ${(props) => props.marginTopMedia ?? ((props) => props.marginTop?? "2%")};
  }
  
  @media (max-width: 950px) and (min-width: 480px) {
    font-size: ${(props) => props.fontSizeMedia950};
    
  }
  @media (max-width: 1080px) {
    font-size: ${(props) => props.fontSizeMedia1080};
  }
`;
export default Button;
