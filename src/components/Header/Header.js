import React, { useEffect, useState } from 'react';
import {
  ContainerHeader,
  BotoesHeader,
  MenuHeader,
  Logo,
  CaixaFotoPerfil,
} from './Styles';
import Button from '../../styles/Button';
import logoGuilherme from './../../assets/logoGuilherme.png';
import logoEscrita from './../../assets/logoEscrita.png';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu, Spin } from 'antd';
import { MenuOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import * as managerService from '../../services/ManagerService/managerService';
import { Cores } from '../../variaveis';
import { logout } from '../../services/auth';
import { redirecionamento, sleep } from '../../utils/sleep';
import AddToast from '../AddToast/AddToast';
import { toast } from 'react-toastify';

function Header(props) {
  const email = sessionStorage.getItem('@doctorapp-Email');
  const [tipo, setTipo] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [fotoDePerfil, setFotoDePerfil] = useState('');
  const [carregandoFoto, setCarregandoFoto] = useState(true);
  const ehMedico = tipo === 'MASTER';

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: Cores.azulClaro }} spin />
  );

  async function pegandoTipo() {
    const resposta = await managerService.GetDadosUsuario(email);
    setUsuario(resposta.dadosUsuario);
    setTipo(resposta.dadosUsuario.tipo);
  }

  useEffect(() => {
    pegandoTipo();
  }, []);

  async function handleLogout() {
    try {
      logout();
      toast.success('Usuario deslogado com sucesso');
      await sleep(1500);
      redirecionamento('/login');
    } catch (error) {
      alert(error);
    }
  }

  async function setandoFotoDePerfil() {
    const chave = usuario.avatar_url;
    if (chave === null || chave === '') {
      setCarregandoFoto(false);
      return;
    }
    const arquivo = await managerService.GetArquivoPorChave(chave);
    setFotoDePerfil(arquivo);
    await sleep(700);
    setCarregandoFoto(false);
  }

  useEffect(() => {
    setandoFotoDePerfil();
  }, [usuario]);

  const history = useHistory();

  const menu = (
    <Menu>
      {ehMedico ? (
        <Menu.Item>
          <Button
            backgroundColor='transparent'
            borderColor='transparent'
            color={Cores.preto}
            fontSize='1rem'
            height='50px'
            onClick={() => {
              history.push('/web/areareceitas');
            }}
          >
            Receitas
          </Button>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Button
            backgroundColor='transparent'
            borderColor='transparent'
            color={Cores.preto}
            fontSize='1rem'
            height='50px'
            onClick={() => {
              history.push('/web/agendamentos');
            }}
          >
            Agendamentos
          </Button>
        </Menu.Item>
      )}
      {ehMedico && (
        <Menu.Item>
          <Button
            backgroundColor='transparent'
            borderColor='transparent'
            color={Cores.preto}
            fontSize='1rem'
            height='50px'
            onClick={() => {
              history.push('/web/home');
            }}
          >
            Home
          </Button>
        </Menu.Item>
      )}
      <Menu.Item>
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.preto}
          fontSize='1rem'
          height='50px'
          onClick={() => {
            history.push('/web/listadeusuarios');
          }}
        >
          Lista de Usuários
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.preto}
          fontSize='1rem'
          height='50px'
          onClick={() => {
            history.push('/web/listaformularios');
          }}
        >
          Formulários
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.preto}
          fontSize='1rem'
          height='50px'
          onClick={() => {
            history.push('/web/chat');
          }}
        >
          Chat
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.preto}
          fontSize='1rem'
          height='50px'
          onClick={() => {
            history.push('/web/perfil');
          }}
        >
          Perfil
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.preto}
          fontSize='1rem'
          height='50px'
          onClick={() => {
            handleLogout();
          }}
        >
          Sair
        </Button>
      </Menu.Item>
    </Menu>
  );

  const menuPerfil = (
    <Menu>
      <Menu.Item>
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.preto}
          fontSize='1rem'
          height='50px'
          onClick={() => {
            history.push('/web/perfil');
          }}
        >
          Perfil
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          backgroundColor='transparent'
          borderColor='transparent'
          color={Cores.preto}
          fontSize='1rem'
          height='50px'
          onClick={() => {
            handleLogout();
          }}
        >
          Sair
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <ContainerHeader>
        <MenuHeader>
          <Dropdown
            onClick={(e) => e.preventDefault()}
            overlay={menu}
            placement={'bottom'}
          >
            <MenuOutlined style={{ color: Cores.branco, fontSize: '1.5em' }} />
          </Dropdown>
        </MenuHeader>
        <Logo>
          <img src={logoGuilherme} className='logo1' alt='logoGuilherme'></img>
          <img src={logoEscrita} className='logo2' alt='logoEscrita'></img>
        </Logo>
        <BotoesHeader>
          {ehMedico ? (
            <Button
              fontSizeMedia1080='1rem'
              backgroundColor='transparent'
              borderColor='transparent'
              color={Cores.branco}
              fontSize='1.1rem'
              height='50px'
              onClick={() => {
                history.push('/web/areareceitas');
              }}
            >
              Receitas
            </Button>
          ) : (
            <Button
              fontSizeMedia1080='1rem'
              backgroundColor='transparent'
              borderColor='transparent'
              color={Cores.branco}
              fontSize='1.1rem'
              height='50px'
              onClick={() => {
                history.push('/web/agendamentos');
              }}
            >
              Agendamentos
            </Button>
          )}
          {ehMedico && (
            <Button
              fontSizeMedia1080='1rem'
              backgroundColor='transparent'
              borderColor='transparent'
              color={Cores.branco}
              fontSize='1.1rem'
              height='50px'
              onClick={() => {
                history.push('/web/home');
              }}
            >
              Home
            </Button>
          )}
          <Button
            fontSizeMedia1080='1rem'
            backgroundColor='transparent'
            borderColor='transparent'
            color={Cores.branco}
            fontSize='1.1rem'
            height='50px'
            onClick={() => {
              history.push('/web/listadeusuarios');
            }}
          >
            Lista de Usuários
          </Button>
          <Button
            fontSizeMedia1080='1rem'
            backgroundColor='transparent'
            borderColor='transparent'
            color={Cores.branco}
            fontSize='1.1rem'
            height='50px'
            onClick={() => {
              history.push('/web/listaformularios');
            }}
          >
            Formulários
          </Button>
          <Button
            fontSizeMedia1080='1rem'
            backgroundColor='transparent'
            borderColor='transparent'
            color={Cores.branco}
            fontSize='1.1rem'
            height='50px'
            onClick={() => {
              history.push('/web/chat');
            }}
          >
            Chat
          </Button>
          {usuario.avatar_url === null || usuario.avatar_url === '' ? (
            <Button
              fontSizeMedia1080='1rem'
              backgroundColor='transparent'
              borderColor='transparent'
              color={Cores.branco}
              height='50px'
              width='50px'
            >
              {carregandoFoto ? (
                <Spin size='small' indicator={antIcon} />
              ) : (
                <>
                  <Dropdown
                    onClick={(e) => e.preventDefault()}
                    overlay={menuPerfil}
                    placement={'bottom'}
                  >
                    <UserOutlined style={{ fontSize: '1.5em' }} />
                  </Dropdown>
                </>
              )}
            </Button>
          ) : (
            <Button
              fontSizeMedia1080='1rem'
              backgroundColor='transparent'
              borderColor='transparent'
              color={Cores.branco}
              height='50px'
              width='50px'
            >
              {carregandoFoto ? (
                <Spin size='small' indicator={antIcon} />
              ) : (
                <>
                  <Dropdown
                    onClick={(e) => e.preventDefault()}
                    overlay={menuPerfil}
                    placement={'bottom'}
                  >
                    <CaixaFotoPerfil>
                      <img
                        src={fotoDePerfil}
                        className='foto'
                        alt='fotoPerfil'
                        height='100%'
                        width='100%'
                      ></img>
                    </CaixaFotoPerfil>
                  </Dropdown>
                </>
              )}
            </Button>
          )}
        </BotoesHeader>
      </ContainerHeader>
      {props.children}
      <AddToast />
    </div>
  );
}
export default Header;
