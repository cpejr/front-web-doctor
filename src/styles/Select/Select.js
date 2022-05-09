import styled from "styled-components";

const Select = styled.select`
  background-color: ${(props) => props.backgroundColor};
  text-align: left;
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.color};
  border-radius: 3px;
  font-size: 1em;
  margin-top: 2%;
  border-style: solid;
  border-width:2px;
  height: 50px;
  padding-left: 2%;
  width: ${(props) => props.width};

  option {
    border-color: ${(props) => props.borderColor};
    border-radius: 3px;
    border-style: solid;
    border-width: 0.1em;
    height: 50px;
    padding-left: 2%;
  }
`;

export default Select;
