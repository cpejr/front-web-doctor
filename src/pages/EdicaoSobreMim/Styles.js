import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
export const EdicaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 15px;

  text-align: center;

  border: 1px solid #000000;
  mix-blend-mode: normal;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;

  width: 100%;
  max-width: 1200px;

  @media (max-width: 910px) {
    padding: 20px;
  }
`;
export const Titulo = styled.h1`
  padding: 35px 0;
  margin: 0;

  justify-self: flex-start;

  font-family: "Barlow";
  font-weight: 500;
  font-size: 50px;

  @media (max-width: 700px) {
    font-size: 40px;
  }

  @media (max-width: 350px) {
    font-size: 30px;
  }
`;
export const Inputs = styled.form`
  position: relative;

  display: flex;
  align-items: flex-start;
  
  height: 100%;

  gap: 95px;

  @media (max-width: 910px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 25px;
    height: auto;
    width: 100%; 

    padding: 0;
  }
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 53px;

  padding: 35px 0;

  flex: 1;

  @media (max-width: 910px) {
    width: 100%;
    max-width: 24rem;
  }
`;
export const InputImagemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 22rem;
  
  height: 10rem;

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

export const InputImagem = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  width: 100%;
  max-width: 14.5rem;

  height: 40px;

  font-family: "Roboto Condensed";
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  text-align: center;

  color: #000000;

  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    #e4e6f4;
  mix-blend-mode: normal;
  border: 2px solid #bbc0f4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;
export const InputTextoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
  max-width: 22rem;
  
  height: 100%;

  padding: 5px;

  background: #E4E6F4;
  border: 2px solid #C4C4C4;
  border-radius: 3px;
`;
export const InputTitulo = styled.input`
  width: 100%;
  max-width: 15rem;

  margin-top: 10px;

  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  text-align: center;

  border: 2px dashed gray;

  background: #E4E6F4;
  color: #000000;
`;
export const InputAreaTexto = styled.textarea`
  resize: none;

  width: 100%;
  max-width: 15rem;
  
  height: 150px;

  margin-top: 18px;
  margin-bottom: 24px;

  font-style: normal;
  font-weight: 350;
  font-size: 10px;
  line-height: 12px;
  text-align: justify;
  white-space: normal;
  
  border: 2px dashed gray;

  padding: 5px;

  background: #E4E6F4;
  color: #000000;

  &::-webkit-scrollbar {
    width: 0.5em;
  }
 
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;
export const Divisor = styled.div`
  height: 614px;
  border-right: 3px solid rgba(139, 139, 139, 0.5);

  @media (max-width: 910px) {
    height: 0;
    width: 80%;
    border-top: 3px solid rgba(139, 139, 139, 0.5);
  }
`;
export const BotaoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 15px;

  flex-direction: column;
`;
export const Botao = styled.button`
  width: 100%;
  white-space: nowrap;
  
  height: 60px;

  padding: 0 5px;

  mix-blend-mode: normal;
  border: 3px solid #0A0E3C;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;

  font-family: 'Barlow';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;

  ${(props) => props.salvar && salvarBotaoStyle}
  ${(props) => props.cancelar && cancelarBotaoStyle}

  @media (max-width: 400px) {
    font-size: 20px;
  }
`;

const salvarBotaoStyle = css`
  background: #8F95D2;
  color: #FFFFFF;
`

const cancelarBotaoStyle = css`
  /* background: rgba(248, 207, 207, 0.5); */
  background: green;
  color: rgba(10, 14, 60, 0.6);
`