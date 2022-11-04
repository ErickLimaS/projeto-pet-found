import { useRouter } from 'next/router'
import React, { FormEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'
import Step3FormStyles from '../../../styles/FoundPage/steps/Step3Form.module.css'
import ButtonsStyles from '../../../styles/FoundPage/Index.module.css'
import API from '../../api/enderecosApi'
import * as SVG from '../../../public/imgs/svg'
import { changeCreateLostPetPostSteps, setOwnerAndPetInfoTogether } from '../../../redux/actions/lostPetPostStepsActions'
import Link from 'next/link'
import { createPetPost } from '../../api/petRoutes'

function Step3() {

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)

  // pet info (name, pet, genre)
  const petInfo: any = useSelector((state: RootState) => state.setPetInfo)
  const petCaracteristicas: any = useSelector((state: RootState) => state.setCaracteristicasPet)

  // user data (name, token)
  const user: any = useSelector((state: RootState) => state.currentUser)

  // has all pet's data after this form has been submited 
  const petInfoAssembled: any = useSelector((state: RootState) => state.setOwnerAndPetInfoTogether)

  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const [states, setStates] = useState([])
  const [counties, setCounties] = useState([])
  const [lostOnSameLocation, setLostOnSameLocation] = useState<boolean>(false)
  const [reward, setReward] = useState<boolean>(false)

  const ownerName = React.useRef<HTMLInputElement>(null)
  const ownerEmail = React.useRef<HTMLInputElement>(null)
  const ownerPassword = React.useRef<HTMLInputElement>(null)
  const ownerConfirmPassword = React.useRef<HTMLInputElement>(null)
  const ownerContactDdd = React.useRef<HTMLInputElement>(null)
  const ownerContactFull = React.useRef<HTMLInputElement>(null)
  const ownerState = React.useRef<HTMLSelectElement>(null)
  const ownerCounty = React.useRef<HTMLSelectElement>(null)
  const ownerStreet = React.useRef<HTMLSelectElement>(null)
  const ownerPostMoreDetails = React.useRef<HTMLTextAreaElement>(null)

  const ownerRewardWhenPetFound = React.useRef<HTMLInputElement>(null)

  const petLostLocationState = React.useRef<HTMLSelectElement>(null)
  const petLostLocationCounty = React.useRef<HTMLSelectElement>(null)
  const petLostLocationStreet = React.useRef<HTMLInputElement>(null)

  const router = useRouter()

  const dispatch: any = useDispatch()

  // gets all brazilian states 
  const getBrazilianStates = async () => {

    const data = await API.getBrazilianStates()

    setStates(data)

  }
  const getCounties = async (choseState: string) => {

    const data = await API.getBrazilianMunicipies(choseState)

    setCounties(data)

  }

  const returnStep = () => {

    router.push(`/criar-anuncio/pet/step2`)

  }

  const submitForm = async (e: FormEvent, isLogged?: boolean) => {

    e.preventDefault()

    // if user is already logged in
    if (isLogged === true) {

      dispatch(setOwnerAndPetInfoTogether(
        {
          type: petInfo.info.type,
          typeTranslated: 'Cachorro',
          name: petInfo.info.name,
          genre: petInfo.info.genre,
          // age: 20,
          breed: petInfo.info.breed,
          // photoUrl: [
          //   req.body.name //fix it
          // ],
          particulars: petCaracteristicas.particulars || null,
          lastSeen: {
            whereOwnerLives: lostOnSameLocation,
            state: petLostLocationState.current?.value,
            county: petLostLocationCounty.current?.value,
            street: petLostLocationStreet.current?.value || null
          },
          hasReward: reward,
          rewardAmount: reward ? ownerRewardWhenPetFound.current?.value : null,
          moreInfo: petInfo.info.moreInfo || null,
          postDetails: ownerPostMoreDetails.current?.value || null
        }
      ))

      if (petInfoAssembled.success === true) {

        // waiting for server reponse about the saving pet post
        const responseFromServer: any = await createPetPost(petInfoAssembled.info)

        if (responseFromServer.status === 201) {

          dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1, 'next'))
          router.push(`/criar-anuncio/post-done`)

        }

      }

    }
    else {

      dispatch(setOwnerAndPetInfoTogether(
        {
          type: petInfo.info.type,
          typeTranslated: 'Cachorro',
          name: petInfo.info.name,
          genre: petInfo.info.genre,
          // age: 20,
          breed: petInfo.info.breed,
          // photoUrl: [
          //   req.body.name //fix it
          // ],
          particulars: petCaracteristicas.particulars || null,
          lastSeen: {
            whereOwnerLives: lostOnSameLocation,
            state: petLostLocationState.current?.value,
            county: petLostLocationCounty.current?.value,
            street: petLostLocationStreet.current?.value || null
          },
          hasReward: reward,
          rewardAmount: reward ? ownerRewardWhenPetFound.current?.value : null,
          moreInfo: petInfo.info.moreInfo,
          postDetails: ownerPostMoreDetails.current?.value || null
        }
      ))

      if (ownerPassword.current!.value !== ownerConfirmPassword.current!.value) {
        alert('Senhas diferentes. Tente novamente.') // fix
        return console.log('diffent')
      }

      if (petInfoAssembled.success === true) {

        // new user account 
        const createUserToSubmit = {
          email: ownerEmail.current!.value,
          password: ownerPassword.current!.value,
          name: ownerName.current!.value,
          address: {
            state: ownerState.current!.value,
            county: ownerCounty.current!.value,
            street: null // null is for the optional inputs
          },
          contacts: {
            tel1: {
              ddd: ownerContactDdd.current!.value || null,
              tel: ownerContactFull.current!.value || null
            },
            tel2: {
              ddd: null,
              tel: null
            },
            facebook: null,
            instagram: null

          }
        }

        // waiting for server response about saving the user account and pet post
        const responseFromServer: any = await createPetPost(petInfoAssembled.info, createUserToSubmit)

        if (responseFromServer.status === 201) {

          dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1, 'next'))
          router.push(`/criar-anuncio/pet/complete`)

        }

      }
    }

  }

  useEffect(() => {

    // if the first step is not completed, return to that page
    if ((animal == null || undefined) || (currentStep !== 3)) {

      dispatch(changeCreateLostPetPostSteps(currentStep, 1, 'previous'))
      router.push('/criar-anuncio/step1')

    }

    getBrazilianStates()

  }, [])

  return (
    <CriarAnuncio>

      <div className={Step3FormStyles.form_container} data-pet={`${animal}`}>

        {/* if USER IS logged in, shows form to choose witch contacts to be displayed on post */}
        {/* if USER IS NOT logged in, shows form to create a account*/}
        {user.name ? (
          <form className={Step3FormStyles.step3_form} onSubmit={(e) => submitForm(e, true)}>

            <p>Onde Perdi Meu Pet ?</p>

            <div className={Step3FormStyles.checkbox_lost_pet}>
              <label htmlFor='pet_lost_on_location'>
                Meu Pet se perdeu na mesma localização que moro

                <input type='checkbox'
                  id='pet_lost_on_location' name='pet_lost_on_same_location_owner_lives' value='true'
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
                      onChange={(e) => getCounties(e.target.value)}
                    >

                      {states.map((item: any) => (

                        <option value={item.sigla} key={item.id}>{item.nome}</option>

                      ))}

                    </select>

                  </label>
                </div>

                {counties.length > 0 && (
                  <>
                    <div>
                      <label htmlFor='municipio-lost-pet'>
                        Município

                        <select
                          ref={petLostLocationCounty} id='municipio-lost-pet' name='municipio_onde_perdi_meu_pet' required
                        >

                          {counties.map((item: any) => (

                            <option value={item.nome} key={item.id}>{item.nome}</option>

                          ))}

                        </select>

                      </label>
                    </div>

                    <div>
                      <label htmlFor='rua-lost-pet'>
                        Rua onde aconteceu

                        <input type='text'
                          ref={petLostLocationStreet} id='rua-lost-pet' name='rua_onde_perdi_meu_pet'
                          required
                        >
                        </input>

                      </label>
                    </div>
                  </>
                )}
              </section>

            )}

            <p>Oferecer Recompensa ?</p>

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
              <div className={Step3FormStyles.set_reward}>
                <label htmlFor='valor_recompensa'>
                  Oferecer como Recompensa...

                  <small>Insira o valor em Reais(R$) que deseja oferecer abaixo</small>

                  <input type='text'
                    ref={ownerRewardWhenPetFound} id='valor-recompensa' name='valor_recompensa'
                    required
                  >
                  </input>

                </label>
              </div>
            )}

            <div className={Step3FormStyles.more_info}>
              <label htmlFor='mais_informacoes2'>
                Algo mais que queira dizer nesse post?
                <textarea
                  ref={ownerPostMoreDetails} rows={5} id='mais_informacoes2' name='mais_informacoes_dono'
                  cols={40}
                  placeholder='Ex: "Não posso atender chamadas no final de semana." ou "Se acharem, me liguem a qualquer momento!"'
                >
                </textarea>
              </label>
            </div>

            <div className={ButtonsStyles.next_page} data-qty-buttons='2'>

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
        ) : (
          <form className={Step3FormStyles.step3_form} onSubmit={(e) => submitForm(e, false)}>

            <p>Agora, crie sua conta!</p>

            <Link href={`/user/login?redirect=${router.pathname.slice(1)}`}>
              Ou logue nela clicando aqui!
            </Link>

            <div className={Step3FormStyles.pet_photo}>
              <label htmlFor='owner_photo'>
                <span className={Step3FormStyles.img_placeholder}></span>
                <input type='file' id='owner_photo' name='foto_do_dono'></input>
              </label>
            </div>

            <div>
              <label htmlFor='name'>
                Seu Nome
                <input type='text'
                  ref={ownerName} id='name' name='nome'
                  required
                  placeholder=''
                  onBlur={(e) => console.log('test' + ownerName.current?.value)}
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

            <div>
              <label htmlFor='password'>
                Senha

                <small>Necessária para Criar Conta na Pet Found</small>

                <input type='password'
                  ref={ownerPassword} id='password' name='password'
                  pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                  title='Precisa conter letras maiúsculas, números (0-9) e caracteres especiais (@, !, $, etc.).'
                  required
                ></input>
              </label>
            </div>

            <div>
              <label htmlFor='confirm-password'>
                Confirme a senha que você criou acima

                <small>Necessária para Criar Conta na Pet Found</small>

                <input type='password'
                  ref={ownerConfirmPassword} id='confirm-password' name='confirm-password'
                  pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                  title='Precisa conter letras maiúsculas, números (0-9) e caracteres especiais (@, !, $, etc.).'
                  required
                ></input>
              </label>
            </div>

            <div className={Step3FormStyles.number_contact}>
              <div>
                <label htmlFor='ddd-number'>
                  DDD
                  <input type='text'
                    ref={ownerContactDdd} id='ddd-number' name='ddd-numero_contato'
                    pattern='^\d.{1}$'
                    title='DDD do número sem o zero.'
                    placeholder='11' required
                  ></input>

                </label>
              </div>
              <div>
                <label htmlFor='number'>
                  Número Para Contato
                  <input type='text'
                    ref={ownerContactFull} id='number' name='numero_contato'
                    pattern='^\d.{7,8}$'
                    title='Apenas números, sem o DDD.'
                    placeholder='912341234' required
                  ></input>
                </label>
              </div>
            </div>

            <p>Onde Mora</p>

            <section>
              <div>
                <label htmlFor='estado'>
                  Estado de Residência

                  <select id='estado' ref={ownerState} name='estado' required
                    onChange={(e) => getCounties(e.target.value)}
                  >

                    {states.map((item: any) => (

                      <option value={item.sigla} key={item.id}>{item.nome}</option>

                    ))}

                  </select>

                </label>
              </div>

              {counties.length > 0 && (
                <div>
                  <label htmlFor='municipio'>
                    Município

                    <select ref={ownerCounty} id='municipio' name='municipio' required

                    >

                      {counties.map((item: any) => (

                        <option value={item.nome} key={item.id}>{item.nome}</option>

                      ))}

                    </select>

                  </label>
                </div>
              )}
            </section>

            <p>Onde Perdi Meu Pet ?</p>

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
                      onChange={(e) => getCounties(e.target.value)}
                    >

                      {states.map((item: any) => (

                        <option value={item.sigla} key={item.id}>{item.nome}</option>

                      ))}

                    </select>

                  </label>
                </div>

                {counties.length > 0 && (
                  <>
                    <div>
                      <label htmlFor='municipio-lost-pet'>
                        Município

                        <select ref={petLostLocationCounty} id='municipio-lost-pet' name='municipio_onde_perdi_meu_pet' required

                        >

                          {counties.map((item: any) => (

                            <option value={item.nome} key={item.id}>{item.nome}</option>

                          ))}

                        </select>

                      </label>
                    </div>

                    <div>
                      <label htmlFor='rua-lost-pet'>
                        Rua onde aconteceu

                        <input type='text' ref={petLostLocationStreet} id='rua-lost-pet' name='rua_onde_perdi_meu_pet' required

                        >
                        </input>

                      </label>
                    </div>
                  </>
                )}
              </section>

            )}

            <p>Oferecer Recompensa ?</p>

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
              <div className={Step3FormStyles.set_reward}>
                <label htmlFor='valor_recompensa'>
                  Oferecer como Recompensa...

                  <small>Insira o valor que deseja oferecer abaixo</small>

                  <input type='number' ref={ownerRewardWhenPetFound} id='valor-recompensa' name='valor_recompensa' required

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

            <div className={ButtonsStyles.next_page} data-qty-buttons='2'>

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
        )}

      </div >
    </CriarAnuncio >
  )
}

export default Step3
