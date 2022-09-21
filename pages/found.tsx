import React, { FormEvent, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Meta from '../components/Meta'
import IbgeApi from './api/localidadesEndereco'
import FoundStyles from '../styles/Found.module.css'
import { useRouter } from 'next/router'
import * as SVG from '../public/imgs/svg'
import { data } from './api/templateData'
import Link from 'next/link'
import Image from 'next/image'

const Found: NextPage = () => {

  const [states, setStates] = useState([])
  const [county, setCounty] = useState([])

  // gets all brazilian states 
  const getBrazilianStates = async () => {

    const data = await IbgeApi.getBrazilianStates()

    setStates(data)

  }
  const getStateMunicipies = async (choseState: string) => {

    const data = await IbgeApi.getBrazilianMunicipies(choseState)

    setCounty(data)

  }

  const router = useRouter()

  const submitForm = (e: FormEvent) => {

    e.preventDefault()

    const pet = document.getElementById('pet') as HTMLSelectElement
    const state = document.getElementById('state') as HTMLSelectElement
    const county = document.getElementById('county') as HTMLSelectElement

    // submit query to server through URL and gets data from chose location
    // router.push(`/found?pet=${pet.value}&state=${state.value}&county=${county.value}`)

    console.log(pet.value, state.value, county.value)

  }

  useEffect(() => {

    getBrazilianStates()
    getStateMunicipies('AC')

  }, [])

  return (
    <>
      <Meta title='Achei Um Pet' />

      <div className={FoundStyles.container}>

        <div className={FoundStyles.heading}>
          <h1>Achei Um Pet!</h1>

          {/* <p>
            Aqui você encontrara o dono do pet que você encontrou.
          </p> */}

          <p>
            Certamente fizeram um anúncio do pet perdido aqui. Então, procure pelo anúncio do Pet aqui e entre em contato com o dono. Quem sabe não tem uma recompensa...
          </p>
        </div>

        <div className={FoundStyles.form_div}>

          <form onSubmit={(e: FormEvent) => submitForm(e)}>

            <div>
              <label htmlFor='pet'>Pet</label>

              <select id='pet' name='pet'>

                <option value='DOG'>Cachorro</option>
                <option value='CAT'>Gato</option>
                <option value='OTHER'>example</option>

              </select>

            </div>

            <div>
              <label htmlFor='state'>Estado</label>

              <select id='state' name='estado'
                onChange={(e: any) => getStateMunicipies(e.target.value)}
              >

                {states.map((item: any) => (
                  <option value={item.sigla} key={item.id}>{item.nome}</option>
                ))}
              </select>

            </div>

            <div>
              <label htmlFor='county'>Município</label>

              <select id='county' name='Municipio'>
                {county.map((item: any) => (
                  <option value={item.sigla} key={item.id}>{item.nome}</option>
                ))}
              </select>

            </div>

            <div>
              <button type='submit' name='procurar'><SVG.Search /></button>
            </div>

          </form>

        </div>

        <h2>Resultados mais recentes para <span>todo Brasil</span></h2>

        <section className={FoundStyles.results_section_grid}>

          <div className={FoundStyles.explaining_current_section}>

            <div>

              <h2>Como Usar?</h2>

              <p>

                Procure o anúncio do Pet perdido no nosso banco de dados, usando o filtro de estado e município no topo da página.

              </p>

              <h2>Não achei o anúncio, e agora?</h2>

              <p>

                Se não achar, crie um você mesmo! Assim, caso o dono procure pelo próprio Pet perdido, ele consiga facilmente entrar em contato com você.

              </p>

              <Link href='/found-a-pet'>Criar Anúncio para Pet perdido que achei!</Link>

            </div>

          </div>

          <div className={FoundStyles.grid_results}>

            <ul>

              {data?.map((item: any) => (

                <li key={item.id} className={FoundStyles.grid_item}>
                  <a href={`/pet?id=${item.id}`}>
                    <>
                      <Image src='/imgs/home/missing-dog-1.jpg' alt='Cartaz de Cachorro Perdido' height={240} width={240} layout='intrinsic' />

                      <h1>{item.name} <span>({item.race})</span></h1>

                      {/* <p>{item.race}</p> */}

                      <h2>Perdido em</h2>

                      <p>
                        {item.lastSeen[0].street}, {item.lastSeen[0].municipie} - {item.lastSeen[0].state}
                      </p>

                      <div className={FoundStyles.reward}>

                        <h2>
                          {item.rewardWhenFound ? `R$ ${item.rewardAmountOffered}` : 'Sem Recompensa'}
                        </h2>

                      </div>

                      <p>Click para ver mais</p>

                    </>
                  </a>

                </li>

              ))}

            </ul>

          </div>

        </section>

      </div>
    </>
  )

}

export default Found