export const CHAVE_TOKEN = "@doctorapp-Token";
export const usuarioAutenticado = () => sessionStorage.getItem(CHAVE_TOKEN) !== null;
export const recebeToken = () => sessionStorage.getItem(CHAVE_TOKEN);
export const login = token => {
  sessionStorage.setItem(CHAVE_TOKEN, token);
};
export const logout = () => {
  sessionStorage.removeItem(CHAVE_TOKEN);
};