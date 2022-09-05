import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import Meta from '../../components/Meta'
import StepsCreatePost from '../../components/StepsCreatePost'
import LostPageStyles from '../../styles/Index_perdi_meu_pet.module.css'
import { changeCreateLostPetPostSteps } from '../../redux/actions/lostPetPostStepsActions'
import * as SVG from '../../public/imgs/svg'
import { useRouter } from 'next/router'
import Step1 from './step1'

const CriarAnuncio: NextPage = () => {

    const stepsFromPost = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
    const { currentStep }: any = stepsFromPost

    const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
    const { animal }: any = choseAnimal

    const dispatch: any = useDispatch()

    const router = useRouter()

    // indicates which route the user will be redirected after animal is chose
    const routeToTheChoseAnimal = () => {

        switch (animal) {
            case 'CAT':
                if (currentStep === 2) {
                    return 'cat/step2'
                }
                if (currentStep === 3) { //condition of step 2 fields filled
                    return 'cat/step3'
                }
            case 'DOG':
                if (currentStep === 2) {
                    return 'dog/step2'
                }
                if (currentStep === 3) {//condition of step 2 fields filled
                    return 'dog/step3'
                }
                return 'dog/step3'
            case 'OTHER':
                if (currentStep === 2) {
                    return 'other/step2'
                }
                if (currentStep === 3) { //condition of step 2 fields filled
                    return 'other/step3'
                }
            default:
                return '/'
        }

    }

    return (
        <div className={LostPageStyles.page_content}>

            <Meta title='Criar Anúncio' />

            <div className={LostPageStyles.heading_and_creating_post_progress}>

                <h1>Criar Anúncio</h1>

                {/* Show Which Step User is Currently On, changes as user progress with the post creation */}
                <StepsCreatePost />

            </div>

            <div className={LostPageStyles.pet_posters}>

                <Step1 />

                <div className={LostPageStyles.next_page}>

                    <button type='button'
                        disabled={currentStep === 1}
                        onClick={() =>
                            dispatch(changeCreateLostPetPostSteps(currentStep - 2)) &&
                            router.push(`/criar-anuncio/${routeToTheChoseAnimal()} `)}
                    >
                        <SVG.ChevronRight /> Voltar
                    </button>

                    <button type='button'
                        disabled={animal == null || undefined}
                        onClick={() =>
                            dispatch(changeCreateLostPetPostSteps(currentStep)) &&
                            router.push(`/criar-anuncio/${routeToTheChoseAnimal()} `)}
                    >
                        Próximo Passo <SVG.ChevronRight />
                    </button>

                </div>

            </div>

        </div>
    )
}

export default CriarAnuncio