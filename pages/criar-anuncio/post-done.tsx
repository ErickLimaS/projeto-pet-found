import React, { PropsWithChildren, useEffect } from 'react'
import type { NextPage } from 'next'
import PostCompleteStyles from '../../styles/PostDone.module.css'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import Link from 'next/link'
import * as SVG from '../../public/imgs/svg'
import Meta from '../../components/Meta'

const PostDone: NextPage = () => {

    const steps = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
    const postInfo: any = useSelector((state: RootState) => state.setOwnerAndPetInfoTogether)
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
        <>
            <Meta title='Anúncio Criado' />
            <div className={PostCompleteStyles.container}>

                <h1>Anúncio Criado</h1>

                <p>lorem loremloremloremloremlorem loremlorem vvlorem vloremloremv vloremloremv</p>
                <button onClick={() => console.log(postInfo.info.pet)}>cons</button>
                <div className={PostCompleteStyles.post_info}>

                    <div>
                        <h2 className={PostCompleteStyles.pet_name}>
                            {postInfo.info.pet[0].info.name}
                            {postInfo.info.pet[0].info.genre === 'femea' ?
                                <SVG.FemaleSymbol /> : <SVG.MaleSymbol />}
                        </h2>

                        <p>{postInfo.info.pet[0].info.race}</p>

                        <h3>Ultima Vez Visto Em:</h3>

                        <p>{postInfo.info.pet[0].lastSeen[0].street}, {postInfo.info.pet[0].lastSeen[0].municipie} - <b>{postInfo.info.pet[0].lastSeen[0].state}</b></p>

                        {postInfo.info.pet[0].info.caracteristicas.length > 0 && (
                            <ul>
                                {postInfo.info.pet[0].info.caracteristicas.map((item: any) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        )}

                    </div>

                    <div>
                        <h2>{postInfo.info.name}</h2>

                        <h3>Contato</h3>
                        <p>({postInfo.info.contact_ddd}) {postInfo.info.contact_full}</p>

                        <h3>Mora Em</h3>
                        <p>{postInfo.info.location.street}, {postInfo.info.location.municipie} - <b>{postInfo.info.location.state}</b></p>
                    </div>
                </div>

                <div>

                    <Link href='/perfil'>Ir Para o Meu Perfil</Link>

                </div>

            </div >
        </>
    )
}

export default PostDone