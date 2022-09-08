import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'
import Step3FormStyles from '../../../styles/Step3Form.module.css'
import API from '../../api/localidadesEndereco'
import * as SVG from '../../../public/imgs/svg'

function Step3() {

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const [states, setStates] = useState([])
  const [municipies, setMunicipies] = useState([])
  const [choseMunicipie, setChoseMunicipie] = useState<string>()
  const [lostOnSameLocation, setLostOnSameLocation] = useState<boolean>(false)
  const [reward, setReward] = useState<boolean>(false)

  const router = useRouter()

  const dispatch: any = useDispatch()

  // gets all brazilian states 
  const getBrazilianStates = async () => {

    const data = await API.getBrazilianStates()

    setStates(data)

  }
  const getStateMunicipies = async (choseState: string) => {

    const data = await API.getBrazilianMunicipies(choseState)

    setMunicipies(data)

  }

  useEffect(() => {

    // if the first step is not completed, return to that page
    if ((animal == null || undefined) || (currentStep !== 3)) {

      // router.push('/criar-anuncio/step1')

    }

    getBrazilianStates()


  }, [])

  return (
    <CriarAnuncio>


      <div className={Step3FormStyles.dog_form}>
        <form className={Step3FormStyles.step3_form}>

          <h2>Informações do Dono</h2>
          
          <div className={Step3FormStyles.pet_photo}>
            <label htmlFor='owner_photo'>
              <span className={Step3FormStyles.img_placeholder}></span>
              <input type='file' id='owner_photo' name='foto_do_dono'></input>
            </label>
          </div>

          <div>
            <label htmlFor='name'>
              Seu Nome
              <input type='text' id='name' name='nome' placeholder='' required
                onBlur={(e) => console.log('test')}
              ></input>
            </label>
          </div>

          <div>
            <label htmlFor='date_birth'>
              Data de Nascimento
              <input type='date' id='date_birth' name='data_nascimento' required
                onBlur={(e) => console.log('test')}
              ></input>
            </label>
          </div>

          <div>
            <label htmlFor='email'>
              Email
              <input type='email' id='email' name='email' required
                onBlur={(e) => console.log(e.target.value)}
              ></input>
            </label>
          </div>

          <div className={Step3FormStyles.number_contact}>
            <div>
              <label htmlFor='ddd-number'>
                DDD
                <input type='text' id='ddd-number' name='ddd-numero_contato' placeholder='11' required
                  onBlur={(e) => console.log('test')}
                ></input>

              </label>
            </div>
            <div>
              <label htmlFor='number'>
                Número Para Contato
                <input type='text' id='number' name='numero_contato' placeholder='912341234' required
                  onBlur={(e) => console.log('test')}
                ></input>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor='password'>
              Senha
              <small>Necessária para Criar Conta na Pet Found</small>
              <input type='password' autoComplete='on' id='password' name='password' required
                onBlur={(e) => console.log('test')}
              ></input>
            </label>
          </div>

          <h2>Onde Mora</h2>

          <section>
            <div>
              <label htmlFor='estado'>
                Estado de Residência

                <select id='estado' name='estado' required
                  onChange={(e) => getStateMunicipies(e.target.value)}
                >

                  {states.map((item: any) => (

                    <option value={item.sigla} key={item.id}>{item.nome}</option>

                  ))}

                </select>

              </label>
            </div>

            {municipies.length > 0 && (
              <div>
                <label htmlFor='municipio'>
                  Município

                  <select id='municipio' name='municipio' required
                    onChange={(e) => setChoseMunicipie(e.target.value)}
                  >

                    {municipies.map((item: any) => (

                      <option value={item.nome} key={item.id}>{item.nome}</option>

                    ))}

                  </select>

                </label>
              </div>
            )}
          </section>

          <h2>Onde Perdi Meu Pet ?</h2>

          <div className={Step3FormStyles.checkbox_lost_pet}>
            <label htmlFor='pet_lost_on_location'>
              Meu Pet se perdeu na mesma localização que moro

              <input type='checkbox' id='pet_lost_on_location' name='pet_lost_on_same_location_owner_lives' value='true'
                onChange={(e) => {
                  e.target.checked ?
                    setLostOnSameLocation(true) : setLostOnSameLocation(false)
                }}
              >
              </input>

            </label>
          </div>

          {lostOnSameLocation === false && (

            <section>

              <div>
                <label htmlFor='estado-lost-pet'>
                  Estado onde Aconteceu

                  <select id='estado-lost-pet' name='estado_onde_perdi_meu_pet'
                    onChange={(e) => getStateMunicipies(e.target.value)}
                  >

                    {states.map((item: any) => (

                      <option value={item.sigla} key={item.id}>{item.nome}</option>

                    ))}

                  </select>

                </label>
              </div>

              {municipies.length > 0 && (
                <>
                  <div>
                    <label htmlFor='municipio-lost-pet'>
                      Município

                      <select id='municipio-lost-pet' name='municipio_onde_perdi_meu_pet' required
                        onChange={(e) => setChoseMunicipie(e.target.value)}
                      >

                        {municipies.map((item: any) => (

                          <option value={item.nome} key={item.id}>{item.nome}</option>

                        ))}

                      </select>

                    </label>
                  </div>

                  <div>
                    <label htmlFor='rua-lost-pet'>
                      Rua onde aconteceu

                      <input type='text' id='rua-lost-pet' name='rua_onde_perdi_meu_pet' required
                        onChange={(e) => setChoseMunicipie(e.target.value)}
                      >
                      </input>

                    </label>
                  </div>
                </>
              )}
            </section>

          )}

          <h2>Oferecer Recompensa ?</h2>

          <section>
            <div className={Step3FormStyles.reward_flex_row}>

              <SVG.SackMoney />
              <label htmlFor='recompensa_sim'>
                Sim
                <input type='radio' id='recompensa_sim' name='oferecer_recompensa' value='true'
                  onChange={(e) => setReward(true)}
                ></input>
              </label>

              <label htmlFor='recompensa_nao'>
                Não
                <input type='radio' id='recompensa_nao' name='oferecer_recompensa' value='false'
                  onChange={(e) => setReward(false)}
                ></input>
              </label>
              <SVG.NoMoney />
            </div>
          </section>

          {reward && (
            <div>
              <label htmlFor='valor_recompensa'>
                Oferecer como Recompensa...

                <small>Insira o valor que deseja oferecer abaixo</small>

                <input type='number' id='valor-recompensa' name='valor_recompensa' required
                  onChange={(e) => setChoseMunicipie(e.target.value)}
                >
                </input>

              </label>
            </div>
          )}

          <div className={Step3FormStyles.more_info}>
            <label htmlFor='mais_informacoes2'>
              Algo mais que queira dizer nesse post?
              <textarea cols={40} rows={5} id='mais_informacoes2' name='mais_informacoes_dono' placeholder='Ex: "Não posso atender chamadas no final de semana." ou "Se acharem, me liguem a qualquer momento!"' onBlur={(e) => console.log(e.target.value)}
              >
              </textarea>
            </label>
          </div>

        </form>
      </div >
    </CriarAnuncio >
  )
}

export default Step3