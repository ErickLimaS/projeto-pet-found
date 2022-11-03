import { useRouter } from 'next/router'
import React, { FormEvent, LegacyRef, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'
import ButtonsStyles from '../../../styles/FoundPage/Index.module.css'
import Step2FormStyles from '../../../styles/FoundPage/steps/Step2Form.module.css'
import API from '../../api/petsInfoApi'
import * as SVG from '../../../public/imgs/svg'
import PetCaracteristicas from '../PetCaracteristicas'
import { changeCreateLostPetPostSteps, setPetInfo } from '../../../redux/actions/lostPetPostStepsActions'

function Step2() {

  const [catsBreed, setCatsBreed] = useState<any>([])

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
  const petCaracteristicas = useSelector((state: RootState) => state.setCaracteristicasPet)

  const { caracteristicas }: any = petCaracteristicas
  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const petName = React.useRef<HTMLInputElement>(null)
  const petGenre = React.useRef<HTMLInputElement>(null)
  const petRace = React.useRef<HTMLSelectElement>(null)
  const petMoreInfo = React.useRef<HTMLTextAreaElement>(null)

  const router = useRouter()

  const dispatch: any = useDispatch()

  // fetch data of cats breed
  const loadCatsBreed = async () => {

    const data = await API.getCatsBreed()
    setCatsBreed(data)

  }

  const returnStep = () => {

    router.push('/criar-anuncio/step1')

  }

  const submitForm = (e: FormEvent) => {

    e.preventDefault()

    if ((petName.current?.value != null || undefined || ``) || (petGenre.current?.value != null || undefined || ``) || (petRace.current?.value != null || undefined || ``) || (caracteristicas != null || undefined || ``)) {

      dispatch(setPetInfo(
        {
          name: petName.current?.value,
          type: animal,
          genre: petGenre.current?.value,
          breed: petRace.current?.value,
          caracteristicas: caracteristicas,
          moreInfo: petMoreInfo.current?.value,
        }
      ))

      dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1))

      router.push(`/criar-anuncio/${animal.toLowerCase()}/step3`)

    }

  }

  useEffect(() => {

    // if the first step is not completed, return to that page
    if ((animal == null || undefined) || (currentStep !== 2)) {

      // router.push('/criar-anuncio/step1')

    }

    loadCatsBreed()

  }, [])

  return (
    <CriarAnuncio>
      <div className={Step2FormStyles.other_form}>
        <form className={Step2FormStyles.step2_form} name="Form" onSubmit={(e) => submitForm(e)}>

          <div className={Step2FormStyles.pet_photo}>
            <label htmlFor='pet_photo'>
              <span className={Step2FormStyles.img_placeholder}></span>
              <input type='file' id='pet_photo' name='foto_do_pet'></input>
            </label>
          </div>

          <div>
            <label htmlFor='name'>
              Nome do Pet - NAO FINALIZADO, QUEBRADO
              <input type='text' ref={petName} id='name' name='nome_do_pet' placeholder='' required={true}></input>
            </label>
          </div>

          <div className={Step2FormStyles.genre_flex_row}>

            <span><SVG.MaleSymbol /></span>
            <label htmlFor='macho'>
              Macho
              <input type='radio' ref={petGenre} id='macho' name='genre' value='male'></input>
            </label>

            <label htmlFor='femea'>
              Fêmea
              <input type='radio' ref={petGenre} id='femea' name='genre' value='female' ></input>
            </label>
            <span><SVG.FemaleSymbol /></span>
          </div>

          <div>
            <label htmlFor='race'>
              Raça

              <select id='race' ref={petRace} name='caracteristicas' required >

                {catsBreed.map((item: any) => (

                  <option value={item.name} key={item.id}>{item.name}</option>

                ))}

              </select>

            </label>
          </div>

          <PetCaracteristicas />

          <div className={Step2FormStyles.more_info}>
            <label htmlFor='mais_informacoes'>
              Mais Informações
              <textarea ref={petMoreInfo} cols={40} rows={5} id='mais_informacoes' name='mais_informacoes' placeholder='Ex: "Ele tem o rabo cortado!" ou "A patinha da esquerda da parte de trás dele tem uma mancha branca."'
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
              Próxima Etapa <SVG.ChevronRight />
            </button>

          </div>

        </form>
      </div>
    </CriarAnuncio>
  )
}

export default Step2