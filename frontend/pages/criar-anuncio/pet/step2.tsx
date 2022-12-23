import { useRouter } from 'next/router'
import React, { FormEvent, LegacyRef, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'
import ButtonsStyles from '../../../styles/FoundPage/Index.module.css'
import Step2FormStyles from '../../../styles/FoundPage/steps/Step2Form.module.css'
import API from '../../api/petsInfoApi'
import * as SVG from '../../../public/imgs/svg'
import PetCaracteristicas from '../../../components/criar-anuncio/PetCaracteristicas'
import { changeCreateLostPetPostSteps, setPetInfo } from '../../../redux/actions/lostPetPostStepsActions'

function Step2() {

  const [petBreed, setPetBreed] = useState<any>([])
  const [hasDisabilities, setHasDisabilities] = useState<boolean>()

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
  const petCaracteristicas = useSelector((state: RootState) => state.setCaracteristicasPet)

  const { caracteristicas }: any = petCaracteristicas
  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const router = useRouter()

  const dispatch: any = useDispatch()

  // fetch data of dogs breed
  const loadPetBreed = async () => {

    if (animal == 'DOG') {
      const data = await API.getDogsBreed()
      setPetBreed(data)
    }
    else if (animal == 'CAT') {
      const data = await API.getCatsBreed()
      setPetBreed(data)
    }
    else if (animal == 'OTHER') {
      const data = await API.getDogsBreed() // fix
      setPetBreed(data)
    }

  }

  // previous page
  const returnStep = () => {

    router.push('/criar-anuncio/step1')

  }

  const submitForm = (e: FormEvent) => {

    e.preventDefault()

    const form = e.target as HTMLFormElement

    dispatch(
      setPetInfo({
        name: (form.name as any).value,
        type: animal,
        genre: form.genre.value,
        age: form.age.value,
        size: form.size.value,
        disability: hasDisabilities ? form.disability.value : null,
        breed: form.breed.value,
        caracteristicas: caracteristicas,
        moreInfo: form.more_info.value,
      })
    )

    dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1, 'next'))

    router.push(`/criar-anuncio/pet/step3`)


  }

  useEffect(() => {

    // if the first step is not completed, return to that page
    if ((animal == null || undefined) || (currentStep !== 2)) {

      dispatch(changeCreateLostPetPostSteps(currentStep, 1, 'previous'))
      router.push('/criar-anuncio/step1')

    }

    loadPetBreed()

  }, [])

  return (
    <CriarAnuncio>
      <div className={Step2FormStyles.form_container} data-pet={`${animal}`}>
        <form className={Step2FormStyles.step2_form} name="Form" onSubmit={(e) => submitForm(e)}>

          <div className={Step2FormStyles.pet_photo}>
            <label htmlFor='pet_photo'>
              <span className={Step2FormStyles.img_placeholder}></span>
              <input type='file' id='pet_photo' name='foto_do_pet'></input>
            </label>
          </div>

          <div>
            <label htmlFor='name'>
              Nome do Pet
              <input type='text' id='name' name='name' required={true}></input>
            </label>
          </div>

          <div className={Step2FormStyles.genre_flex_row} aria-label='Escolha o gênero do pet'>

            <div className={Step2FormStyles.genre_wrapper}>
              <SVG.MaleSymbol aria-label='Simbolo de Masculino' />
              <label htmlFor='macho'>
                Macho
                <input type='radio' id='macho' name='genre' value='male'></input>
              </label>
            </div>

            <div className={Step2FormStyles.genre_wrapper}>
              <label htmlFor='femea'>
                Fêmea
                <input type='radio' id='femea' name='genre' value='female' ></input>
              </label>
              <SVG.FemaleSymbol aria-label='Simbolo de Feminino' />
            </div>

          </div>

          <div>
            <label htmlFor='age'>
              Idade
              <input type='text' id='age' name='age' placeholder='Ex: 4' required></input>
            </label>
            <small>Apenas números.</small>
          </div>

          <div>
            <label htmlFor='size'>
              Tamanho do Pet (centímetros)
              <input type='text' id='size' name='size' placeholder='Ex: 89' required></input>
            </label>
            <small>Escreva em centimetros (e apenas números).</small>
          </div>

          <div>
            <label htmlFor='race'>
              Raça

              <select id='breed' name='breed' required >

                <option disabled selected>Escolha a raça</option>

                {petBreed.map((item: any) => (

                  <option value={item.name} key={item.id}>{item.name}</option>

                ))}

              </select>

            </label>
          </div>

          <div className={Step2FormStyles.has_disability_selector}>
            <label htmlFor='hasDisabilities'>
              Tem deficiência
              <input type='radio'
                id='hasDisabilities' name='hasDisabilities'
                value='true'
                onClick={() => { setHasDisabilities(true) }}
              ></input>
            </label>

            <label htmlFor='hasDisabilities'>
              Não tem deficiência
              <input type='radio'
                id='hasDisabilities' name='hasDisabilities'
                value='false'
                onClick={() => { setHasDisabilities(false) }}
              ></input>
            </label>
          </div>

          {hasDisabilities && (

            <div className={Step2FormStyles.disability}>
              <label htmlFor='disability'>
                Deficiência do meu Pet
                <input type='text'
                  id='disability' name='disability'
                  placeholder='Escreva a deficiência. Pode ser mais de uma.'
                ></input>
              </label>
            </div>

          )}

          <PetCaracteristicas />

          <div className={Step2FormStyles.more_info}>
            <label htmlFor='mais_informacoes'>
              Mais Informações
              <textarea 
                cols={40} rows={5}
                id='more_info' name='more_info'
                placeholder='Ex: "Ele tem o rabo cortado!" ou "A patinha da esquerda da parte de trás dele tem uma mancha branca."'
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
      </div >
    </CriarAnuncio >
  )
}

export default Step2