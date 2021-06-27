import React, { Component } from 'react'

import logo from '../../assets/img/logo.png'
import facebook from '../../assets/img/facebook.png'
import instagram from '../../assets/img/instagram.png'
import twitter from '../../assets/img/twitter.png'

import { Link } from 'react-router-dom'

class Footer extends Component {

    render() {

        return (

            <footer>

                <div className="footer-content">

                    <div className="footer-options">

                        <Link to="/"><img className="img-footer" src={logo} alt="logo sp medical group" /></Link>

                        <div className="links-uteis">
                            <Link to="/"><p>LINKS ÚTEIS</p></Link>
                        </div>

                        <div className="trabalhe-conosco">
                            <Link to="/"><p>TRABALHE CONOSCO</p></Link>
                        </div>

                        <div className="privacidade">
                            <Link to="/"><p>PRIVACIDADE</p></Link>
                        </div>

                        <div className="contato">
                            <Link to="/"><p>CONTATO</p></Link>
                        </div>

                        <div className="social-media">
                            <p>SIGA-NOS:</p>
                            <a href="https://www.facebook.com"><img src={facebook} alt="logo do facebook" /></a>
                            <Link to="http://www.instagram.com"><img src={instagram} alt="logo do instagram" /></Link>
                            <Link to="https://www.twitter.com"><img src={twitter} alt="logo do twitter" /></Link>
                        </div>

                    </div>

                </div>

            </footer>

        )

    }

}

export default Footer