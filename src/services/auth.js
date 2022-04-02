export const CHAVE_EMAIL = "@doctorapp-Email";
export const CHAVE_TOKEN = "@doctorapp-Token";

export const usuarioAutenticado = () => sessionStorage.getItem(CHAVE_TOKEN) !== null;
export const recebeToken = () => sessionStorage.getItem(CHAVE_TOKEN);
export const recebeEmail = () => sessionStorage.getItem(CHAVE_EMAIL);

export const login = ( token, email) => {
  sessionStorage.setItem(CHAVE_TOKEN, token);
  sessionStorage.setItem(CHAVE_EMAIL, email);
};
export const logout = () => {
  sessionStorage.removeItem(CHAVE_TOKEN);
};