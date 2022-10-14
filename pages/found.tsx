import React, { FormEvent, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Meta from '../components/Meta'
import IbgeApi from './api/localidadesEndereco'
import FoundStyles from '../styles/FoundPage.module.css'
import { useRouter } from 'next/router'
import * as SVG from '../public/imgs/svg'
import { data } from './api/templateData'
import Link from 'next/link'
import Image from 'next/image'
import ResultItem from '../components/found-page/ResultItem'

const Found: NextPage = () => {

  const [states, setStates] = useState([])
  const [county, setCounty] = useState([])

  // gets all states 
  const getBrazilianStates = async () => {

    const data = await IbgeApi.getBrazilianStates()

    setStates(data)

  }
  const getStateCounties = async (choseState: string) => {

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
    getStateCounties('AC')

  }, [])

  return (
    <>
      <Meta title='Achei Um Pet' />

      <div className={FoundStyles.container}>

        <section className={FoundStyles.first_content}>

          <div className={FoundStyles.form_container}>

            <form onSubmit={(e: FormEvent) => submitForm(e)}>

              <div>
                <label htmlFor='pet'>
                  <select id='pet' name='pet'>

                    <option value='DOG'>Teste</option>
                    <option value='CAT'>Teste</option>
                    <option value='OTHER'>Teste</option>

                  </select>

                </label>

              </div>

              <div>
                <label htmlFor='state'>

                  <input id='state' type='text' name='estado' list='states'
                    onChange={(e: any) => getStateCounties(e.target.value)}
                    placeholder="Estado"
                  />

                  <datalist id='states'>

                    {states.map((item: any) => (
                      <option value={item.sigla} key={item.id}>{item.nome}</option>
                    ))}

                  </datalist>
                </label>

                <label htmlFor='county'>

                  <input id='county' type="text" name='Municipio' list="countys" placeholder='Município' />

                  <datalist id='countys'>

                    {county.map((item: any) => (
                      <option value={item.sigla} key={item.id}>{item.nome}</option>
                    ))}

                  </datalist>

                </label>
              </div>

              <div>
                <button type='submit' name='procurar'><SVG.Search /></button>
              </div>

            </form>

          </div>

          <div className={FoundStyles.text_container}>

            <h1>Bla blblal lblasl</h1>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque orci sem, volutpat ut diam posuere, volutpat gravida felis. Nullam justo enim, faucibus et nisi in, finibus laoreet augue.
            </p>

          </div>

        </section>

        <section className={FoundStyles.results_container}>

          <aside className={FoundStyles.search_params}>

            <form onChange={(e: any) => console.log(e.target.name, e.target.value)}>

              <label>
                Nas Últimas 6 horas
                <input type="checkbox" name='last_6_hours' value="true"></input>
                <span className={FoundStyles.checkmark}></span>
              </label>

              <label>
                Nas Últimas 12 horas
                <input type="checkbox" name='last_12_hours' value="true"></input>
                <span className={FoundStyles.checkmark}></span>
              </label>


              <label>
                Nas Últimas 24 horas
                <input type="checkbox" name='last_24_hours' value="true"></input>
                <span className={FoundStyles.checkmark}></span>
              </label>

              <label>
                Não Possui Deficiência
                <input type="checkbox" name='has_no_disability' value="true"></input>
                <span className={FoundStyles.checkmark}></span>
              </label>

              <label>
                Possui Deficiência
                <input type="checkbox" name='has_disability' value="true"></input>
                <span className={FoundStyles.checkmark}></span>
              </label>

            </form>

          </aside>

          <div className={FoundStyles.results}>

            <h2>Resultados em Lugar Pesquisado</h2>

            <div className={FoundStyles.list}>

              <ResultItem />
              <ResultItem />
              <ResultItem />
              <ResultItem />
              <ResultItem />
              <ResultItem />

            </div>

            <nav className={FoundStyles.pagination}>

              <Link href={`/pag=1`}>
                <a>
                  <SVG.ChevronLeft />
                </a>
              </Link>

              <p>Página 1 de 6</p>

              <Link href={`/pag=2`}>
                <a>
                  <SVG.ChevronRight />
                </a>
              </Link>

            </nav>

          </div>
        </section>

      </div>
    </>
  )

}

export default Found