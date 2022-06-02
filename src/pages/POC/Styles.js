import styled from "styled-components";
import { Cores } from "../../variaveis";

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: ${Cores.cinza[7]};
  display: flex;
  justify-content: center;
  align-items: center;
`;