import React from 'react'

import logo from '../../assets/img/logo.png'

import '../../assets/css/home.css'

import { Link } from 'react-router-dom'


function Header() {

    return (

        <header>

            <div className="header-content">

                <div className="menu-options">

                    <div className="img-flex">
                        <Link to="/" ><img src={logo} alt="logo sp medical group" /></Link>
                    </div>

                    <div className="menu-flex">
                        <Link to="/"><p className="menu-opcao">SOBRE</p></Link>
                        <Link to="/"><p className="menu-opcao">CLÍNICAS</p></Link>
                        <Link to="/"><p className="menu-opcao">ESPECIALIDADES</p></Link>
                        <Link to="cadastro"><p className="menu-opcao">CADASTRO</p></Link>
                        <Link to="login"><p className="menu-opcao">LOGIN</p></Link>
                    </div>

                </div>

            </div>

        </header>

    )

}

export default Header