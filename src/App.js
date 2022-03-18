import React from "react";
import GlobalStyle from "./globalStyles";
import Routes from "./routes";
import Carregando from "./components/Carregando/Carregando";
function App() {
  return (
    <div>
      <GlobalStyle />
      <Routes />
      <Carregando />
    </div>
  );
}

export default App;
