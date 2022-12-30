import React from 'react'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import * as C from '../../styles/criar-anuncio/CreatePostSteps'
import * as SVG from '../../public/imgs/svg'

function CreatePostSteps() {

    // GETS WHICH STEP USER IS ON 
    const step = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
    const { currentStep }: any = step

    return (

        <C.Container currentStep={currentStep}>

            <ol>

                <li id='step1'>1 - Escolher o Pet</li>

                <SVG.ChevronRight />

                <li id='step2'>2 - Características do Pet</li>

                <SVG.ChevronRight />
                
                <li id='step3'>3 - Informações do Dono</li>

            </ol>

        </C.Container>

    )
}

export default CreatePostSteps