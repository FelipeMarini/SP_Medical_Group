import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { UsuarioAutenticado, ParseJwt } from './services/auth.js'

import Home from './Pages/Home/home'
import Login from './Pages/Login/login'
import CadastroAdm from './Pages/CadastroAdm/cadastro_adm'
import DescricaoMed from './Pages/DescricaoMed/descricao_med'
import ListagemAdm from './Pages/ListagemAdm/listagem_adm'
import ListagemMed from './Pages/ListagemMed/listagem_med'
import ListagemPac from './Pages/ListagemPac/listagem_pac'
import NotFound from './Pages/NotFound/not_found'

import reportWebVitals from './reportWebVitals'



const PermissaoAdm = ({ component: Component }) => (

    <Route

        render={props =>

            UsuarioAutenticado() && ParseJwt().role === '1' ?

                <Component {...props} /> :

                <Redirect to='/' />

        }

    />

)


const PermissaoMed = ({ component: Component }) => (

    <Route

        render={props =>

            UsuarioAutenticado() && ParseJwt().role === '2' ?

                <Component {...props} /> : <Redirect to='/' />

        }

    />

)


const PermissaoPac = ({ component: Component }) => (

    <Route

        render={props =>

            UsuarioAutenticado() && ParseJwt().role === '3' ?

                <Component {...props} /> : <Redirect to='/' />

        }

    />

)



const routing = (

    <Router>

        <div>

            <Switch>

                <Route exact path='/' component={Home} />
                <Route exact path='https://www.facebook.com' />
                <Route exact path='https://www.instagram.com' />
                <Route exact path='https://www.twitter.com/' />
                <Route path='/login' component={Login} />
                <PermissaoAdm path='/cadastro' component={CadastroAdm} />
                <Route path='/descricao' component={DescricaoMed} />  {/* vai virar cadastro de paciente e médico*/}
                <PermissaoAdm path='/listagemadm' component={ListagemAdm} />
                <PermissaoMed path='/listagemmed' component={ListagemMed} />
                <PermissaoPac path='/listagempac' component={ListagemPac} />
                <Route path='/notfound' component={NotFound} />
                <Redirect to='/notfound' />

            </Switch>

        </div>

    </Router>

)


ReactDOM.render(routing, document.getElementById('root'))


reportWebVitals();
