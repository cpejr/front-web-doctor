import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AlterarDados from "./pages/AlterarDados";
import AlterarSenha from "./pages/AlterarSenha";
import AreaReceitas from "./pages/AreaReceitas";
import Cadastro from "./pages/Cadastro";
import Chat from "./pages/Chat";
import CriacaoFormulario from "./pages/CriacaoFormulario";
import EdicaoConteudo from "./pages/EdicaoConteudo";
import Header from "./pages/Header";
import HomeMedico from "./pages/HomeMedico";
import HomeSecretaria from "./pages/HomeSecretaria";
import ListaFormularios from "./pages/ListaFormularios";
import ListaUsuarios from "./pages/ListaUsuarios";
import Login from "./pages/Login";
import ModeloReceitas from "./pages/ModeloReceitas";
import Perfil from "./pages/Perfil";
import PerfilPaciente from "./pages/PerfilPaciente";
import RespostaFormulario from "./pages/RespostaFormulario";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastro" component={Cadastro} />
        <Route path="/header" component={UserHeader} />
        <Route component={() => <Redirect to="/header/homemedico" />} />
      </Switch>
    </BrowserRouter>
  )
}

function UserHeader() {
  return (
    <Header>
      <Switch>
        <Route exact path="/header/homemedico" component={HomeMedico} />
        <Route exact path="/header/homesecretaria" component={HomeSecretaria} />
        <Route exact path="/header/alterardados" component={AlterarDados} />
        <Route exact path="/header/alterarsenha" component={AlterarSenha} />
        <Route exact path="/header/areareceitas" component={AreaReceitas} />
        <Route exact path="/header/chat" component={Chat} />
        <Route
          exact
          path="/header/criacaoformulario"
          component={CriacaoFormulario}
        />
        <Route exact path="/header/edicaoconteudo" component={EdicaoConteudo} />
        <Route
          exact
          path="/header/listaformularios"
          component={ListaFormularios}
        />
        <Route exact path="/header/listausuarios" component={ListaUsuarios} />
        <Route exact path="/header/modeloreceitas" component={ModeloReceitas} />
        <Route exact path="/header/perfil" component={Perfil} />
        <Route exact path="/header/perfilpaciente" component={PerfilPaciente} />
        <Route
          exact
          path="/header/respostaformulario"
          component={RespostaFormulario}
        />
      </Switch>
    </Header>
  );
}

export default Routes;
