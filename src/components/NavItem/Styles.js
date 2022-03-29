import styled from "styled-components/macro";
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  color: ${({ theme, selected }) =>
    selected ? theme.primary : theme.sidebar.color};
  &:hover {
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
  }
`;
export const Title = styled.h4`
  font-size: 16px;
  line-height: 22px;
  font-weight: ${({ theme }) => theme.regular};
  margin: 0;
  margin-left: 7px;
  text-align: center;
  color: inherit;
`;
