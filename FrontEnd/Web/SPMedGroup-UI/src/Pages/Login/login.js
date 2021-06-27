import { React, Component } from 'react'

import '../../assets/css/login.css'

import Header from '../../components/Header/header.js'
import Footer from '../../components/Footer/footer.js'

import { UsuarioAutenticado, ParseJwt } from '../../services/auth'

import axios from 'axios'


class Login extends Component {


    constructor(props) {

        super(props)

        this.state = {
            emailUser: '',
            senhaUser: '',
            erroMensagem: '',
            isLoading: false
        }
    }


    EfetuarLogin = (event) => {

        event.preventDefault()

        this.setState({ erroMensagem: '', isLoading: true })

        axios.post('http://localhost:5000/api/login', {
            email: this.state.emailUser,
            senha: this.state.senhaUser
        })

            .then(resposta => {

                if (resposta.status === 200) {

                    localStorage.setItem('usuario-login', resposta.data.token)

                    this.setState({ isLoading: false })

                    console.log('O meu token é: ' + resposta.data.token)

                    console.log(ParseJwt())

                    console.log(ParseJwt().role)  //adicionar a claim personalizada em LoginController



                    switch (ParseJwt().role) {

                        case '1':

                            console.log(this.props)

                            console.log(UsuarioAutenticado())

                            this.props.history.push('/listagemadm')
                            break;

                        case '2':

                            console.log(this.props)

                            console.log(UsuarioAutenticado())

                            this.props.history.push('/listagemmed')

                            break;

                        case '3':

                            console.log(this.props)

                            console.log(UsuarioAutenticado())

                            this.props.history.push('/listagempac')

                            break;

                        default:

                            console.log('redirecionado para a home')

                            this.props.history.push('/')

                            break;

                    }
                }
            })

            .catch(() => {

                this.setState({
                    erroMensagem: 'email ou senha inválidos, tente novamente',
                    isLoading: false
                })

            })

    }


    AtualizaStateCampo = async (campo) => {

        await this.setState({ [campo.target.name]: campo.target.value })

    }




    render() {   // tags de input e img precisam ter fechamento no JSX e html->class jsx->className

        return (

            <div>

                <Header />

                <main>

                    <section className="content">

                        <div className="login-titulo">
                            <h1>LOGIN</h1>
                        </div>

                        <form onSubmit={this.EfetuarLogin}>

                            <input
                                type="text"
                                className="campo-email"
                                placeholder="Insira o seu email"
                                name="emailUser"
                                value={this.state.emailUser}
                                onChange={this.AtualizaStateCampo}
                            />

                            <input
                                type="password"
                                className="campo-senha"
                                placeholder="Insira a sua senha"
                                name="senhaUser"
                                value={this.state.senhaUser}
                                onChange={this.AtualizaStateCampo}
                            />

                            {
                                this.state.isLoading === true &&
                                <div>
                                    <button
                                        className="btn-entrar"
                                        type="submit"
                                        disabled
                                    >
                                        LOADING
                                    </button>
                                </div>
                            }

                            {
                                this.state.isLoading === false &&
                                <div>
                                    <button
                                        className="btn-entrar"
                                        type="submit"
                                        disabled={this.state.emailUser === '' || this.state.senhaUser === '' ? 'none' : ''}
                                    >
                                        ENTRAR
                                    </button>
                                </div>
                            }

                            <p className="msg-erro"> {this.state.erroMensagem} </p>

                        </form>

                    </section>

                </main>

                <Footer />

            </div>

        )

    }

}


export default Login

