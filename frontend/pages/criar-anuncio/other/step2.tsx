import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'
import Step2FormStyles from '../../../styles/FoundPage/steps/Step2Form.module.css'
import * as SVG from '../../../public/imgs/svg'

function Step2() {

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const router = useRouter()

  useEffect(() => {

    // if the first step is not completed, return to that page
    if ((animal == null || undefined) || (currentStep !== 2)) {

      // router.push('/criar-anuncio/step1')

    }

  }, [])

  return (
    <CriarAnuncio>
      <div className={Step2FormStyles.other_form}>
      <form className={Step2FormStyles.step2_form}>

        <div className={Step2FormStyles.pet_photo}>
          <label htmlFor='pet_photo'>
            <span className={Step2FormStyles.img_placeholder}></span>
            <input type='file' id='pet_photo' name='foto_do_pet'></input>
          </label>
        </div>

        <div>
          <label htmlFor='name'>
            Nome
            <input type='text' id='name' name='nome_do_pet' placeholder='' required></input>
          </label>
        </div>

        <div className={Step2FormStyles.genre_flex_row}>

          <span><SVG.MaleSymbol /></span>
          <label htmlFor='macho'>
            Macho
            <input type='radio' id='macho' name='genre' value='macho'></input>
          </label>

          <label htmlFor='femea'>
            Femea
            <input type='radio' id='femea' name='genre' value='femea'></input>
          </label>
          <span><SVG.FemaleSymbol /></span>
        </div>

        <div>
          <label htmlFor='race'>
            Raça

            <select id='race' name='caracteristicas' required>

              <option value='dsa'>dsa</option>
              <option>213</option>
              <option>333</option>

            </select>

          </label>
        </div>

        <div>
          <label htmlFor='caracteristicas'>
            Características

            <select id='caracteristicas' name='caracteristicas' required>

              <option value='brincalhao'>Brincalhão</option>
              <option>213</option>
              <option>333</option>

            </select>

          </label>
        </div>

        <div className={Step2FormStyles.more_info}>
          <label htmlFor='mais_informacoes'>
            Mais Informações
            <textarea cols={40} rows={5} id='mais_informacoes' name='mais_informacoes' placeholder='Ex: "Ele tem o rabo cortado!" ou "A patinha da esquerda da parte de trás dele tem uma mancha branca."' required></textarea>
          </label>
        </div>

      </form>
      </div>
    </CriarAnuncio>
  )
}

export default Step2