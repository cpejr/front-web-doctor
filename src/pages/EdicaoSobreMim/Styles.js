import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  min-height: 100vh;
`;
export const Titulo = styled.h1`
  padding: 35px 0;
  margin: 0;

  font-family: "Barlow";
  font-weight: 500;
  font-size: 50px;
  line-height: 60px;
`;
export const EdicaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;

  border: 1px solid #000000;
  mix-blend-mode: normal;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
`;
export const Inputs = styled.div`
  display: flex;
  align-items: flex-start;

  width: 1200px;
  height: 780px;

  gap: 95px;

  padding: 0 151px;
`;
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 53px;

  padding: 35px 0;

  flex: 1;
`;
export const InputImagemContainer = styled.div`
  width: 314px;
  height: 159px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #c4c4c4;
`;
export const InputMensagemBotao = styled.button`
  width: 228px;
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
`;
export const InputTitulo = styled.input``;
export const InputAreaTexto = styled.textarea``;
export const Divisor = styled.div`
  height: 614px;
  border-right: 3px solid rgba(139, 139, 139, 0.5);
`;
export const BotaoContainer = styled.div``;
export const Botao = styled.button``;
