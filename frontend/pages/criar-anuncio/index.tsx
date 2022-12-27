import type { NextPage } from 'next'
import React, { FormEvent, PropsWithChildren, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import Meta from '../../components/Meta'
import CreatePostSteps from '../../components/criar-anuncio/CreatePostSteps'
import LostPageStyles from '../../styles/FoundPage/Index.module.css'
import { changeCreateLostPetPostSteps } from '../../redux/actions/lostPetPostStepsActions'

interface Props {
    children: ReactElement;
}

const CriarAnuncio: NextPage<PropsWithChildren<Props>> = ({ children }: Props) => {

    const stepsFromPost = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
    const { currentStep }: any = stepsFromPost

    const dispatch: any = useDispatch()

    useEffect(() => {

        // iniciate the steps process
        if (currentStep === 0) {
            dispatch(changeCreateLostPetPostSteps(currentStep, 1, 'next'))
        }

    }, [])

    return (
        <div className={LostPageStyles.page_content}>

            <Meta title='Criar Anúncio' />

            <div className={LostPageStyles.heading_and_creating_post_progress}>

                <h1>Criar Anúncio</h1>

                {/* Show Which Step User is Currently On, changes as user progress with the post creation */}
                <CreatePostSteps />

            </div>

            <div className={LostPageStyles.children_content}>

                {children}

            </div>

        </div>
    )
}

export default CriarAnuncio