import React from 'react';
import { recebeTipo } from '../../services/auth';
import HomeMedico from '../../components/HomeMedico';
import HomeSecretaria from '../../components/HomeSecretaria';

function Home() {
  const usuarioAtualTipo = recebeTipo();

  return usuarioAtualTipo === 'MASTER' ? <HomeMedico /> : <HomeSecretaria />;
}

export default Home;
