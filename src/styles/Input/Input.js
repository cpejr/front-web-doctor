import styled from "styled-components";

const Input = styled.input`
    background-color: ${(props) => props.backgroundColor};
    text-align: left;
    border-color: ${(props) => props.borderColor};
    color: ${(props) => props.color};
    border-radius: 3px;
    font-size: 1em;
    margin-top: 2%;
    border-style: solid;
    height: 50px;
    padding-left: 2%;
    width: ${(props) => props.width};
  `;

export default Input;