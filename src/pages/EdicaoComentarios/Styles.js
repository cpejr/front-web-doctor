import styled from 'styled-components';

export const ContainerEdicaoComentarios = styled.div`
  display: flex;
  width: 100%;
  max-width: 1800px;
  height: 621px;
  position: fixed;

  @media (max-height: 715px) {
    position: relative;
  }
  @media (max-height: 1300px) and (min-height: 715px) {
    height: 100%;
  }

  @media (min-height: 1301px) {
    height: 95%;
  }

  @media (max-width: 670px) {
    display: none;
  }
`;