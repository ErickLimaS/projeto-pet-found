import React, { PropsWithChildren } from 'react'
import CriarAnuncio from './index'
import Animal from '../../components/criar-anuncio-page/animal'
import Step1Styles from '../../styles/cssCreatePostSteps/step1.module.css'
import { Animais } from '../api/animals'
import ButtonStyles from '../../styles/Index_perdi_meu_pet.module.css'
import * as SVG from '../../public/imgs/svg'
import { useRouter } from 'next/dist/client/router'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { changeCreateLostPetPostSteps } from '../../redux/actions/lostPetPostStepsActions'

const Step1 = () => {

    const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
    const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)

    const { animal }: any = choseAnimal
    const { currentStep }: any = stepsProgress

    const router = useRouter()
    const dispatch: any = useDispatch()

    const nextStep = () => {

        dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1))
        router.push(`/criar-anuncio/${animal.toLowerCase()}/step2`)

    }

    return (
        <CriarAnuncio>
            <nav className={Step1Styles.nav_options}>
                <ul>

                    {Animais.map((item: any) => (
                        <Animal info={item} key={item.name} />
                    ))}

                </ul>
            </nav>

            <div className={ButtonStyles.next_page}>

                <button type='button' onClick={() => nextStep()}>
                    Próxima Etapa <SVG.ChevronRight />
                </button>

            </div>
        </CriarAnuncio>
    )
}

export default Step1