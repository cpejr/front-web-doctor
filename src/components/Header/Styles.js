import styled from "styled-components";

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #151b57;
  height: 100px;
  padding-left: 5%;
  padding-right: 5%;

  color: white;
`;
export const BotoesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  @media (max-width: 780px) {
    display: none;
  }
`;
export const Logo = styled.div`
  display: flex;
  width: 35%;

  .logo1 {
    width: 15%;
  }
  .logo2 {
    width: 80%;
  }

  @media (max-width: 1080px) {
    display: flex;
    width: 15%;
    .logo1 {
      width: 55%;
    }
    .logo2 {
      display: none;
    }
  }
  @media (max-width: 780px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;

    .logo1 {
      width: 20%;
    }
    .logo2 {
      display: flex;
      width: 100%;
    }
  }
  @media (max-width: 380px) {
    width: 100%;

    .logo1 {
      width: 15%;
    }
    .logo2 {
      display: flex;
      width: 75%;
    }
  }
`;
export const MenuHeader = styled.div`
  display: none;

  @media (max-width: 780px) {
    display: flex;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 100px;
  min-height: 100vh;
  width: fit-content;
  padding: 20px;
  background-color: ${({ theme }) => theme.sidebar.background};
  color: ${({ theme }) => theme.sidebar.color};

  .search-icon {
    color: ${({ theme }) => theme.sidebar.color};

    &:hover {
      color: ${({ theme }) => theme.primary};
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 768px) {

    height: 100%;
  }
`;

export const Separator = styled.div`
  border-top: solid 1px white;
  height: 2px;
  width: 90%;
  margin: 16px 0;

  &:hover {
    opacity: 0.5;
  }
`;



export const Section = styled.div`
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  a {
    text-decoration: none;
  }
`;

Section.Title = styled.p`
  display: block;
  margin-right: auto;
  color: ${({ theme }) => theme.sidebar.smooth};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.bold};
`;