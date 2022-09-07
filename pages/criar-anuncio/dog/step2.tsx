import { useRouter } from 'next/router'
import React, { LegacyRef, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'
import Step2FormStyles from '../../../styles/Step2Form.module.css'
import API from '../../api/animalsInfo'
import * as SVG from '../../../public/imgs/svg'
import PetCaracteristicas from '../../../components/criar-anuncio-page/PetCaracteristicas'
import { setPetGenre, setPetMoreInfo, setPetName, setPetRace } from '../../../redux/actions/lostPetPostStepsActions'

function Step2() {

  const [dogsBreed, setDogsBreed] = useState<any>([])
  const inputCaracteristics = React.createRef<HTMLInputElement>()
  const [caracteristicsArray, setCaracteristicsArray] = useState<SetStateAction<any>>([])
  const [breedChose, setBreedChose] = useState()

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const router = useRouter()

  const dispatch: any = useDispatch()

  // fetch data of dogs breed
  const loadDogsBreed = async () => {

    const data = await API.getDogsBreed()
    setDogsBreed(data)

  }

  useEffect(() => {

    // if the first step is not completed, return to that page
    if ((animal == null || undefined) || (currentStep !== 2)) {

      router.push('/criar-anuncio/step1')

    }

    loadDogsBreed()

  }, [])

  return (
    <CriarAnuncio>
      <div className={Step2FormStyles.dog_form}>
        <form className={Step2FormStyles.step2_form}>

          <div className={Step2FormStyles.pet_photo}>
            <label htmlFor='pet_photo'>
              <span className={Step2FormStyles.img_placeholder}></span>
              <input type='file' id='pet_photo' name='foto_do_pet'></input>
            </label>
          </div>

          <div>
            <label htmlFor='name'>
              Nome do Pet
              <input type='text' id='name' name='nome_do_pet' placeholder='' required
                onBlur={(e) => dispatch(setPetName(e.target.value))}
              ></input>
            </label>
          </div>

          <div className={Step2FormStyles.genre_flex_row}>

            <span><SVG.MaleSymbol /></span>
            <label htmlFor='macho'>
              Macho
              <input type='radio' id='macho' name='genre' value='macho'
                onClick={(e: any) => dispatch(setPetGenre(e.target.value))}
              ></input>
            </label>

            <label htmlFor='femea'>
              Fêmea
              <input type='radio' id='femea' name='genre' value='femea'
                onClick={(e: any) => dispatch(setPetGenre(e.target.value))}
              ></input>
            </label>
            <span><SVG.FemaleSymbol /></span>
          </div>

          <div>
            <label htmlFor='race'>
              Raça

              <select id='race' name='caracteristicas' required
                onBlur={(e) => dispatch(setPetRace(e.target.value))}
              >

                {dogsBreed.map((item: any) => (

                  <option value={item.name} key={item.id}>{item.name}</option>

                ))}

              </select>

            </label>
          </div>

          <PetCaracteristicas />

          <div className={Step2FormStyles.more_info}>
            <label htmlFor='mais_informacoes'>
              Mais Informações
              <textarea cols={40} rows={5} id='mais_informacoes' name='mais_informacoes' placeholder='Ex: "Ele tem o rabo cortado!" ou "A patinha da esquerda da parte de trás dele tem uma mancha branca."' required onBlur={(e) => dispatch(setPetMoreInfo(e.target.value))}
              >
              </textarea>
            </label>
          </div>

        </form>
      </div>
    </CriarAnuncio>
  )
}

export default Step2