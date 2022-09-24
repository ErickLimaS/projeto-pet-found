import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { data } from './api/templateData'
import PetPageStyles from '../styles/PetPage.module.css'
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
                return setPetInfo(item)
            }
        })

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

                        <section className={PetPageStyles.img_and_first_details}>

                            <div className={PetPageStyles.pet_img}>

                                <Image
                                    src='/imgs/home/missing-dog-1.jpg'
                                    width={440} height={460}
                                    alt={'Foto do/da ' + petInfo?.name}
                                    layout='intrinsic'
                                    onClick={() => console.log('')}
                                />

                            </div>

                            <div className={PetPageStyles.pet_first_info}>

                                <div className={PetPageStyles.info}>
                                    <h1>{petInfo?.name}</h1>

                                    <p>Raça <span>{petInfo?.race}</span></p>
                                    <p><span>{petInfo?.age} anos de idade</span></p>
                                    <p>Última Vez Visto em
                                        <span>{petInfo?.lastSeen[0].street}
                                            , {petInfo?.lastSeen[0].municipie}
                                            - {petInfo?.lastSeen[0].state}</span>
                                    </p>
                                </div>

                                <div className={PetPageStyles.contacts}>

                                    <h2>Você Encontrou esse(a) {petInfo?.petTranslated}?</h2>

                                    <p>Entre em contato com o dono atraves desses meios</p>

                                    <ul>

                                        <li>
                                            <a href={petInfo?.ownerContacts.email}>
                                                <SVG.Envelope fill='#c71610' />
                                            </a>
                                        </li>
                                        <li>

                                            <a href={petInfo?.ownerContacts.whatsapp}>
                                                <SVG.Whatsapp fill='#25D366' />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={petInfo?.ownerContacts.facebook}>
                                                <SVG.Facebook fill='#4267B2' />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={petInfo?.ownerContacts.instagram}>
                                                <SVG.Instagram fill='#E1306C' />
                                            </a>
                                        </li>

                                    </ul>

                                    <h2>Ou notifique o dono pelo site</h2>

                                    <button
                                        type='button'
                                        name={`achei_seu_${petInfo?.petTranslated}`}
                                        onClick={() => openPetFoundPanel()}
                                    >
                                        {petInfo?.petTranslated === 'Cachorro' && <SVG.Dog2 />}
                                        {petInfo?.petTranslated === 'Gato' && <SVG.Cat2 />}
                                        {petInfo?.petTranslated === 'Other' && <SVG.Dog2 />}
                                        Achei seu {petInfo?.petTranslated}!
                                    </button>

                                </div>
                            </div>

                        </section>

                        {expanded === true && (

                            <div className={PetPageStyles.confirm_pet_found} >

                                {/* <h1>Mande uma foto do Pet para o dono reconhecer !</h1> */}
                                <button type='button' onClick={() => setExpanded(false)} name='fechar painel'>X</button>

                                <form
                                    method='post'
                                    encType="multipart/form-data"
                                    onSubmit={(e) => confirmPetFound(e)}>

                                    <div className={PetPageStyles.img_input}>
                                        <label htmlFor='pet_found_img'>Mande uma foto do pet que você achou</label>
                                        <input ref={petImg} type='file' id='pet_found_img' name='Foto do Pet Achado' required></input>
                                    </div>

                                    <div className={PetPageStyles.reverse}>
                                        <label htmlFor='confirm_contact'>Sim, acredito que achei o pet informado nesse post e aceito entrar em contato com o dono.</label>
                                        <input ref={checkboxConfirmPetFound} id='confirm_contact' name='Confirmo que achei o pet' type='checkbox' required></input>
                                    </div>

                                    <button type='submit'>Enviar para o Dono</button>

                                </form>

                            </div>

                        )
                        }

                        {
                            petInfo?.moreInfo && (

                                < section className={PetPageStyles.more_info}>

                                    <h2>Informações dadas pelo dono</h2>

                                    <p>{petInfo?.moreInfo}</p>

                                </section>

                            )
                        }

                        {
                            petInfo?.sugestionsTest && (
                                <section className={PetPageStyles.suggestions}>

                                    <h2>Por acaso, você viu alguns desses ?</h2>

                                    <ul>

                                        {petInfo?.sugestionsTest.map((item: any) => (

                                            <li key={item.id}>

                                                <a href={`/pet?id=${item.id}`}>
                                                    <Image

                                                        src='/imgs/home/missing-dog-1.jpg'
                                                        width={220} height={240}
                                                        alt={'Foto do/da ' + item.name}
                                                        layout='fixed'
                                                    />
                                                    <h3>{item.name}</h3>
                                                </a>
                                            </li>

                                        ))}

                                    </ul>

                                </section>
                            )
                        }
                    </div >
                </>
            )
            }

        </>
    )
}

export default Pet