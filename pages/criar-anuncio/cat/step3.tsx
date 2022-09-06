import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import CriarAnuncio from '../index'
import { RootState } from '../../../store'

function Step3() {

  const stepsProgress = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
  const choseAnimal = useSelector((state: RootState) => state.chooseWhichAnimal)
  const { currentStep }: any = stepsProgress
  const { animal }: any = choseAnimal

  const router = useRouter()

  useEffect(() => {

    // if the first step is not completed, return to that page
    if ((animal == null || undefined) || (currentStep !== 3)) {

      router.push('/criar-anuncio/step1')

    }

  }, [animal, currentStep])

  return (
    <CriarAnuncio>
      <div>
        step3
      </div>
    </CriarAnuncio>
  )
}

export default Step3