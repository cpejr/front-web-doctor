import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width:1800px;
  height: 620px;
`;

export const MensagemInicialChat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-left:37%;
  width: 53%;
  height: 100%;
  padding-top:17%;
  padding-bottom:19%;
  @media (max-width: 821px) {
    margin-left: 37%;
    width: 63%;
  }
  @media (max-width: 670px) and (min-width: 601px) {
    padding-left:10%;
  }
`;