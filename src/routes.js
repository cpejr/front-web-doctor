import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AlterarSenha from "./pages/AlterarSenha";
import AreaReceitas from "./pages/AreaReceitas";
import Cadastro from "./pages/Cadastro";
import Chat from "./pages/Chat";
import CriacaoFormulario from "./pages/CriacaoFormulario";
import EdicaoConteudo from "./pages/EdicaoConteudo";
import Header from "./components/Header/Header";
import ListaFormularios from "./pages/ListaFormularios";
import ListaUsuarios from "./pages/ListaUsuarios";
import Login from "./pages/Login";
import ModeloReceitas from "./pages/ModeloReceitas";
import Perfil from "./pages/Perfil";
import PerfilPaciente from "./pages/PerfilPaciente";
import RespostaFormulario from "./pages/RespostaFormulario";
import EditarPerfil from "./pages/EditarPerfil";
import Agendamentos from "./pages/Agendamentos";
import { usuarioAutenticado, recebeTipo } from "./services/auth";
import EditarFormulario from "./pages/EditarFormulario/EditarFormulario";
import FormularioEspecifico from "./pages/FormularioEspecifico";

const RotasPrivadas = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      usuarioAutenticado() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);
const RotasPrivadasMedico = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      usuarioAutenticado() && recebeTipo() === "MASTER" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/web/listadeusuarios",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const RotasPrivadasSecretaria = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      usuarioAutenticado() && recebeTipo() === "SECRETARIA(O)" ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/web/listadeusuarios", state: { from: props.location } }}
        />
      )
    }
  />
);

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <RotasPrivadas  exact path="/cadastro" component={Cadastro}/>
        <RotasPrivadasMedico
          exact
          path="/web"
          component={() => <Redirect to="/web/listadeusuarios" />}
        />
        <RotasPrivadas path="/web" component={UserHeader} />
        <RotasPrivadasMedico
          component={() => <Redirect to="/web/listadeusuarios" />}
        />
      </Switch>
    </BrowserRouter>
  );
}

function UserHeader() {
  return (
    <Header>
      <Switch>
        <RotasPrivadas
          exact
          path="/web/editarperfil"
          component={EditarPerfil}
        />
        <Route
          exact
          path="/web/alterarsenha"
          component={AlterarSenha}
        />
        <RotasPrivadasMedico
          path="/web/areareceitas"
          component={AreaReceitas}
        />
        <RotasPrivadasSecretaria
          exact
          path="/web/agendamentos"
          component={Agendamentos}
        />
        <RotasPrivadas exact path="/web/chat" component={Chat} />
        <RotasPrivadasMedico
          exact
          path="/web/criacaoformulario"
          component={CriacaoFormulario}
        />
        <RotasPrivadasMedico
          exact
          path="/web/editarformulario"
          component={EditarFormulario}
        />
        <RotasPrivadasMedico
          exact
          path="/web/editarconteudo"
          component={EdicaoConteudo}
        />
        <RotasPrivadas
          exact
          path="/web/listaformularios"
          component={ListaFormularios}
        />
        <RotasPrivadas
          exact
          path="/web/listadeusuarios"
          component={ListaUsuarios}
        />
        <RotasPrivadasMedico
          exact
          path="/web/modeloreceitas"
          component={ModeloReceitas}
        />
        <RotasPrivadas exact path="/web/perfil" component={Perfil} />
        <RotasPrivadas
          exact
          path="/web/perfildopaciente"
          component={PerfilPaciente}
        />
        <RotasPrivadas
          exact
          path="/web/respostaformulario"
          component={RespostaFormulario}
        />
        <RotasPrivadas
          path="/web/formularioespecifico"
          component={FormularioEspecifico}
        />
        <RotasPrivadas component={() => <Redirect to="/web/listadeusuarios" />} />
      </Switch>
    </Header>
  );
}

export default Routes;
