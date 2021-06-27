import { React, Component } from 'react'

import '../../assets/css/descricao_med.css'

import Header from '../../components/Header/header.js'
import Footer from '../../components/Footer/footer.js'

import { Link } from 'react-router-dom'
import axios from 'axios'


class DescricaoMed extends Component {





    render() {

        return (

            <div>

                <Header />

                <main>

                    <section className="content-cadastro">


                        <div className="user-box">
                            <p>MÉDICO</p>
                        </div>

                        <div className="cadastrar-consulta">
                            <h1>INSERIR DESCRIÇÃO</h1>
                        </div>


                        <section className="box-cadastro">


                            <div className="data-cadastro">
                                <h2 className="titulos-cadastro">NÚMERO DA CONSULTA</h2>
                                <input className="inputs-cadastro" type="text" placeholder="Insira a data da consulta" />
                            </div>




                            <div className="descricao-cadastro">
                                <h2 className="titulos-cadastro">INSERIR DESCRIÇÃO:</h2>
                                <input id="descricao-box" className="inputs-cadastro" type="text"
                                    placeholder="Insira a descrição da consulta" />
                            </div>


                            <div id="btn-cadastrar" className="cadastrar-consulta">
                                <h1>ATUALIZAR CONSULTA</h1>
                            </div>


                        </section>


                    </section>


                </main>

                <Footer />

            </div>

        )

    }

}

export default DescricaoMed