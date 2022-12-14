import React, { FormEvent, useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PetPageStyles from '../styles/PetPage/PetPage.module.css'
import Meta from '../components/Meta'
import PageLoading from '../components/PageLoading'
import Image from 'next/image'
import * as SVG from '../public/imgs/svg'
import { getPetInfo, notifyOwner } from './api/petRoutes'
import NotificationMessage from '../components/NotificationMessage'
import { RootState } from '../store'
import { useSelector } from 'react-redux'

const Pet: NextPage = () => {

    const [loading, setLoading] = useState<boolean>(true)
    const [petInfo, setPetInfo] = useState<any>(null)
    const [expanded, setExpanded] = useState<boolean>(false)
    const [hasCollarInput, setHasCollarInput] = useState<boolean>(true)
    const [responseForNotification, setResponseForNotification] = useState(null)

    const petImg = React.useRef<HTMLInputElement>(null)

    const userState: any = useSelector((state: RootState) => state.currentUser)

    const router = useRouter()

    // gets current pet's data 
    const getPetData = async () => {

        setLoading(true)
        if (router.query.id) {

            const data = await getPetInfo(`${router.query.id}`)

            setPetInfo(data)

        }

        setLoading(false)

    }

    const submitPetFoundForm = async (e: FormEvent) => {

        e.preventDefault()

        const form = e.target as HTMLFormElement;

        const data = {
            pet: {
                _id: `${router.query.id}`,
                name: `${petInfo.name}`,
                type: `${petInfo.type}`
            },
            moreInfo: {
                // petImg: form.petImg.value,
                hasCollar: form.hasCollar.value,
                collarName: form.hasCollar.value == 'true' ? form.collarName.value : null,
                foundAddress: form.hasCollar.value
            }
        }

        const res = await notifyOwner(data);

        setResponseForNotification(res)

        setExpanded(false)

        setTimeout(() => {
            setResponseForNotification(null)
        }, 6000)

    }

    useEffect(() => {

        getPetData()

    }, [router])

    return (
        <>
            <Meta
                title={loading === true ?
                    'Loading' : (petInfo != null ? petInfo.name : 'Not Found')}
                description={petInfo?.moreInfo && petInfo.moreInfo}
            />

            {/* SHOWS NOTIFICATION WITH THE RESULT AFTER A FORM IS SENT */}
            {responseForNotification && (
                <NotificationMessage props={responseForNotification} />
            )}

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
                                        Esp??cie: <b>{petInfo?.breed}</b>
                                    </p>
                                    <p>
                                        G??nero: {petInfo?.genre}
                                    </p>
                                    <p>
                                        Idade: {petInfo?.age}
                                    </p>

                                </div>

                            </div>

                            <div>
                                <h2 className={`${PetPageStyles.heading2_color}`}>
                                    Segundo o dono, el{petInfo?.genre === 'male' ? 'e' : 'a'} ??...
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
                                        Recompen??a
                                    </h2>

                                    <p>
                                        R$ {petInfo?.rewardAmount},00
                                    </p>

                                </div>

                                <div className={PetPageStyles.button}>

                                    <button type='button' onClick={() => {
                                        if (userState.token && userState.name) {
                                            setExpanded(!expanded)
                                        }
                                        else {
                                            router.push(`/login?redirect=/pet?id=${router.query.id}`)
                                        }
                                    }}>
                                        Achei Seu Pet
                                    </button>

                                </div>

                            </div>

                            <div id={PetPageStyles["description"]}>

                                <h2 className={PetPageStyles.heading2_color}>
                                    Descri????o do Pet
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

                        <h1>Voc?? viu mesmo!!!</h1>

                        <p>Preencha algumas informa????es para o dono saber se ?? ele mesmo!</p>

                        <form
                            encType="multipart/form-data"
                            onSubmit={(e) => submitPetFoundForm(e)}
                        >

                            <div>
                                <label>

                                    Foto do Pet
                                    <input type='file' name='petImg' />

                                </label>
                            </div>
                            <div>
                                <p>
                                    Est?? com coleira?
                                </p>
                                <div className={PetPageStyles.radio_inputs}>
                                    <label>
                                        Sim
                                        <input type='radio' onClick={() => setHasCollarInput(true)} value='true' name='hasCollar' id='hasCollar_true' />

                                    </label>

                                    <label>

                                        N??o
                                        <input type='radio' onClick={() => setHasCollarInput(false)} value='false' name='hasCollar' id='hasCollar_false' />

                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>

                                    O que est?? escrito nela?
                                    <input type='text' name='collarName' disabled={hasCollarInput ? false : true} />

                                </label>
                            </div>
                            <div>
                                <label>

                                    Onde Encontrou o Pet?
                                    <input type='text'
                                        id='foundAddress' name='foundAddress'
                                        placeholder='Ex: Rua das Laranjeiras, Bairro do Lim??o, SP' />

                                </label>
                            </div>
                            <div className={PetPageStyles.confirmValues}>
                                <label>

                                    Voc?? confirma que o dados acima s??o reais?
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