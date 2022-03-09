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
        <Route exact path="/web" component={() => <Redirect to="/web/homemedico" />} />
        <Route path="/web" component={UserHeader} />
        <Route component={() => <Redirect to="/web/homemedico" />} />
      </Switch>
    </BrowserRouter>
  )
}

function UserHeader() {
  return (
    <Header>
      <Switch>
        <Route exact path="/web/homemedico" component={HomeMedico} />
        <Route exact path="/web/homesecretaria" component={HomeSecretaria} />
        <Route exact path="/web/editarperfil" component={AlterarDados} />
        <Route exact path="/web/alterarsenha" component={AlterarSenha} />
        <Route exact path="/web/areareceitas" component={AreaReceitas} />
        <Route exact path="/web/chat" component={Chat} />
        <Route
          exact
          path="/web/criacaoformulario"
          component={CriacaoFormulario}
        />
        <Route exact path="/web/editarconteudo" component={EdicaoConteudo} />
        <Route
          exact
          path="/web/listaformularios"
          component={ListaFormularios}
        />
        <Route exact path="/web/listadeusuarios" component={ListaUsuarios} />
        <Route exact path="/web/modeloreceitas" component={ModeloReceitas} />
        <Route exact path="/web/perfil" component={Perfil} />
        <Route exact path="/web/perfildopaciente" component={PerfilPaciente} />
        <Route
          exact
          path="/web/respostaformulario"
          component={RespostaFormulario}
        />
        <Route component={() => <Redirect to="/web/homemedico" />} />
      </Switch>
    </Header>
  );
}

export default Routes;
