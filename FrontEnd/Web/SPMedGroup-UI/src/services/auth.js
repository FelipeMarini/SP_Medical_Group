export const UsuarioAutenticado = () => localStorage.getItem('usuario-login') !== null


export const ParseJwt = () => {

    let base64 = localStorage.getItem('usuario-login').split('.')[1]    //pegar o payload do token

    return JSON.parse(window.atob(base64))     //converte o payload para JSON
}