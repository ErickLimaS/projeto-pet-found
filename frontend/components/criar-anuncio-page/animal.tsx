import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chooseWhichAnimal } from '../../redux/actions/lostPetPostStepsActions'
import { RootState } from '../../store'
import { AnimalItem } from '../../styles/styled-components/animal'

function Animal({ info }: any) {

    const animalChose = useSelector((state: RootState) => state.chooseWhichAnimal)
    const { animal }: any = animalChose
    const dispatch: any = useDispatch()

    return (
        <AnimalItem animal={animal}>

            <button type='button' id={info.name} onClick={() => dispatch(chooseWhichAnimal(info.name))}>

                <Image src={info.img} alt={info.alt} width={260} height={260} layout='intrinsic' />

                <h2>{info.title}</h2>

            </button>

        </AnimalItem>
    )
}

export default Animal