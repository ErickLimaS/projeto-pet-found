import React from 'react'
import CriarAnuncio from './index'
import Animal from '../../components/criar-anuncio/animal'
import Step1Styles from '../../styles/FoundPage/steps/Step1Form.module.css'
import AnimalsAvailableToChoose from '../api/animals'
import ButtonStyles from '../../styles/FoundPage/Index.module.css'
import * as SVG from '../../public/imgs/svg'
import { useRouter } from 'next/dist/client/router'
import { RootState } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { changeCreateLostPetPostSteps } from '../../redux/actions/lostPetPostStepsActions'

const Step1 = () => {

    const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)

    const { currentStep }: any = stepsProgress

    const router = useRouter()
    const dispatch: any = useDispatch()

    const nextStep = () => {

        dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1, 'next'))
        router.push(`/criar-anuncio/pet/step2`)

    }

    return (
        <CriarAnuncio>
            <nav className={Step1Styles.nav_options}>
                <ul>

                    {AnimalsAvailableToChoose.map((item: any) => (
                        <Animal info={item} key={item.name} />
                    ))}

                </ul>
            </nav>

            <div className={ButtonStyles.next_page} data-qty-buttons='1'>

                <button type='button' onClick={() => nextStep()}>
                    Próxima Etapa <SVG.ChevronRight />
                </button>

            </div>
        </CriarAnuncio>
    )
}

export default Step1