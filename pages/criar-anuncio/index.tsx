import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { PropsWithChildren, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import Meta from '../../components/Meta'
import StepsCreatePost from '../../components/StepsCreatePost'
import LostPageStyles from '../../styles/Index_perdi_meu_pet.module.css'
import { changeCreateLostPetPostSteps } from '../../redux/actions/lostPetPostStepsActions'
import * as SVG from '../../public/imgs/svg'
import { useRouter } from 'next/router'

interface Props {
    children: any;
}

const CriarAnuncio: NextPage<PropsWithChildren<Props>> = ({ children }: any) => {

    const stepsFromPost = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
    const { currentStep }: any = stepsFromPost

    const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
    const { animal }: any = choseAnimal

    const dispatch: any = useDispatch()

    useEffect(() => {

        // iniciate the steps process
        if (currentStep === 0) {
            dispatch(changeCreateLostPetPostSteps(currentStep, 1))
        }

    }, [])

    const router = useRouter()

    // indicates which route the user will be redirected after animal is chose
    const nextStep = async () => {

        if (animal) {

            dispatch(changeCreateLostPetPostSteps(currentStep, currentStep + 1))

            router.push(`/criar-anuncio/${animal.toLowerCase()}/step${currentStep + 1}`)

        }

        // switch (animal) {
        //     case 'CAT':
        //         if (currentStep === 1) {
        //             dispatch(changeCreateLostPetPostSteps(currentStep, 2))
        //             return router.push('/criar-anuncio/cat/step2')
        //         }
        //         if (currentStep === 2) { //condition of step 2 fields filled
        //             dispatch(changeCreateLostPetPostSteps(currentStep, 3))
        //             return router.push('/criar-anuncio/cat/step3')
        //         }
        //     case 'DOG':
        //         if (currentStep === 1) {

        //             dispatch(changeCreateLostPetPostSteps(currentStep, 2))
        //             return router.push('/criar-anuncio/dog/step2')
        //         }
        //         if (currentStep === 2) {//condition of step 2 fields filled
        //             dispatch(changeCreateLostPetPostSteps(currentStep, 3))
        //             return router.push('/criar-anuncio/dog/step3')
        //         }
        //     case 'OTHER':
        //         if (currentStep === 1) {
        //             dispatch(changeCreateLostPetPostSteps(currentStep, 2))
        //             return router.push('/criar-anuncio/other/step2')
        //         }
        //         if (currentStep === 2) { //condition of step 2 fields filled
        //             dispatch(changeCreateLostPetPostSteps(currentStep, 3))
        //             return router.push('/criar-anuncio/other/step3')
        //         }
        //     default:
        //         return '/'
        // }

    }

    return (
        <div className={LostPageStyles.page_content}>

            <Meta title='Criar Anúncio' />

            <div className={LostPageStyles.heading_and_creating_post_progress}>

                <h1>Criar Anúncio</h1>

                {/* Show Which Step User is Currently On, changes as user progress with the post creation */}
                <StepsCreatePost />

            </div>

            <div className={LostPageStyles.children}>

                {children}

            </div>

            <div className={LostPageStyles.pet_posters}>


                <div className={LostPageStyles.next_page}>

                    <button type='button'
                        disabled={currentStep === 1}
                        onClick={() => nextStep()}
                    >
                        <SVG.ChevronLeft /> Voltar
                    </button>

                    <button type='button'
                        disabled={animal == null || undefined}
                        onClick={() => nextStep()}
                    >
                        Próximo Passo <SVG.ChevronRight />
                    </button>

                </div>

            </div>

        </div>
    )
}

export default CriarAnuncio