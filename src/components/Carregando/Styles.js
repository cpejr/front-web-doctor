import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: #E4E6F4;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Carregar = styled.div`
  width: 12px;
  height: 12px;
  background-color: #151b57;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-left: 5px;
  animation-delay:${(props) => props.animation};

  @keyframes spin {
  0% {
    transform: translateY(0px)
  }
  50% {
    transform: translateY(-10px)
  }
}
`;
