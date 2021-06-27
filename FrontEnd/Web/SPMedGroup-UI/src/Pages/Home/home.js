import '../../assets/css/home.css'

import doctors from '../../assets/img/doctors.png'
import calendar from '../../assets/img/calendar.png'
import search from '../../assets/img/search.png'
import ambulance from '../../assets/img/ambulance.png'

import Header from '../../components/Header/header.js'
import Footer from '../../components/Footer/footer.js'

import { Link } from 'react-router-dom'


function Home() {  //estudar diferentes formas de codar (function/class)(hooks/component)(fetch/axios)

  return (

    <div>

      <Header />

      <main>

        <div className="content-home">

          <div className="banner">

            <div className="banner-content">

              <img className="banner-img" src={doctors} alt="imagem de médicos" />

              <p>Conheça a clínica SP Medical Group e nossas especialidades</p>

            </div>

          </div>

          <div className="options">

            <div className="options-content">

              <Link to="login">
                <div className="search">
                  <img src={search} alt="imagem de uma lupa" />
                  <p>VER CONSULTAS</p>
                </div>
              </Link>

              <Link to="cadastro">
                <div className="calendar">
                  <img src={calendar} alt="imagem de um calendário" />
                  <p>AGENDAR CONSULTA</p>
                </div>
              </Link>

              <Link to="/">
                <div className="ambulance">
                  <img src={ambulance} alt="imagem de uma ambulância" />
                  <p>CORPO CLÍNICO</p>
                </div>
              </Link>


            </div>


          </div>


        </div>



      </main>


      <Footer />


    </div>

  )

}

export default Home;
