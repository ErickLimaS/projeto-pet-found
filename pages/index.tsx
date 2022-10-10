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

        <div className={homeStyles.hero}>

          <div className={homeStyles.text}>
            <h1>VOCÊ VIU O MEU DONO ?</h1>

            <p>
              Nossa <span>ONG</span> ajuda com o reencontro de <span>ANIMAIS</span> com seus <span>DONOS</span>
            </p>
          </div>

          <div className={homeStyles.img}>

            {/* <img src='/imgs/home/dog.png' alt='Cachorro' height={565} width={565}></img> */}

          </div>

        </div>

      </div>

      <div className={homeStyles.sections}>

        <section className={homeStyles.about_us_section} id='about'>

          <h2>Sobre nós</h2>

          <div className={homeStyles.content}>

            <div className={homeStyles.owner_and_pet_img}>

              <Image src='/imgs/home/cat-owner.jpg' alt='Reecontro da Thais e sua gata Mia' height={3400} width={5100} layout='intrinsic' />

              <p>Reecontro da Thais e sua gata Mia</p>

            </div>

            <div className={homeStyles.text}>

              <h3>Juntando quem está perdido a achar quem procura</h3>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare blandit sapien et ultricies. Quisque ut nisl nec dui congue luctus. Pellentesque pellentesque blandit mauris quis iaculis. Sed id leo mattis, dictum dolor rhoncus, tincidunt lacus.
              </p>

            </div>

          </div>

        </section>

        <section className={homeStyles.our_mission_section} id='our-mission'>

          <h2>Nossa Missão</h2>

          <div className={homeStyles.grid}>

            <div className={homeStyles.grid_item}>

              <div className={homeStyles.img_container}>

                <SVG.Binoculars />

              </div>

              <div className={homeStyles.info}>

                <h3>Visão</h3>

                <p>
                  Aenean id ultricies est. Donec vestibulum, augue malesuada fermentum pharetra, tortor sapien tincidunt risus, semper luctus justo leo sed nunc. Etiam eu ultrices est. In posuere risus ut tortor laoreet, et consectetur eros convallis.
                </p>

              </div>

            </div>

            <div className={homeStyles.grid_item}>

              <div className={homeStyles.img_container}>

                <SVG.Rocket2 />

              </div>

              <div className={homeStyles.info}>

                <h3>Missão</h3>

                <p>Lorem lorem loremloremLorem lorem loremloremLorem lorem loremlorem Lorem lorem loremloremLorem lorem loremlorem Lorem lorem loremloremLorem lorem loremloremLorem lorem loremloremLorem lorem loremlorem</p>

              </div>

            </div>

            <div className={homeStyles.grid_item}>

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

          <ul className={homeStyles.grid}>

            <li className={homeStyles.grid_item}>

              <img></img>

              <h3>Nome</h3>

              <p>
                Vivamus quis nisl ac sapien luctus tincidunt. Sed placerat imperdiet purus eu mattis. Aenean iaculis odio sed mi congue iaculis.
              </p>

            </li>

            <li className={homeStyles.grid_item}>

              <img></img>

              <h3>Nome</h3>

              <p>
                Vivamus quis nisl ac sapien luctus tincidunt. Sed placerat imperdiet purus eu mattis. Aenean iaculis odio sed mi congue iaculis.
              </p>

            </li>

            <li className={homeStyles.grid_item}>

              <img></img>

              <h3>Nome</h3>

              <p>
                Vivamus quis nisl ac sapien luctus tincidunt. Sed placerat imperdiet purus eu mattis. Aenean iaculis odio sed mi congue iaculis.
              </p>

            </li>

            <li className={homeStyles.grid_item}>

              <img></img>

              <h3>Nome</h3>

              <p>
                Vivamus quis nisl ac sapien luctus tincidunt. Sed placerat imperdiet purus eu mattis. Aenean iaculis odio sed mi congue iaculis.
              </p>

            </li>

          </ul>

        </section>

        <section className={homeStyles.newsletter_section} id='newsletter'>

          <div className={homeStyles.text}>

            <h2>Registre-se Em Nossa Newsletter</h2>

            <p>
              Fique informado com todas as novidades que nossa ONG anda fazendo para melhorar a vida de nossos animais
            </p>

          </div>

          <div className={homeStyles.form_container}>

            <form onSubmit={(e) => console.log(e)}>

              <label htmlFor='name'>
                <input type='text' id='name' placeholder='Seu nome'></input>
              </label>

              <label htmlFor='email'>
                <input type='email' id='email' placeholder='Email'></input>
              </label>

              <button type='submit'>Inscrever-se</button>

            </form>

          </div>
        </section>

      </div>

    </>
  )
}

export default Home
