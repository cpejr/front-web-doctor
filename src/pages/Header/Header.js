import React from "react";

function Header(props) {
  return (
    <div>
      <h1>Header</h1>
      {props.children}
    </div>
  );
}

export default Header;
