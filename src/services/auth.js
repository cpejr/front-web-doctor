export const CHAVE_EMAIL = "@doctorapp-Email";
export const CHAVE_TOKEN = "@doctorapp-Token";
export const CHAVE_TIPO = "@doctorapp-Tipo";

export const usuarioAutenticado = () =>
  sessionStorage.getItem(CHAVE_TOKEN) !== null;
export const recebeToken = () => sessionStorage.getItem(CHAVE_TOKEN);
export const recebeEmail = () => sessionStorage.getItem(CHAVE_EMAIL);
export const recebeTipo = () => sessionStorage.getItem(CHAVE_TIPO);

export const login = (token, email, tipo) => {
  sessionStorage.setItem(CHAVE_TOKEN, token);
  sessionStorage.setItem(CHAVE_EMAIL, email);
  sessionStorage.setItem(CHAVE_TIPO, tipo);
};
export const logout = () => {
  sessionStorage.removeItem(CHAVE_TOKEN);
};
