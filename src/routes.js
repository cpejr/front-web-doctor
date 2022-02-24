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
        <Route path="/menu" component={Header} />
        <Route component={() => <Redirect to="/menu/homemedico" />} />
      </Switch>
    </BrowserRouter>
  );
}

function UserMenu() {
  return (
    <Header>
      <Switch>
        <Route exact path="/menu/homemedico" component={HomeMedico} />
        <Route exact path="/menu/homesecretaria" component={HomeSecretaria} />
        <Route exact path="/menu/alterardados" component={AlterarDados} />
        <Route exact path="/menu/alterarsenha" component={AlterarSenha} />
        <Route exact path="/menu/areareceitas" component={AreaReceitas} />
        <Route exact path="/menu/chat" component={Chat} />
        <Route
          exact
          path="/menu/criacaoformulario"
          component={CriacaoFormulario}
        />
        <Route exact path="/menu/edicaoconteudo" component={EdicaoConteudo} />
        <Route
          exact
          path="/menu/listaformularios"
          component={ListaFormularios}
        />
        <Route exact path="/menu/listausuarios" component={ListaUsuarios} />
        <Route exact path="/menu/modeloreceitas" component={ModeloReceitas} />
        <Route exact path="/menu/perfil" component={Perfil} />
        <Route exact path="/menu/perfilpaciente" component={PerfilPaciente} />
        <Route
          exact
          path="/menu/respostaformulario"
          component={RespostaFormulario}
        />
      </Switch>
    </Header>
  );
}

export default Routes;
