import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { FormEvent, PropsWithChildren, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import Meta from '../../components/Meta'
import StepsCreatePost from '../../components/StepsCreatePost'
import LostPageStyles from '../../styles/Index_perdi_meu_pet.module.css'
import { changeCreateLostPetPostSteps } from '../../redux/actions/lostPetPostStepsActions'
import * as SVG from '../../public/imgs/svg'
import { useRouter } from 'next/router'
import Buttons from '../../components/criar-anuncio-page/buttons'

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

        </div>
    )
}

export default CriarAnuncio