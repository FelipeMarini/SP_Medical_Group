import { React, Component } from 'react'

import '../../assets/css/listagem.css'

import lixo from '../../assets/img/lixo.png'
import pencil from '../../assets/img/pencil.png'

import Header from '../../components/Header/header.js'
import Footer from '../../components/Footer/footer.js'

import axios from 'axios'


class ListagemAdm extends Component {



    constructor(props) {

        super(props)

        this.state = {

            listaConsultas: [],
            listaMedicos: [],
            listaPacientes: [],
            listaSituacoes: [],
            idConsultaAlterada: 0,
            idmedico: 0,
            idpaciente: 0,
            idsituacao: 0,
            data: new Date(),
            descricaoConsulta: '',
            isLoading: false        //vai usar nesta page para desabilitar/habilitar botões?

        }

    }



    BuscarMedicos = () => {


        fetch('http://localhost:5000/api/medicos', {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => resposta.json())

            .then(dados => this.setState({ listaMedicos: dados }))

            .catch(erro => console.log(erro))

    }



    BuscarPacientes = () => {


        fetch('http://localhost:5000/api/pacientes', {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => resposta.json())

            .then(dados => this.setState({ listaPacientes: dados }))

            .catch(erro => console.log(erro))

    }



    BuscarSituacoes = () => {


        fetch('http://localhost:5000/api/situacoes', {

            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => resposta.json())

            .then(dados => this.setState({ listaSituacoes: dados }))

            .catch(erro => console.log(erro))

    }




    BuscarConsultas = () => {


        this.setState({ isLoading: true })


        axios('http://localhost:5000/api/consultas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {

                if (resposta.status === 200) {

                    this.setState({ listaConsultas: resposta.data, isLoading: false })

                    console.log(this.state.listaConsultas)

                }

            })

            .catch(erro => {

                console.log(erro)

                this.setState({ isLoading: false })
            })

    }


    BuscarConsultaPorId = (consulta) => {


        document.getElementById('pop-up').style.display = 'block'   // pop-up


        this.setState({     // nome do state : nome da propriedade do banco de dados

            idConsultaAlterada: consulta.idConsulta,
            idmedico: consulta.idMedico,
            idpaciente: consulta.idPaciente,
            idsituacao: consulta.idSituacao,
            data: consulta.dataConsulta,
            descricaoConsulta: consulta.descricao
        },

            () => {
                console.log(
                    'A Consulta ' + consulta.idConsulta + ' foi selecionada,',
                )
            })

    }


    FecharPopUp = () => {

        document.getElementById('pop-up').style.display = 'none'

    }



    EditarConsulta = (event) => {

        event.preventDefault()

        if (this.state.idConsultaAlterada !== 0) {

            fetch('http://localhost:5000/api/consultas/' + this.state.idConsultaAlterada,
                {
                    method: 'PUT',
                    body: JSON.stringify({      // nome da propriedade do banco de dados : nome do state

                        // propriedades do domain Consulta

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

                    if (resposta.status === 204) {

                        console.log(
                            'Consulta ' + this.state.idConsultaAlterada + ' atualizada.',

                        )
                    }

                })

                .then(this.BuscarConsultas)

            // .then(this.LimparCampos) ?
        }
    }




    ExcluirConsulta = (consulta) => {


        console.log('A Consulta ' + consulta.idConsulta + ' foi selecionada')


        fetch('http://localhost:5000/api/consultas/' + consulta.idConsulta, {

            method: 'DELETE'

        })

            .then(resposta => {

                if (resposta.status === 204) {

                    console.log('Consulta ' + consulta.idConsulta + ' foi excluída')

                }

            })

            .catch(erro => console.log(erro))

            .then(this.BuscarConsultas)
    }




    AtualizaStateCampo = async (campo) => {

        await this.setState({ [campo.target.name]: campo.target.value })

        console.log(this.state.idmedico)
        console.log(this.state.idpaciente)
        console.log(this.state.idsituacao)
        console.log(this.state.descricaoConsulta)
        console.log(this.state.data)

    }



    LimparCampos = () => {

        this.setState({
            listaConsultas: [],    //separar aqui do resto para um método distinto?
            nomeMed: '',
            nomePac: '',
            descSituacao: '',
            data: new Date(),
            descricaoConsulta: ''
        })

        console.log('A lista e os campos de edição foram limpos')
    }




    componentDidMount() {

        //chamar os dados para os selects

        this.BuscarMedicos()

        this.BuscarPacientes()

        this.BuscarSituacoes()

    }



    render() {

        return (

            <div>

                <Header />

                <main>

                    <section className="content-lista">

                        <div className="user-box">
                            <p>ADMNISTRADOR</p>
                        </div>

                        <div className="titulo-listar">
                            <h1>LISTA DE CONSULTAS</h1>
                        </div>


                        <button
                            className="btn-listar"
                            type="button"
                            onClick={this.BuscarConsultas}>
                            Listar Consultas
                        </button>

                        <button
                            className="btn-listar"
                            type="button"
                            onClick={this.LimparCampos}>
                            Limpar Lista
                        </button>


                        {/* <div className="campos-search">
                        <input className="input-paciente" type="text" placeholder="Nome do Paciente"/>
                        <input className="input-medico" type="text" placeholder="Nome do Médico"/>
                        <img className="lupa-listar" src={search} alt="imagem de uma lupa"/>
                        </div>, USAR FILTER PARA FAZER O MÉTODO DE BUSCA DE CONSULTAS COMO EXTRA */}

                        <section className="lista-consultas">

                            <table className="tabela-lista">

                                <thead>
                                    <tr>
                                        <th>NÚMERO DA CONSULTA</th>
                                        <th>MÉDICO</th>
                                        <th>PACIENTE</th>
                                        <th>SITUAÇÃO</th>
                                        <th>DATA DA CONSULTA</th>
                                        <th>DESCRIÇÃO</th>
                                        <th>EDITAR</th>
                                        <th>EXCLUIR</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        this.state.listaConsultas.map(consulta => {

                                            return (

                                                <tr key={consulta.idConsulta}>

                                                    <td>{consulta.idConsulta}</td>
                                                    <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                                    <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                                    <td>{consulta.idSituacaoNavigation.descricaoSituacao}</td>

                                                    {/* formatando data do padrão Date() para o formato brasileiro, mas sem a hora */}
                                                    <td>{consulta.dataConsulta.split('T')[0].split('-').reverse().join('/')}</td>

                                                    <td>{consulta.descricao}</td>

                                                    <td>
                                                        <button className="btn-pencil" onClick={() => this.BuscarConsultaPorId(consulta)}>
                                                            <img className="pencil" src={pencil} alt="imagem de um lápis" />
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button className="btn-lixo" onClick={() => this.ExcluirConsulta(consulta)}>
                                                            <img className="lixo" src={lixo} alt="imagem de uma lata de lixo" />
                                                        </button>
                                                    </td>

                                                </tr>

                                            )

                                        })
                                    }

                                </tbody>

                            </table>


                        </section>

                    </section>




                    {/* POP UP DE EDIÇÃO */}


                    <div id="pop-up" className="pop-up" >


                        <h1>Editar Consulta</h1>


                        <form onSubmit={this.EditarConsulta}>

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


                            <select
                                name="idsituacao"
                                value={this.state.idsituacao}
                                onChange={this.AtualizaStateCampo}
                            >

                                <option value="0">
                                    Selecione a Situação
                                </option>

                                {
                                    this.state.listaSituacoes.map(s => {
                                        return (
                                            <option key={s.idSituacao} value={s.idSituacao}>
                                                {s.descricaoSituacao}
                                            </option>
                                        )
                                    })
                                }

                            </select>


                            <input
                                className="input-data"
                                id="data-consulta"
                                type='date'       //usar type='datetime-local' para inserir hora no formato padrão Date() 
                                name="data"       // Ex de data padrão Date(): AAAA-MM-DDT00:00:00:00.000 
                                value={this.state.data}
                                onChange={this.AtualizaStateCampo}
                                placeholder='Inserir Data da Consulta'
                            />


                            <input
                                className="input-descricao"
                                id="descricao-consulta"
                                type='text'
                                name="descricaoConsulta"
                                value={this.state.descricaoConsulta}
                                onChange={this.AtualizaStateCampo}
                                placeholder='Inserir Descrição da Consulta'
                            />


                            <button
                                //conseguir desabilitar o botão enquanto todos os campos de edição não estiverem preenchidos!
                                type="submit"
                            >
                                Atualizar Consulta
                            </button>


                        </form>


                        <div>
                            <p>A consulta {this.state.idConsultaAlterada} está sendo editada.</p>

                            <button type="button" onClick={this.FecharPopUp}>Cancelar</button>
                        </div>


                    </div>


                    {/* FIM POP UP DE EDIÇÃO */}



                </main>

                <Footer />

            </div>

        )

    }

}


export default ListagemAdm