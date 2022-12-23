import { useRouter } from 'next/router'
import React, { FormEvent, InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'
import Step3FormStyles from '../../../styles/FoundPage/steps/Step3Form.module.css'
import ButtonsStyles from '../../../styles/FoundPage/Index.module.css'
import API from '../../api/IBGE_API'
import * as SVG from '../../../public/imgs/svg'
import { changeCreateLostPetPostSteps } from '../../../redux/actions/lostPetPostStepsActions'
import { createPetPost } from '../../api/petRoutes'

function Step3() {

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)

  // pet info (name, pet, genre)
  const petInfo: any = useSelector((state: RootState) => state.setPetInfo)
  const petCaracteristicas: any = useSelector((state: RootState) => state.setCaracteristicasPet)

  // user data (name, token)
  const user: any = useSelector((state: RootState) => state.currentUser)

  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const [states, setStates] = useState([])
  const [counties, setCounties] = useState([])
  const [lostOnSameLocation, setLostOnSameLocation] = useState<boolean>(false)
  const [reward, setReward] = useState<boolean>(false)

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

    const form = e.target as HTMLFormElement

    // saves pet post on Server and awaits response
    const responseFromServer: any = await createPetPost(
      {
        type: petInfo.info.type,
        typeTranslated: (petInfo.info.type == 'DOG' && 'Cachorro' || petInfo.info.type == 'CAT' && 'Gato' || petInfo.info.type == 'OTHER' && 'Outro' as any),
        name: petInfo.info.name,
        genre: petInfo.info.genre,
        age: petInfo.info.age as Number,
        size: petInfo.info.size,
        hasDisability: petInfo.info.disability ? true : false,
        disability: petInfo.info.disability || null,
        breed: petInfo.info.breed,
        // photoUrl: [
        //   req.body.name //fix it
        // ],
        particulars: petCaracteristicas.particulars || null,
        lastSeen: {
          whereOwnerLives: lostOnSameLocation,
          state: lostOnSameLocation ? null : form.address_lost_state.value.slice(5),
          state_abbrev: lostOnSameLocation ? null : form.address_lost_state.value.slice(1, 3),
          county: lostOnSameLocation ? null : form.address_lost_county.value,
          street: lostOnSameLocation ? null : form.address_lost_street.value
        },
        hasReward: reward,
        rewardAmount: reward ? form.reward_value.value : null,
        moreInfo: petInfo.info.moreInfo || null,
        postDetails: form.more_info_owner.value || null
      },
      user.token
    )

    // redirects to Complete Page
    if (responseFromServer.status === 201) {

      dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1, 'next'))
      router.push(`/pet/complete`)

    }

  }

  useEffect(() => {

    // if the first step is not completed, return to that page
    if ((animal == null || undefined) || (currentStep !== 3)) {

      dispatch(changeCreateLostPetPostSteps(currentStep, 1, 'previous'))
      router.push('/criar-anuncio/step1')

    }

    // if user dont have a account, it will redirect to register page
    if (animal && currentStep == 3 && !user.token) {

      router.push(`/user/register?redirect=${router.pathname}`)

    }

    getBrazilianStates()

  }, [])

  return (
    <CriarAnuncio>

      <div className={Step3FormStyles.form_container} data-pet={`${animal}`}>

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
                <label htmlFor='address_lost_state'>
                  Estado onde Aconteceu

                  <select
                    id='address_lost_state' name='address_lost_state'
                    onChange={(e) => getCounties(e.target.value.slice(1, 3))}
                  >

                    {states.map((item: any) => (

                      <option value={`(${item.sigla}) ${item.nome}`} key={item.id}>{item.nome}</option>

                    ))}

                  </select>

                </label>
              </div>

              {counties.length > 0 && (
                <>
                  <div>
                    <label htmlFor='address_lost_county'>
                      Município

                      <select
                        id='address_lost_county' name='address_lost_county' required
                      >

                        {counties.map((item: any) => (

                          <option value={item.nome} key={item.id}>{item.nome}</option>

                        ))}

                      </select>

                    </label>
                  </div>

                  <div>
                    <label htmlFor='address_lost_street'>
                      Rua onde aconteceu

                      <input type='text'
                        id='address_lost_street' name='address_lost_street'
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
                <input type='radio' id='has_reward_false' name='has_reward' value='true'
                  onChange={() => setReward(true)}
                ></input>
              </label>

              <label htmlFor='recompensa_nao'>
                Não
                <input type='radio' id='has_reward_true' name='has_reward' value='false'
                  onChange={() => setReward(false)}
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

                <input type='text' id='reward_value' name='reward_value' required>
                </input>

              </label>
            </div>
          )}

          <div className={Step3FormStyles.more_info}>
            <label htmlFor='mais_informacoes2'>
              Algo mais que queira dizer nesse post?
              <textarea rows={5}
                id='more_info_owner' name='more_info_owner'
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


      </div >
    </CriarAnuncio >
  )
}

export default Step3
