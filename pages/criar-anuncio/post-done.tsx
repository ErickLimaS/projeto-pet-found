import React, { PropsWithChildren, useEffect } from 'react'
import CriarAnuncio from './index'
import PostComplete from '../../styles/PostDone.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import Link from 'next/link'

const PostDone = () => {

    const steps = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
    const { currentStep }: any = steps

    const router = useRouter()
    const dispatch: any = useDispatch()

    useEffect(() => {

        // iniciate the steps process
        // if (currentStep !== 4) {
        //     router.push('/criar-anuncio/step1')
        // }

    }, [])

    return (
        <div className={PostComplete.container}>

            <h1>Anúncio Criado</h1>

            <p>lorem loremloremloremloremlorem loremlorem vvlorem vloremloremv vloremloremv</p>

            <div className={PostComplete.post_info}>

                <div>
                    <h2>nome pet</h2>

                    <ul>
                        <li>detalhe</li>
                        <li>detalhe</li>
                        <li>detalhe</li>
                    </ul>
                </div>

                <div>
                    <h2>Dono</h2>

                    <ul>
                        <li>detalhe</li>
                        <li>detalhe</li>
                        <li>detalhe</li>
                    </ul>
                </div>
            </div>

            <div>

                <Link href='/perfil'>Ir Para o Meu Perfil</Link>

            </div>

        </div >
    )
}

export default PostDone