import homeStyles from '../styles/Home.module.css'
import type { NextPage } from 'next'
import Image from 'next/image'
import Meta from '../components/Meta'
import * as SVG from '../public/imgs/svg'

const Home: NextPage = () => {
  return (
    <>
      <Meta title='Início' />

      <div className={homeStyles.first_content}>
        <div className={homeStyles.text}>

          <span>SEJA BEM VINDO</span>

          <h1>VOCÊ VIU O MEU DONO ?</h1>

          <p>
            Nossa <span>ONG</span> ajuda com o reencontro de <span>ANIMAIS</span> com seus <span>DONOS</span>
          </p>

        </div>

      </div>

      <div className={homeStyles.content}>

        <section className={homeStyles.about_us_section} id='about'>

          <h2>Sobre Nós</h2>

          <div className={homeStyles.text_section}>

            <Image src='/imgs/home/missing-dog-1.jpg' alt='Cartaz de Cachorro Perdido' height={400} width={400} layout='intrinsic'/>;

            <div className={homeStyles.text}>

              <h3>Lorem Lorem Lorem</h3>

              <small>Lorem Lorem</small>

              <span></span>

              <p>
                Lorem Lorem LoremLorem Lorem Lorem Lorem Lorem LoremLorem Lorem LoremvLorem Lorem LoremLorem Lorem Lorem
              </p>

            </div>

          </div>

        </section>

        <section className={homeStyles.our_mission_section} id='our-mission'>

          <h2>Nossa Missão</h2>

          <div className={homeStyles.our_standarts}>

            <div className={homeStyles.standart}>

              <div className={homeStyles.img_container}>

                <SVG.Binoculars />

              </div>

              <div className={homeStyles.info}>

                <h3>Visão</h3>

                <p>Lorem lorem loremloremLorem lorem loremloremLorem lorem loremlorem Lorem lorem loremloremLorem lorem loremlorem Lorem lorem loremloremLorem lorem loremloremLorem lorem loremloremLorem lorem loremlorem</p>

              </div>

            </div>

            <div className={homeStyles.standart}>

              <div className={homeStyles.img_container}>

                <SVG.Rocket2 />

              </div>

              <div className={homeStyles.info}>

                <h3>Missão</h3>

                <p>Lorem lorem loremloremLorem lorem loremloremLorem lorem loremlorem Lorem lorem loremloremLorem lorem loremlorem Lorem lorem loremloremLorem lorem loremloremLorem lorem loremloremLorem lorem loremlorem</p>

              </div>

            </div>

            <div className={homeStyles.standart}>

              <div className={homeStyles.img_container}>

                <SVG.Target />

              </div>

              <div className={homeStyles.info}>

                <h3>Meta</h3>

                <p>Lorem lorem loremloremLorem lorem loremloremLorem lorem loremlorem Lorem lorem loremloremLorem lorem loremlorem Lorem lorem loremloremLorem lorem loremloremLorem lorem loremloremLorem lorem loremlorem</p>

              </div>

            </div>

          </div>

        </section>

        {/* SECTION - SHOWING PEOPLE WHO ALREADY HAVE BEEN USING THE WEBSITE BEFORE */}
        {/* <section className={homeStyles.who_approves_section} id='who-approves'>

          <h2>Sobre Nós</h2>

          <div className={homeStyles.text_section}>

            <img src='./imgs/home/missing-dog-1.jpg' alt='Cartaz de Cachorro Perdido'></img>

            <div className={homeStyles.text}>

              <h3>Lorem Lorem Lorem</h3>

              <small>Lorem Lorem</small>

              <span></span>

              <p>
                Lorem Lorem LoremLorem Lorem Lorem Lorem Lorem LoremLorem Lorem LoremvLorem Lorem LoremLorem Lorem Lorem
              </p>

            </div>

          </div>

        </section> */}

        <section className={homeStyles.our_team_section} id='our-team'>

          <h2>Nosso Time</h2>

          <p>
            Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
            Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
            Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
            Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
          </p>

          <div className={homeStyles.team}>

            <ul className={homeStyles.team_list}>

              <li className={homeStyles.team_member}>

                <img></img>

                <h3>Nome</h3>

                <h4>Função</h4>

                <p>
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                </p>

              </li>

              <li className={homeStyles.team_member}>

                <img></img>

                <h3>Nome</h3>

                <h4>Função</h4>

                <p>
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                </p>

              </li>

              <li className={homeStyles.team_member}>

                <img></img>

                <h3>Nome</h3>

                <h4>Função</h4>

                <p>
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                </p>

              </li>

              <li className={homeStyles.team_member}>

                <img></img>

                <h3>Nome</h3>

                <h4>Função</h4>

                <p>
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                  Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem Lorem lorem
                </p>

              </li>

            </ul>

          </div>

        </section>

        <section className={homeStyles.newsletter_section} id='newsletter'>

          <div className={homeStyles.text_section}>

            <div className={homeStyles.form}>

              <h3>Registre-se Em Nossa Newsletter</h3>

              <p>
                Fique informado com todas as novidades que nossa ONG anda fazendo para melhorar a vida de nossos animais
              </p>

              <form onSubmit={() => console.log('submit')}>

                <label htmlFor='name'>
                  <input type='text' id='name' placeholder='Seu nome'></input>
                </label>

                <label htmlFor='email'>
                  <input type='email' id='email' placeholder='Email'></input>
                </label>

                <button type='submit'>Se Inscrever</button>

              </form>
            </div>

          </div>

        </section>

      </div>

    </>
  )
}

export default Home
