import { NextPage } from 'next/types'
import React, { useEffect, useId, useState } from 'react'
import Meta from '../../components/Meta'
import { getAnotherUserInfo } from '../api/userRoutes'
import Styles from '../../styles/userPage/userPage.module.css'
import * as SVG from '../../public/imgs/svg'
import Image from 'next/image'
import Link from 'next/link'
import { convertDate } from '../../components/convertDate'

const User: NextPage = ({ userProfile }: any) => {

    interface profileType {
        firstName: string,
        surname: string,
        profileImg: string,
        updatedAt: string,
        activityLog: [{
            title: string,
            type: string,
            date: Date,
            _id: string
        }],
        contacts: {
            tel1: {
                ddd: string,
                tel: string,
            },
            tel2: {
                ddd: string,
                tel: string,
            },
            facebook: string,
            instagram: string
        },
        address: object,
        petsFound: any,
        petsRegistered: object,
        settings: {
            showContacts: boolean,
            showPetsHelped: boolean,
            showProfileImg: boolean,
            showActivityLog: boolean,
        }
        moreInfo: {
            thanksReceived: number
            petsHelped: number
            petsStillLost: number
        }

    }

    const [profileData] = useState<profileType>(userProfile.profile)
    const [petsFoundExpanded, setPetsFoundExpanded] = useState<boolean>(false)

    const petsFoundId = useId()

    useEffect(() => {

        if (!userProfile) {
            alert('no profileData')
        }

    }, [])

    return (
        <>

            <Meta
                title={`${profileData.firstName} - Perfil`}
                description={`Perfil do usuário ${profileData.firstName}`}
            />

            <div className={Styles.container}>

                <section className={Styles.user_main_info_wrapper}>

                    <Image src={profileData.settings.showProfileImg ? '' : ''} alt={`Foto de perfil do usuário ${profileData.firstName} ${profileData.surname}`} width={220} height={220} />

                    <h1>{profileData.firstName} {profileData.surname}</h1>

                    <div className={Styles.account_info}>

                        <div className={Styles.badge}>

                            <SVG.ClapHands alt='Mãos Aplaudindo.' data-no-increase-size='true' fill='var(--primary)' />

                            <h6>
                                Obrigados
                            </h6>

                            <p>{profileData.moreInfo.thanksReceived}</p>

                        </div>

                        <div className={Styles.badge}>

                            <SVG.HandThumbsUp alt='Mão dando sinal de joia.' fill='var(--primary)' />

                            <h6>
                                Ajudados
                            </h6>

                            <p>{profileData.moreInfo.petsHelped}</p>

                        </div>

                        <div className={Styles.badge}>

                            <SVG.Search alt='Lupa.' fill='var(--primary)' />

                            <h6>
                                Ainda Perdidos
                            </h6>

                            <p>{profileData.moreInfo.petsStillLost}</p>

                        </div>

                    </div>

                </section>

                <section className={Styles.more_info_wrapper}>

                    {profileData.settings.showContacts && (
                        <div className={`${Styles.info_panel} ${Styles.contacts}`}>

                            {/* <h2>Contatos</h2> */}

                            <ul>
                                <li>

                                    {profileData?.contacts?.facebook ? (
                                        <a href={profileData?.contacts?.facebook} target='_blank' rel='noreferrer'>
                                            <SVG.Facebook fill='#4267B2' aria-label='Link do perfil do facebook' />
                                            Meu Perfil
                                        </a>
                                    ) : (
                                        <>
                                            <SVG.Facebook fill='#4267B2' aria-label='Link do perfil do facebook' />
                                            <p>Não Adicionado</p>
                                        </>
                                    )}
                                </li>
                                <li>

                                    {profileData?.contacts?.instagram ? (
                                        <a href={`https://www.instagram.com/${profileData?.contacts?.instagram.slice(1)}`} target='_blank' rel='noreferrer'>
                                            <SVG.Instagram fill='#E1306C' aria-label='Link do perfil do instagram' />
                                            {profileData?.contacts?.instagram}
                                        </a>
                                    ) : (
                                        <>
                                            <SVG.Instagram fill='#E1306C' aria-label='Link do perfil do instagram' />
                                            <p>Não Adicionado</p>
                                        </>
                                    )}
                                </li>

                                <li>
                                    <Link
                                        href={`tel:${profileData?.contacts?.tel1?.ddd}${profileData?.contacts?.tel1?.tel}`}
                                    >
                                        <a>
                                            <SVG.Telephone fill='#FD9600' aria-label='Primeiro número de Telefone' />
                                            ({profileData?.contacts?.tel1?.ddd})
                                            {profileData?.contacts?.tel1?.tel.slice(0, 5)}
                                            -
                                            {profileData?.contacts?.tel1?.tel.slice(5)}
                                        </a>
                                    </Link>
                                </li>

                                <li>

                                    {profileData?.contacts?.tel2 ? (
                                        <Link
                                            href={`tel:${profileData?.contacts?.tel2?.ddd}${profileData?.contacts?.tel2?.tel}`}
                                        >
                                            <a>
                                                <SVG.Telephone fill='#FD9600' aria-label='Segundo número de Telefone' />
                                                ({profileData?.contacts?.tel2?.ddd})
                                                {profileData?.contacts?.tel2?.tel.slice(0, 5)}
                                                -
                                                {profileData?.contacts?.tel2?.tel.slice(5)}

                                            </a>
                                        </Link>
                                    ) : (
                                        <>   <SVG.Telephone fill='#FD9600' aria-label='Segundo número de Telefone' />
                                            <p>Não Adicionado</p>
                                        </>
                                    )}
                                </li>

                            </ul>

                        </div>
                    )}

                    {profileData.settings.showActivityLog && (
                        <div className={Styles.info_panel}>

                            <h2>Últimas Atividades</h2>

                            <ul>

                                {profileData.activityLog.map((item: any) => (
                                    <li key={item._id}>

                                        <SVG.Bell /> <p>{item.title}</p>

                                    </li>
                                ))}
                            </ul>

                        </div>
                    )}

                    {profileData.settings.showPetsHelped && (
                        <div className={`${Styles.info_panel} ${Styles.pets_found}`}>

                            <h2>Pets Encontrados</h2>

                            <ul id={petsFoundId}>

                                {petsFoundExpanded ? (
                                    profileData.petsFound.map((item: any) => (
                                        <li key={item._id}>

                                            {item.type === 'DOG' && (<SVG.Dog2 />)}
                                            {item.type === 'CAT' && (<SVG.Cat2 />)}
                                            {item.type === 'OTHER' && (<SVG.Bell />)}

                                            <div className={Styles.pet_info}>

                                                <h3>
                                                    <Link href={`/pet?id=${item._id}`}>
                                                        {item.name}
                                                    </Link>
                                                </h3>

                                                <p>
                                                    {item.userWhoFound.rewardAccepted ?
                                                        `Recompensa Aceita` : 'Recompensa Não Aceita'}
                                                </p>

                                                <small>Em {convertDate(item.dateWhenFound)}</small>

                                            </div>

                                        </li>
                                    ))
                                ) : (
                                    profileData.petsFound.slice(0, 6).map((item: any) => (
                                        <li key={item._id}>

                                            {item.type === 'DOG' && (<SVG.Dog2 />)}
                                            {item.type === 'CAT' && (<SVG.Cat2 />)}
                                            {item.type === 'OTHER' && (<SVG.Bell />)}

                                            <div className={Styles.pet_info}>

                                                <h3>
                                                    <Link href={`/pet?id=${item._id}`}>
                                                        {item.name}
                                                    </Link>
                                                </h3>

                                                <p>
                                                    {item.userWhoFound.rewardAccepted ?
                                                        `Recompensa Aceita` : 'Recompensa Não Aceita'}
                                                </p>

                                                <small>Em {convertDate(item.dateWhenFound)}</small>

                                            </div>

                                        </li>
                                    ))
                                )}
                            </ul>

                            {profileData.petsFound.length > 6 && (
                                <button
                                    aria-expanded={petsFoundExpanded ? true : false}
                                    aria-controls={petsFoundId}
                                    onClick={() => setPetsFoundExpanded(!petsFoundExpanded)}
                                >
                                    {petsFoundExpanded ?
                                        'Mostrar menos' : 'Mostrar todos os pets'
                                    }
                                </button>
                            )}

                        </div>
                    )}

                </section>

            </div>

        </>
    )

}

export async function getServerSideProps({ query }: any) {

    const userProfile: any = await getAnotherUserInfo(query.id) || null

    return {
        props: {
            userProfile
        },
    };

}

export default User