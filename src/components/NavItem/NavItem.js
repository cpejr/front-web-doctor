import React from "react";
import { Title, Wrapper } from "./styles";
export default function NavItem({ open, Icon, children, onClick, selected }) {
  return (
    <Wrapper onClick={onClick} selected={selected}>
      {" "}
      <Icon /> {open && <Title>{children}</Title>}{" "}
    </Wrapper>
  );
}
