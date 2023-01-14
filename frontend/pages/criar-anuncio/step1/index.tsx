import React from 'react'
import CriarAnuncio from '../index'
import PetCard from '../../../components/criarAnuncioPage/PetCard'
import Step1Styles from './Step1Form.module.css'
import ButtonStyles from '../Index.module.css'
import * as SVG from '../../../public/imgs/svg'
import { useRouter } from 'next/dist/client/router'
import { RootState } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { changeCreateLostPetPostSteps } from '../../../redux/actions/lostPetPostStepsActions'
import Animais from '../../api/animals'

interface PetProps{
    name: String, 
    alt: String, 
    title: String, 
    img: String, 
}

const Step1 = ({ petsAvailable }: any) => {

    const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)

    const { currentStep }: any = stepsProgress

    const router = useRouter()
    const dispatch: any = useDispatch()

    const nextStep = () => {

        dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1, 'next'))
        router.push(`/criar-anuncio/step2`)

    }

    return (
        <CriarAnuncio>
            <>
                <nav className={Step1Styles.nav_options}>
                    <ul>

                        {petsAvailable.map((item: PetProps) => (
                            <PetCard info={item} key={item.name} />
                        ))}

                    </ul>
                </nav>

                <div className={ButtonStyles.next_page} data-qty-buttons='1'>

                    <button type='button' onClick={() => nextStep()}>
                        Próxima Etapa <SVG.ChevronRight />
                    </button>

                </div>
            </>
        </CriarAnuncio>
    )
}

export default Step1

export async function getServerSideProps() {

    const res = Animais

    return {
        props: {
            petsAvailable: res
        }
    }

}