import { React, Component } from 'react'

import '../../assets/css/listagem.css'

import pencil from '../../assets/img/pencil.png'

import Header from '../../components/Header/header.js'
import Footer from '../../components/Footer/footer.js'

import axios from 'axios'


class ListagemMed extends Component {


    constructor(props) {

        super(props)

        this.state = {
            listaConsultas: [],
            listaSituacoes: [],
            idConsultaAlterada: 0,
            idmedico: 0,
            idpaciente: 0,
            idsituacao: 0,
            data: new Date(),
            descricaoMed: '',  // só faltando acertar a inserção de descrição!
            isLoading: false
        }

    }



    BuscarConsultasMed = () => {


        this.setState({ isLoading: true })


        axios('http://localhost:5000/api/consultas/medlist', {
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


    BuscarSituacaoPorId = (consulta) => {


        document.getElementById('pop-up-situacao').style.display = 'block'   // pop-up


        this.setState({     // nome do state : nome da propriedade do banco de dados

            idConsultaAlterada: consulta.idConsulta,
            idmedico: consulta.idMedico,
            idpaciente: consulta.idPaciente,
            idsituacao: consulta.idSituacao,
            data: consulta.dataConsulta,
            descricaoMed: consulta.descricao
        },

            () => {
                console.log('A Consulta ' + consulta.idConsulta + ' foi selecionada,',)
                console.log('valor do state idmedico: ' + consulta.idMedico)
                console.log('valor do state idpaciente: ' + consulta.idPaciente)
                console.log('valor do state idsituacao: ' + consulta.idSituacao)
                console.log('valor do state data: ' + consulta.dataConsulta)
                console.log('valor do state descricaoMed: ' + consulta.descricao)
            })

    }




    BuscarDescricaoPorId = (consulta) => {


        document.getElementById('pop-up-descricao').style.display = 'block'   // pop-up


        this.setState({     // nome do state : nome da propriedade do banco de dados

            idConsultaAlterada: consulta.idConsulta,
            idmedico: consulta.idMedico,
            idpaciente: consulta.idPaciente,
            idsituacao: consulta.idSituacao,
            data: consulta.dataConsulta,
            descricaoMed: consulta.descricao
        },

            () => {
                console.log('A Consulta ' + consulta.idConsulta + ' foi selecionada,',)
                console.log('valor do state idmedico: ' + consulta.idMedico)
                console.log('valor do state idpaciente: ' + consulta.idPaciente)
                console.log('valor do state idsituacao: ' + consulta.idSituacao)
                console.log('valor do state data: ' + consulta.dataConsulta)
                console.log('valor do state descricaoMed: ' + consulta.descricao)
            })

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

                        idSituacao: this.state.idsituacao,  // aqui altera a situação

                        dataConsulta: this.state.data,
                        descricao: this.state.descricaoMed

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


                .then(this.BuscarConsultasMed)

        }
    }




    AtualizaStateCampo = async (campo) => {

        await this.setState({ [campo.target.name]: campo.target.value })

        console.log(this.state.idmedico)
        console.log(this.state.idpaciente)
        console.log(this.state.idsituacao)
        console.log(this.state.descricaoMed)
        console.log(this.state.data)

    }



    FecharPopUpSituacao = () => {

        document.getElementById('pop-up-situacao').style.display = 'none'

    }



    FecharPopUpDescricao = () => {

        document.getElementById('pop-up-descricao').style.display = 'none'

    }




    LimparLista = () => {

        this.setState({ listaConsultas: [] })

        console.log('A tabela foi limpa')
    }




    componentDidMount() {

        this.BuscarSituacoes()

    }




    render() {

        return (

            <div>

                <Header />

                <main>

                    <section className="content-lista">

                        <div className="user-box">
                            <p>MÉDICO</p>
                        </div>

                        <div className="titulo-listar">
                            <h1>LISTA DE CONSULTAS</h1>
                        </div>


                        <button
                            className="btn-listar"
                            type="button"
                            onClick={this.BuscarConsultasMed}>
                            Listar Consultas
                        </button>

                        <button
                            className="btn-listar"
                            type="button"
                            onClick={this.LimparLista}>
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

                                                    <td className="campo-situacao-med">
                                                        {consulta.idSituacaoNavigation.descricaoSituacao}
                                                        <button className="btn-pencil" onClick={() => this.BuscarSituacaoPorId(consulta)}>
                                                            <img className="pencil" src={pencil} alt="imagem de um lápis" />
                                                        </button>
                                                    </td>

                                                    <td>{consulta.dataConsulta.split('T')[0].split('-').reverse().join('/')}</td>

                                                    <td className="campo-descricao-med">
                                                        {consulta.descricao}
                                                        <button className="btn-pencil" onClick={() => this.BuscarDescricaoPorId(consulta)}>
                                                            <img className="pencil" src={pencil} alt="imagem de um lápis" />
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



                    {/* POP UP PARA ALTERAR A SITUAÇÃO */}


                    <div id="pop-up-situacao" className="pop-up-situacao" >


                        <h1>Alterar Situação</h1>


                        <form onSubmit={this.EditarConsulta}>


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

                            <button
                                type="submit"
                            >
                                Atualizar Consulta
                            </button>


                        </form>

                        <div>
                            <p>A consulta {this.state.idConsultaAlterada} está sendo editada.</p>

                            <button type="button" onClick={this.FecharPopUpSituacao}>Cancelar</button>
                        </div>


                    </div>


                    {/* FIM DO POP UP PARA ALTERAR A SITUAÇÃO */}




                    {/* POP UP PARA INSERIR A DESCRIÇÃO */}


                    <div id="pop-up-descricao" className="pop-up-descricao" >


                        <h1>Inserir Descrição</h1>


                        <form onSubmit={this.EditarConsulta}>

                            < input
                                className="input-descricao"
                                id="descricao-consulta"
                                type='text'
                                name="descricaoMed"
                                value={this.state.descricaoMed}
                                onChange={this.AtualizaStateCampo}
                                placeholder='Inserir Descrição da Consulta'
                            />


                            <button
                                type="submit"
                            >
                                Atualizar Consulta
                            </button>

                        </form>

                        <div>
                            <p>A consulta {this.state.idConsultaAlterada} está sendo editada.</p>

                            <button type="button" onClick={this.FecharPopUpDescricao}>Cancelar</button>
                        </div>


                    </div>

                    {/* FIM DO POP UP PARA INSERIR A DESCRIÇÃO */}




                </main>

                <Footer />


            </div>

        )

    }

}


export default ListagemMed






























