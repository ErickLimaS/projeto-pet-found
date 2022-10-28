import { useRouter } from 'next/router'
import React, { FormEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'
import Step3FormStyles from '../../../styles/Step3Form.module.css'
import ButtonsStyles from '../../../styles/Index_perdi_meu_pet.module.css'
import API from '../../api/enderecosApi'
import * as SVG from '../../../public/imgs/svg'
import { changeCreateLostPetPostSteps, setOwnerAndPetInfoTogether } from '../../../redux/actions/lostPetPostStepsActions'

function Step3() {

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
  const petInfo = useSelector((state: RootState) => state.setPetInfo)

  const { info }: any = petInfo
  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const [states, setStates] = useState([])
  const [municipies, setMunicipies] = useState([])
  const [choseMunicipie, setChoseMunicipie] = useState<string>()
  const [lostOnSameLocation, setLostOnSameLocation] = useState<boolean>(false)
  const [reward, setReward] = useState<boolean>(false)

  const ownerName = React.useRef<HTMLInputElement>(null)
  const ownerEmail = React.useRef<HTMLInputElement>(null)
  const ownerPassword = React.useRef<HTMLInputElement>(null)
  const ownerContactDdd = React.useRef<HTMLInputElement>(null)
  const ownerContactFull = React.useRef<HTMLInputElement>(null)
  const ownerState = React.useRef<HTMLSelectElement>(null)
  const ownerMunicipie = React.useRef<HTMLSelectElement>(null)
  const ownerBirthDate = React.useRef<HTMLInputElement>(null)
  const ownerPostMoreDetails = React.useRef<HTMLTextAreaElement>(null)

  const ownerRewardWhenPetFound = React.useRef<HTMLInputElement>(null)

  const petLostLocationState = React.useRef<HTMLSelectElement>(null)
  const petLostLocationMunicipie = React.useRef<HTMLSelectElement>(null)
  const petLostLocationStreet = React.useRef<HTMLInputElement>(null)

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

  const returnStep = () => {

    router.push(`/criar-anuncio/${animal.toLowerCase()}/step2`)

  }

  const submitForm = (e: FormEvent) => {

    e.preventDefault()

    if (ownerName.current?.value) {

      dispatch(setOwnerAndPetInfoTogether(
        {
          id: 123,
          name: ownerName.current?.value,
          email: ownerEmail.current?.value,
          password: ownerPassword.current?.value,
          birthDate: ownerBirthDate.current?.value,
          contact_ddd: ownerContactDdd.current?.value,
          contact_full: ownerContactFull.current?.value,
          more_info: ownerPostMoreDetails.current?.value,
          location: {
            state: ownerState.current?.value,
            municipie: ownerMunicipie.current?.value,
          },
          pet: [
            {
              ownerId: 123,
              id: 999,
              stillLost: true,
              lastSeen: [
                {
                  seenByOwner: true,
                  state: lostOnSameLocation ? ownerState.current?.value : petLostLocationState.current?.value,
                  municipie: lostOnSameLocation ? ownerMunicipie.current?.value : petLostLocationMunicipie.current?.value,
                  street: petLostLocationStreet.current?.value
                }
              ],
              rewardWhenFound: reward,
              rewardAmountOffered: ownerRewardWhenPetFound.current?.value ? ownerRewardWhenPetFound.current?.value : null,
              info
            }
          ]
        }
      ))

      dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1))

      router.push(`/criar-anuncio/post-done`)

    }


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


      <div className={Step3FormStyles.cat_form}>
        <form className={Step3FormStyles.step3_form} onSubmit={(e) => submitForm(e)}>

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
              <input type='text' ref={ownerName} id='name' name='nome' placeholder='' required
                onBlur={(e) => console.log('test')}
              ></input>
            </label>
          </div>

          <div>
            <label htmlFor='date_birth'>
              Data de Nascimento
              <input type='date' ref={ownerBirthDate} id='date_birth' name='data_nascimento' required
              ></input>
            </label>
          </div>

          <div>
            <label htmlFor='email'>
              Email
              <input type='email' ref={ownerEmail} id='email' name='email' required
              ></input>
            </label>
          </div>

          <div className={Step3FormStyles.number_contact}>
            <div>
              <label htmlFor='ddd-number'>
                DDD
                <input type='text' ref={ownerContactDdd} id='ddd-number' name='ddd-numero_contato' placeholder='11' required
                ></input>

              </label>
            </div>
            <div>
              <label htmlFor='number'>
                Número Para Contato
                <input type='text' ref={ownerContactFull} id='number' name='numero_contato' placeholder='912341234' required
                ></input>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor='password'>
              Senha
              <small>Necessária para Criar Conta na Pet Found</small>
              <input type='password' ref={ownerPassword} autoComplete='on' id='password' name='password' required
              ></input>
            </label>
          </div>

          <h2>Onde Mora</h2>

          <section>
            <div>
              <label htmlFor='estado'>
                Estado de Residência

                <select id='estado' ref={ownerState} name='estado' required
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

                  <select ref={petLostLocationState} id='estado-lost-pet' name='estado_onde_perdi_meu_pet'
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

                      <select ref={petLostLocationMunicipie} id='municipio-lost-pet' name='municipio_onde_perdi_meu_pet' required
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

                      <input type='text' ref={petLostLocationStreet} id='rua-lost-pet' name='rua_onde_perdi_meu_pet' required
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

                <input type='number' ref={ownerRewardWhenPetFound} id='valor-recompensa' name='valor_recompensa' required
                  onChange={(e) => setChoseMunicipie(e.target.value)}
                >
                </input>

              </label>
            </div>
          )}

          <div className={Step3FormStyles.more_info}>
            <label htmlFor='mais_informacoes2'>
              Algo mais que queira dizer nesse post?
              <textarea ref={ownerPostMoreDetails} cols={40} rows={5} id='mais_informacoes2' name='mais_informacoes_dono' placeholder='Ex: "Não posso atender chamadas no final de semana." ou "Se acharem, me liguem a qualquer momento!"'
              >
              </textarea>
            </label>
          </div>

          <div className={ButtonsStyles.next_page}>

            <button type='button'
              onClick={() => returnStep()}
            >
              <SVG.ChevronLeft /> Voltar
            </button>

            <button type='submit' >
              Finalizar <SVG.ChevronRight />
            </button>

          </div>

        </form>
      </div >
    </CriarAnuncio >
  )
}

export default Step3
