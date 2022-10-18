import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { data } from './api/templateData'
import PetPageStyles from '../styles/PetPage/PetPage.module.css'
import Meta from '../components/Meta'
import PageLoading from '../components/PageLoading'
import Image from 'next/image'
import * as SVG from '../public/imgs/svg'

const Pet: NextPage = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [petInfo, setPetInfo] = useState<any>(null)
    const [petDataNotFound, setPetDataNotFound] = useState<boolean>(false)
    const [expanded, setExpanded] = useState<boolean>(false)

    const petImg = React.useRef<HTMLInputElement>(null)
    const checkboxConfirmPetFound = React.useRef<HTMLInputElement>(null)

    const router = useRouter()

    // gets all pet's data 
    const getPetInfo = () => {

        setLoading(true)

        data.find((item) => {
            if (String(item.id) == router.query.id) {
                console.log(item)
                return setPetInfo(item)
            }
        })
        console.log(petInfo)

        setLoading(false)

    }

    const openPetFoundPanel = () => {

        setExpanded(true)

    }

    const confirmPetFound = (e: any) => {

        // Send to user 'A' account whose pet is lost a notification about user 'B' found their pet. Then user 'A' will be able to contact with user 'B'.

        // Server will receave a img from user B and his info contact. After that, user A will get a notification about his pet lost, and will be able to contact with user B.

        e.preventDefault()

        // const img = petImg.current.value
        // const confirm = checkboxConfirmPetFound.current.value

    }

    useEffect(() => {

        getPetInfo()

    }, [router])

    return (
        <>
            <Meta
                title={loading === true ?
                    'Loading' : (petInfo != null ? petInfo.name : 'Not Found')}
                description={petInfo?.moreInfo && petInfo.moreInfo}
            />

            {loading ? (
                <div className={PetPageStyles.loading}>

                    <PageLoading />

                </div>
            ) : (
                <>
                    <div className={PetPageStyles.container}>

                        <section id={PetPageStyles["first-content"]}>

                            <div className={PetPageStyles.img_container}>

                                <SVG.ChevronLeft />

                                <Image
                                    src={petInfo?.img}
                                    alt={petInfo?.name}
                                    width={720} height={405}
                                    layout='intrinsic'
                                />

                                <SVG.ChevronRight />

                            </div>

                            <div className={PetPageStyles.pet_info}>

                                <h1>{petInfo?.name}</h1>

                                <div className={PetPageStyles.details}>

                                    <p>
                                        Raça: <b>{petInfo?.race}</b>
                                    </p>
                                    <p>
                                        Idade: {petInfo?.age}
                                    </p>
                                    <p>
                                        Mora em: <b>Rua das Lamentações - São Paulo - SP, 01234-000</b>
                                    </p>

                                </div>

                            </div>

                            <div className={PetPageStyles.singularities}>

                                <ul>
                                    <li><SVG.Exclamation /> option1</li>

                                    <li><SVG.Exclamation /> option2</li>

                                    <li><SVG.Exclamation /> option3</li>

                                    <li><SVG.Exclamation /> option1</li>

                                    <li><SVG.Exclamation /> option1</li>

                                    <li><SVG.Exclamation /> option1</li>

                                </ul>

                            </div>

                        </section>

                        <section>

                            <div id={PetPageStyles["second-content"]}>
                                <div className={PetPageStyles.text}>

                                    <h2>Perdido em</h2>

                                    <p>
                                        Sed sodales ultrices lectus at molestie. Duis semper augue in urna eleifend.
                                    </p>

                                </div>

                                <div className={PetPageStyles.text}>

                                    <h2>Recompença</h2>

                                    <p>
                                        R$ {petInfo?.rewardAmountOffered}
                                    </p>

                                </div>

                                <div className={PetPageStyles.button}>

                                    <button type='button'>
                                        Achei Seu Pet
                                    </button>

                                </div>

                            </div>

                            <div id={PetPageStyles["description"]}>

                                <h2>Descrição do Pet</h2>

                                <p>
                                    {petInfo?.moreInfo}
                                </p>

                            </div>

                        </section>

                    </div >
                </>
            )
            }

        </>
    )
}

export default Pet