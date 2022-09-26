import styled from "styled-components";
import { Cores } from "../../variaveis";
import { Select , Input} from "antd";
const { Search } = Input;

export const ContainerListadeUsuarios = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2% 5% 2% 5%;
`;
export const TopoPagina = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 920px) {
    flex-direction: column;
    justify-content: center;
    gap: 10px;

  }

  @media (max-width: 450px) {
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

export const FiltrosEsquerda = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 50%;
  gap: 10px;

  @media (max-width: 920px) {
    width: 100%;
    justify-content: center;
    gap: 2%;
  }

  @media (max-width: 560px) {
    flex-direction: column-reverse;
    width: 100%;
    align-items: center;
    gap: 10px;
  }

`;

export const SelectTipoBusca = styled(Select)`
    width: 180px;
    border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.tipoBusca === "codigo"){
        cor = Cores.azul;
      } else {
        cor = Cores.cinza[8];
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;

  .ant-select-arrow{
    color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.tipoBusca === "codigo"){
        cor = Cores.azul;
      } else {
        cor = Cores.cinza[8];
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
  }

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const SearchStyle= styled(Search)`
   width: 100%;
    border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      if(props.tipoBusca === "codigo"){
        cor = Cores.azul;
      } else {
        cor = Cores.cinza[8];
      }
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;

  .ant-input-search-button{
    border: none;
  }

;`
export const BarraPesquisa = styled.div`
  width: 56%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 920px) {
    width: 100%;
    justify-content: center;
  }
`;
export const Filtros = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  @media (max-width: 920px) {
    width: 100%;
    justify-content: center;
    gap: 10px;
  }
 
  @media (max-width: 450px) {
    flex-direction: column-reverse;
    width: 100%;
    gap: 10px;
  }
`;
export const FiltroUsuario = styled(Select)`
  width: 180px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  justify-content: flex-end;
  
  @media(max-width: 920px)
  {
    justify-content: center;
    width: 100%;
  }
 
`;

export const FiltroDatas = styled(Select)`
  display: flex;
  flex-direction: row;
  width: 180px;
  justify-content: flex-end;
  @media(max-width: 920px)
  {
    justify-content: center;
    width: 100%;
  }
 
`;

export const BarraEstetica = styled.div`
  margin-top: 2%;
  margin-bottom: 1%;
  height: 2px;
  width: 100%;
  background-color: ${Cores.azul};
`;
export const DadosUsuario = styled.div`
  color: ${Cores.azul};
  justify-content: space-around;
  display: flex;
  flex-direction: row;
`;

export const ContainerUsuarios = styled.div`
  padding: 2% 0% 2% 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const Usuario = styled.div`
  display: flex;
  flex-direction: row;
  column-gap:10px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0% 1% 0% 1%;
  border-color: ${Cores.preto};
  border-style: solid;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2%;
`;

export const Titulo = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  @media (max-width: 880px) {
    display: none;
  }
`;
export const Imagem = styled.div`
  justify-content: center;
  align-items: center;
  object-fit: fill;
  width: 60px;
  height: 60px;
  display: flex;
  margin-right:1%;
  border-radius: 3px;
  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 880px) {
    display: none;
  }
`;
export const Nome = styled.div`
  width: 18%;
  justify-content: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  :hover {
    overflow: visible;
    cursor: pointer;
  }

  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 740px) {
    width: 25%;
  }
  @media (max-width: 660px) {
    width: 33%;
  }
  @media (max-width: 560px) {
    width: 50%;
  }
`;
export const Telefone = styled.div`
  width: 18%;
  justify-content: center;
  display: flex;
  @media (max-width: 880px) {
    width: 18%;
  }
  @media (max-width: 740px) {
    display: none;
  }
`;
export const UltimaVisita = styled.div`
  width: 14%;
  display: flex;
  justify-content: center;
  @media (max-width: 880px) {
    width: 14%;
  }
  @media (max-width: 740px) {
    width: 16%;
  }
  @media (max-width: 660px) {
    display: none;
  }
`;
export const BotaoAdicionar = styled.div`
  width: 18%;
  display: flex;
  justify-content: end;
  color: green;
  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 740px) {
    width: 25%;
  }
  @media (max-width: 660px) {
    width: 33%;
  }
  @media (max-width: 560px) {
    width: 50%;
  }
`;

export const CódigoPaciente = styled.div`
  width: 24%;
  display: flex;
  justify-content: center;
  text-align: center;
  word-break: break-all;
  @media (max-width: 880px) {
    width: 28%;
  }
  @media (max-width: 740px) {
    width: 30%;
  }
  @media (max-width: 660px) {
    width: 40%;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;
export const CaixaVazia = styled.div`
  width: 18%;

  @media (max-width: 880px) {
    width: 20%;
  }
  @media (max-width: 740px) {
    width: 25%;
  }
  @media (max-width: 660px) {
    width: 33%;
  }
  @media (max-width: 560px) {
    width: 50%;
  }
`;

export const BotoesMedico = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;

  @media (max-width: 560px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const CaixaBotaoMedico = styled.div`
   width: 50%;
   margin-top: 10px;

   @media(max-width: 560px){
   width: 100%;
   margin-top: 0px;
   }

`;

export const BotaoSecretario = styled.div`
  
  position: relative;
  left: 25%;
  width: 50%;

  @media (max-width: 920px) {
    left: 0%;
    width: 100%
  }
`;

export const ContainerSpin = styled.div`
  padding: 2% 0% 2% 0%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CaixaSpin = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

`;
