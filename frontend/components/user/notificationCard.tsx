import React, { useId, useState } from 'react'
import Link from 'next/link'
import * as SVG from '../../public/imgs/svg'
import Styles from '../../styles/userPage/notifications.module.css'
import { convertDate } from '../convertDate'
import { deleteNotification, getContactInfoFromUser } from '../../pages/api/userRoutes'
import NotificationMessage from '../NotificationMessage'

function NotificationCard({ props }: any) {

    const [responseForNotification, setResponseForNotification] = useState<any>()

    const [userWhoFoundContacts, setUserWhoFoundContacts] = useState<any>()
    const [ignoreButtonClicked, setIgnoreButtonClicked] = useState<boolean>()

    // set random ID to elements on .map
    const ramdonElementId1 = useId()
    const ramdonElementId2 = useId()

    return (
        <>

            {/* SHOWS NOTIFICATION WITH THE RESULT AFTER A FORM IS SENT */}
            {responseForNotification && (
                <NotificationMessage props={responseForNotification} />
            )}

            <li >

                <div className={Styles.heading}>

                    {props.pet.type === "DOG" && <SVG.Dog2 alt='Ícone de Cachorro' />}
                    {props.pet.type === "CAT" && <SVG.Cat2 alt='Ícone de Gato' />}
                    {props.pet.type === "OTHER" && <SVG.Dog2 alt='Ícone de Cachorro' />}

                    <h2><Link href={`/pet?id=${props.pet._id}`}>{props.pet.name}</Link></h2>

                </div>

                <div className={Styles.body}>

                    <p>
                        <b><Link href={`/user/${props.whoFound._id}`}>{props.whoFound.firstName}</Link></b> acredita que encontrou seu pet!
                    </p>

                    <h3>Informações dada por quem achou</h3>

                    <ul>

                        <li>
                            <b>Onde foi encontrado</b> {props.infoSentByWhoFound.foundAddress}
                        </li>

                        <li>
                            <b>Está com Coleira</b> {props.infoSentByWhoFound.hasCollar ? 'Sim' : 'Não'}
                        </li>

                        <li data-hascollar={props.infoSentByWhoFound.hasCollar}>
                            <b>O que está escrito na coleira</b> {props.infoSentByWhoFound.hasCollar ? props.infoSentByWhoFound.collarName : 'Não tem coleira'}
                        </li>

                    </ul>

                    <p>Acha que é mesmo o {props.pet.name}? Entre em contato com quem achou!</p>

                    <button type='button'
                        aria-expanded={userWhoFoundContacts ? 'true' : 'false'}
                        aria-controls={ramdonElementId1}
                        onClick={async () => {
                            if (!userWhoFoundContacts) {

                                const res = await getContactInfoFromUser(props.whoFound._id)
                                setUserWhoFoundContacts(res.contacts)

                            }
                            else {
                                setUserWhoFoundContacts(null)
                            }
                        }}
                    >
                        Entrar em contato com {props.whoFound.firstName} <SVG.ThreeDots />
                    </button>

                    {userWhoFoundContacts && (
                        <ul id={ramdonElementId1} className={Styles.who_found_contacts}>

                            <li>
                                <a href={`tel: ${userWhoFoundContacts?.tel1.ddd}${userWhoFoundContacts?.tel1.tel}`}>
                                    <SVG.Telephone fill='var(--primary)' alt='Ícone de Telefone' />({userWhoFoundContacts?.tel1.ddd}) {userWhoFoundContacts?.tel1.tel.slice(0, 5)} - {userWhoFoundContacts?.tel1.tel.slice(5)}
                                </a>
                            </li>
                            <li>
                                <a href={`tel: ${userWhoFoundContacts?.tel2.ddd}${userWhoFoundContacts?.tel2.tel}`} >
                                    <SVG.Telephone fill='var(--primary)' alt='Ícone de Telefone' />({userWhoFoundContacts?.tel2.ddd}) {userWhoFoundContacts?.tel2.tel.slice(0, 5)} - {userWhoFoundContacts?.tel2.tel.slice(5)}
                                </a>
                            </li>
                            <li>
                                <a href={'https://www.instagram.com/' + userWhoFoundContacts?.instagram.slice(1)} target='_blank' rel='noreferrer'>
                                    <SVG.Instagram fill='#E1306C' alt='Ícone do Instagram' />{userWhoFoundContacts?.instagram}
                                </a>
                            </li>
                            <li>
                                <a href={userWhoFoundContacts?.facebook} target='_blank' rel='noreferrer'>
                                    <SVG.Facebook fill='#4267B2' alt='Ícone do Facebook' /> Perfil do Facebook
                                </a>
                            </li>

                        </ul>
                    )}

                    <p>As informações estão erradas ou acha que é um engano? </p>

                    <button type='button'
                        className={Styles.ignore_button}
                        onClick={() => { setIgnoreButtonClicked(!ignoreButtonClicked) }}
                        aria-expanded={ignoreButtonClicked ? 'true' : 'false'}
                        aria-controls={ramdonElementId2}
                    >
                        Marca como engano <SVG.ThreeDots />
                    </button>

                    {ignoreButtonClicked && (

                        <div id={ramdonElementId2} className={Styles.ignore_notification_panel}>

                            <h4>Tem certeza que quer descartar essa notificação?</h4>

                            <button
                                onClick={async () => {
                                    const res = await deleteNotification(props._id)
                                    console.log(res)
                                    setResponseForNotification(res)
                                }}
                                className={Styles.confirm_button}
                            >
                                Sim, quero apagar e ignorar
                            </button>

                            <button
                                onClick={() => { setIgnoreButtonClicked(false) }}
                                className={Styles.cancel_button}
                            >
                                Não, mantenha essa por enquanto
                            </button>

                        </div>

                    )}

                </div>

                <small>{convertDate(props.createdAt)}</small>

            </li>
        </>
    )
}

export default NotificationCard