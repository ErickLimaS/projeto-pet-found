import React, { FormEvent, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Meta from '../../components/Meta'
import IbgeApi from '../api/enderecosApi'
import FoundStyles from '../../styles/FoundPage.module.css'
import * as SVG from '../../public/imgs/svg'
import Link from 'next/link'
import Image from 'next/image'
import ResultItem from '../../components/found/ResultItem'
import { getAllPetsByQuery } from '../api/petRoutes'

const Found: NextPage = () => {

  const [states, setStates] = useState<any>([])
  const [county, setCounty] = useState<any>([])

  const [adressQueried, setAdressQueried] = useState<string>('')

  const [petsRegisteredData, setPetsRegisteredData] = useState<any>(null)

  // gets all states 
  const getBrazilianStates = async () => {

    const data = await IbgeApi.getBrazilianStates()

    setStates(data)

  }

  // get all conties related to selected state
  const getStateCounties = async (choseState: string) => {

    const data = await IbgeApi.getBrazilianMunicipies(choseState)

    setCounty(data)

  }

  // get all pets data registered on DB
  const getAllPetsData = async () => {

    const petsData = await getAllPetsByQuery()
    setPetsRegisteredData(petsData)

  }

  const submitForm = async (e: FormEvent) => {

    e.preventDefault()

    const pets = document.querySelectorAll('input[type=checkbox]:checked') as NodeList
    const state = (document.getElementById('state') as HTMLSelectElement).value.slice(1, 3)
    const county = (document.getElementById('county') as HTMLSelectElement).value ?
      (document.getElementById('county') as HTMLSelectElement).value : ''

    let chosePetsValues: any[] = []

    pets.forEach((item: any) => {
      chosePetsValues = [...chosePetsValues, item.value]
    })

    // fetch data related to the form filled
    const petsData = await getAllPetsByQuery({ type: chosePetsValues, state, county })

    setPetsRegisteredData(petsData)

    setAdressQueried(`${county} - ${state}`)

  }

  useEffect(() => {

    // get all states
    getBrazilianStates()

    // get all state's conties
    getStateCounties('AC')

    // get pets registered on DB
    getAllPetsData()

  }, [])

  return (
    <>
      <Meta title='Achei Um Pet' />

      <div className={FoundStyles.container}>

        <section className={FoundStyles.first_content}>

          <div className={FoundStyles.form_container}>

            <form onSubmit={(e: FormEvent) => submitForm(e)}>

              <div className={FoundStyles.pet_checkbox}>
                <div>
                  <input type='checkbox' id='cachorro' name='pet1' value='DOG'></input>

                  <label htmlFor='cachorro'>
                    <Image
                      src='/imgs/svg/dog2.svg'
                      alt='Cachorro Cartoonizado'
                      layout='intrinsic'
                      width={40}
                      height={40}>
                    </Image>
                    <p>Cachorro</p>
                  </label>
                </div>

                <div>
                  <input type='checkbox' id='cat' name='pet2' value='CAT'></input>

                  <label htmlFor='cat'>
                    <Image
                      src='/imgs/svg/cat2.svg'
                      alt='Gato Cartoonizado'
                      layout='intrinsic'
                      width={40}
                      height={40}>
                    </Image>
                    <p>Gato</p>
                  </label>
                </div>

                <div>
                  <input type='checkbox' id='other' name='pet3' value='OTHER'></input>

                  <label htmlFor='other'>
                    <Image
                      src='/imgs/svg/dog2.svg'
                      alt='Outro Animal'
                      layout='intrinsic'
                      width={40}
                      height={40}>
                    </Image>
                    <p>Outro</p>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor='state'>

                  <input type='text'
                    id='state' name='state'
                    list='states'
                    required
                    onChange={(e: any) => getStateCounties(e.target.value.slice(1, 3))}
                    placeholder="Estado"
                  />

                  <datalist id='states'>

                    {states.map((item: any) => (
                      <option value={`(${item.sigla}) ${item.nome}`} key={item.id}></option>
                    ))}

                  </datalist>
                </label>

                <label htmlFor='county'>

                  <input type="text"
                    name='county' id='county'
                    list="countys"
                    placeholder='Município'
                    required
                  />

                  <datalist id='countys'>

                    {county.map((item: any) => (
                      <option value={item.sigla} key={item.id}>{item.nome}</option>
                    ))}

                  </datalist>

                </label>
              </div>

              <div>
                <button type='submit' aria-labelledby='Procurar'><SVG.Search /></button>
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

            <h2>Resultados {adressQueried ? `em ${adressQueried}` : 'no Brasil'}</h2>

            {petsRegisteredData != null ? (
              <>
                <div className={FoundStyles.list}>

                  {
                    petsRegisteredData.map((petInfo: any, key: any) => (

                      <ResultItem key={key} data={petInfo} />

                    ))
                  }
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
              </>
            ) : (

              <h3>loading</h3>

            )}

          </div>
        </section>

      </div >
    </>
  )

}

export default Found