import { React, Component } from 'react'

import '../../assets/css/cadastro_adm.css'

import Header from '../../components/Header/header.js'
import Footer from '../../components/Footer/footer.js'

import { Link } from 'react-router-dom'



class CadastroAdm extends Component {      // métodos -> fetch


    constructor(props) {

        super(props)

        this.state = {
            idmedico: 0,
            idpaciente: 0,
            idsituacao: 1,  //quando cadastra uma consulta a situação é sempre 1=agendada 
            data: new Date(),
            descricaoConsulta: '',
            listaMedicos: [],
            listaPacientes: [],
            isLoading: false,
            mensagemConfirmação: ''
        }
    }



    //buscar os médicos para ter a listaMedicos atualizada no select do cadastro

    BuscarMedicos = () => {

        console.log('Agora vamos fazer a chamada para a API para trazer os médicos')

        fetch('http://localhost:5000/api/medicos', {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => resposta.json())

            .then(dados => this.setState({ listaMedicos: dados }))

            .catch(erro => console.log(erro))
    }


    //buscar os pacientes para ter a listaPacientes atualizada no select do cadastro

    BuscarPacientes = () => {

        console.log('Agora vamos fazer a chamada para a API para trazer os pacientes')

        fetch('http://localhost:5000/api/pacientes', {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => resposta.json())

            .then(dados => this.setState({ listaPacientes: dados }))

            .catch(erro => console.log(erro))
    }



    CadastrarConsulta = (event) => {

        event.preventDefault()

        this.setState({ isLoading: true })

        fetch('http://localhost:5000/api/consultas', {
            method: 'POST',
            body: JSON.stringify({  //"NOME DA COLUNA DO BANCO DE DADOS" : "NOME DO STATE"
                idMedico: this.state.idmedico,
                idPaciente: this.state.idpaciente,
                idSituacao: this.state.idsituacao,
                dataConsulta: this.state.data,
                descricao: this.state.descricaoConsulta
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {

                if (resposta.status === 201) {

                    console.log('Consulta cadastrada com sucesso')

                    this.setState({
                        mensagemConfirmação: 'Consulta agendada com sucesso',
                        isLoading: false
                    })

                }

            })

            .catch(erro => {
                console.log(erro)
                this.setState({ isLoading: false })
            })

            .then(this.LimparCampos)

    }


    AtualizaStateCampo = async (campo) => {

        await this.setState({ [campo.target.name]: campo.target.value })

    }


    LimparCampos = () => {
        this.setState({
            idmedico: 0,
            idpaciente: 0,
            data: new Date(),
            descricaoConsulta: ''
        })
    }


    componentDidMount() {

        this.BuscarMedicos()
        this.BuscarPacientes()

    }



    render() {

        return (

            <div>

                <Header />

                <main>

                    <section className="content-cadastro">


                        <div className="user-box">
                            <p>ADMNISTRADOR</p>
                        </div>

                        <div className="cadastrar-consulta">
                            <h1>CADASTRAR CONSULTA</h1>
                        </div>


                        <form onSubmit={this.CadastrarConsulta}>


                            <section className="box-cadastro">


                                <div className="med-cadastro">

                                    <h2 className="titulos-cadastro">MÉDICO:</h2>

                                    <select
                                        name="idmedico"
                                        value={this.state.idmedico}
                                        onChange={this.AtualizaStateCampo}
                                    >

                                        <option value="0">
                                            Selecione o Médico
                                        </option>

                                        {
                                            this.state.listaMedicos.map(med => {
                                                return (
                                                    <option key={med.idMedico} value={med.idMedico}>
                                                        {med.nomeMedico}
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>

                                </div>



                                <div className="pac-select">

                                    <h2 className="titulos-cadastro">NOME DO PACIENTE:</h2>

                                    <select
                                        name="idpaciente"
                                        value={this.state.idpaciente}
                                        onChange={this.AtualizaStateCampo}
                                    >

                                        <option value="0">
                                            Selecione o Paciente
                                        </option>

                                        {
                                            this.state.listaPacientes.map(pac => {
                                                return (
                                                    <option key={pac.idPaciente} value={pac.idPaciente}>
                                                        {pac.nomePaciente}
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>

                                    {/* FAZER POP-UP OU TELA DE CADASTRO DE PACIENTES COMO EXTRA*/}
                                    <p className="pac-cadastro">Cadastrar Paciente</p>

                                </div>


                                <div className="data-cadastro">
                                    <h2 className="titulos-cadastro">DATA DE AGENDAMENTO:</h2>
                                    <input
                                        className="inputs-cadastro"
                                        type="date"
                                        name="data"
                                        value={this.state.data}
                                        onChange={this.AtualizaStateCampo}
                                        placeholder="Insira o nome do médico" />
                                </div>


                                <div className="descricao-cadastro">
                                    <h2 className="titulos-cadastro">DESCRIÇÃO:</h2>
                                    <input
                                        id="descricao-box"
                                        className="inputs-cadastro"
                                        type="text"
                                        name="descricaoConsulta"
                                        value={this.state.descricaoConsulta}
                                        onChange={this.AtualizaStateCampo}
                                        placeholder="Insira a descrição da consulta" />
                                </div>


                                {
                                    this.state.isLoading === true &&

                                    <button
                                        type="submit"
                                        id="btn-cadastrar"
                                        disabled
                                    >
                                        Agendando...
                                    </button>
                                }


                                {
                                    this.state.isLoading === false &&

                                    <button
                                        type="submit"
                                        id="btn-cadastrar"
                                    >
                                        Agendar
                                    </button>
                                }

                                <p className="msg-confirmacao"> {this.state.mensagemConfirmação} </p>


                            </section>

                        </form>


                    </section>


                </main>

                <Footer />

            </div>

        )

    }

}


export default CadastroAdm