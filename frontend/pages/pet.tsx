import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { data } from './api/templateData'
import PetPageStyles from '../styles/PetPage/PetPage.module.css'
import Meta from '../components/Meta'
import PageLoading from '../components/PageLoading'
import Image from 'next/image'
import * as SVG from '../public/imgs/svg'
import { getPetInfo } from './api/petRoutes'

const Pet: NextPage = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [petInfo, setPetInfo] = useState<any>(null)
    const [expanded, setExpanded] = useState<boolean>(false)
    const [hasCollarInput, setHasCollarInput] = useState<boolean>(true)

    const petImg = React.useRef<HTMLInputElement>(null)

    const router = useRouter()

    // gets current pet's data 
    const getPetData = async () => {

        if (router.query.id) {

            const data = await getPetInfo(`${router.query.id}`)

            setPetInfo(data)

        }

    }

    const submitPetFoundForm = (e: any) => {

        // Send to user 'A' account whose pet is lost a notification about user 'B' found their pet. Then user 'A' will be able to contact with user 'B'.

        // Server will receave a img from user B and his info contact. After that, user A will get a notification about his pet lost, and will be able to contact with user B.

        e.preventDefault()

        // const img = petImg.current.value
        // const confirm = checkboxConfirmPetFound.current.value

    }

    useEffect(() => {

        setLoading(true)

        getPetData()

        setLoading(false)

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
                    <div className={PetPageStyles.container} data-panel-expanded={expanded ? 'true' : 'false'}>

                        <section id={PetPageStyles["first-content"]}>

                            <div className={PetPageStyles.img_container}>

                                <button type='button' aria-label='Foto Anterior'>
                                    <SVG.ChevronLeft />
                                </button>

                                <Image
                                    src={petInfo?.img}
                                    alt={petInfo?.name}
                                    width={720} height={405}
                                    layout='intrinsic'
                                />

                                <button type='button' aria-label='Proxima Foto'>
                                    <SVG.ChevronRight />
                                </button>

                            </div>

                            <div className={PetPageStyles.pet_info}>

                                <h1>{petInfo?.name}</h1>

                                <div className={PetPageStyles.details}>

                                    <p>
                                        Espécie: <b>{petInfo?.breed}</b>
                                    </p>
                                    <p>
                                        Gênero: {petInfo?.genre}
                                    </p>
                                    <p>
                                        Idade: {petInfo?.age}
                                    </p>

                                </div>

                            </div>

                            <div>
                                <h2 className={`${PetPageStyles.heading2_color}`}>
                                    Segundo o dono, el{petInfo?.genre === 'male' ? 'e' : 'a'} é...
                                </h2>

                                <div className={PetPageStyles.singularities}>

                                    <ul>
                                        {petInfo?.particulars?.map((item: string) => (

                                            <li key={item}><SVG.Exclamation />{item}</li>
                                        ))}

                                    </ul>
                                </div>

                            </div>

                        </section>

                        <section className={PetPageStyles.second_info_container}>

                            <div id={PetPageStyles["second-content"]}>
                                <div className={PetPageStyles.text}>

                                    <h2 className={`${PetPageStyles.heading2_color} ${PetPageStyles.heading2_size}`}>
                                        Perdido em
                                    </h2>

                                    <p>

                                        {petInfo?.lastSeen?.street}<br /> {petInfo?.lastSeen?.county} <br /> {petInfo?.lastSeen?.state}

                                    </p>

                                </div>

                                <div className={`${PetPageStyles.text} ${PetPageStyles.reward}`}>

                                    <h2 className={PetPageStyles.heading2_size}>
                                        Recompença
                                    </h2>

                                    <p>
                                        R$ {petInfo?.rewardAmount},00
                                    </p>

                                </div>

                                <div className={PetPageStyles.button}>

                                    <button type='button' onClick={() => setExpanded(!expanded)}>
                                        Achei Seu Pet
                                    </button>

                                </div>

                            </div>

                            <div id={PetPageStyles["description"]}>

                                <h2 className={PetPageStyles.heading2_color}>
                                    Descrição do Pet
                                </h2>

                                <p>
                                    {petInfo?.moreInfo}
                                </p>

                            </div>

                        </section>

                    </div >

                    {/* Panel to be expanded */}
                    <div
                        className={expanded ? PetPageStyles.expand_true_found_pet_owner_contact : PetPageStyles.expand_false_found_pet_owner_contact}
                    >

                        <h1>Você viu mesmo!!!</h1>

                        <p>Preencha algumas informações para o dono saber se é ele mesmo!</p>

                        <form
                            encType="multipart/form-data"
                            onSubmit={(e) => submitPetFoundForm(e)}
                        >

                            <div>
                                <label>

                                    Foto do Pet
                                    <input type='file' name='photo' />

                                </label>
                            </div>
                            <div>
                                <p>
                                    Está com coleira?
                                </p>
                                <div className={PetPageStyles.radio_inputs}>
                                    <label>
                                        Sim
                                        <input type='radio' onClick={() => setHasCollarInput(true)} value='true' name='hasCollar' id='hasCollar_true' />

                                    </label>

                                    <label>

                                        Não
                                        <input type='radio' onClick={() => setHasCollarInput(false)} value='false' name='hasCollar' id='hasCollar_false' />

                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>

                                    O que está escrito nela?
                                    <input type='text' name='nameOnCollar' disabled={hasCollarInput ? false : true} />

                                </label>
                            </div>
                            <div>
                                <label>

                                    Onde Encontrou o Pet?
                                    <input type='text' placeholder='Ex: Rua das Laranjeiras, Bairro do Limão, SP' name='addressWhenFound' />

                                </label>
                            </div>
                            <div className={PetPageStyles.confirmValues}>
                                <label>

                                    Você confirma que o dados acima são reais?
                                    <input type='checkbox' value='true' name='confirmedDataOnForm' required />

                                </label>
                            </div>

                            <div className={PetPageStyles.submitButton}>
                                <button type='submit'>Informar Dono</button>
                                <button type='button' onClick={() => setExpanded(false)}>Voltar</button>
                            </div>

                        </form>

                    </div>

                </>
            )
            }

        </>
    )
}

export default Pet