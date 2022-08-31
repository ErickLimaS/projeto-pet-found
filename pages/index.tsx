import homeStyles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import Meta from '../components/Meta'

const Home: NextPage = () => {
  return (
    <>
      <Meta title='Início' />

      <div className={homeStyles.first_content}>

        <div className={homeStyles.text}>

          <span>SEJA BEM VINDO</span>

          <h1>VOCÊ VIU O MEU CACHORRO ?</h1>

          <p>
            Nossa ONG* ajuda a seus <span>animais</span> a reencontrarem seus <span>donos</span>
          </p>

        </div>

      </div>

      <div className={homeStyles.content}>

        <section className={homeStyles.about_us_section}>

          <h1>Sobre Nós</h1>

          <div className={homeStyles.text_section}>

            <img src='./imgs/home/missing-dog-1.jpg' alt='Cartaz de Cachorro Perdido'></img>

            <div className={homeStyles.text}>

              <h2>Lorem Lorem Lorem</h2>

              <small>Lorem Lorem</small>

              <span></span>

              <p>
                Lorem Lorem LoremLorem Lorem Lorem Lorem Lorem LoremLorem Lorem LoremvLorem Lorem LoremLorem Lorem Lorem
              </p>

            </div>

          </div>

        </section>

      </div>

    </>
  )
}

export default Home
