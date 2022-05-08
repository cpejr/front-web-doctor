import styled from "styled-components";

const Input = styled.input`
  background-color: ${(props) => props.backgroundColor};
  text-align: left;
  border-color: ${(props) => {
    let cor;
    if (!props.borderColor) {
      cor = props.erro ? "#E00000" :  "#151B57";
    } else {
      cor = props.borderColor;
    }
    return cor;
  }};
  color: ${(props) => props.color};
  border-radius: 3px;
  font-size: ${(props) => props.fontSize};
  margin-top: ${(props) => props.marginTop};
  border-style: solid;
  height: 50px;
  padding-left: 2%;
  box-shadow: ${(props) => props.boxShadow};
  border-width: ${(props) => props.borderWidth};
  width: ${(props) => props.width};
  @media (max-width: 820px) {
    width: 100%;
  }
`;

export default Input;
