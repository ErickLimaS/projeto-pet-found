import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { getNotifications } from '../api/userRoutes'
import { store } from '../../store'
import { NextPage } from 'next/types'
import NotificationMessage from '../../components/NotificationMessage'
import Meta from '../../components/Meta'
import * as SVG from '../../public/imgs/svg'
import Styles from '../../styles/userPage/notifications.module.css'
import Link from 'next/link'
import { convertDate } from '../../components/convertDate'
import PageLoading from '../../components/PageLoading'

const Notifications: NextPage = () => {

  const [notifications, setNotifications] = useState<[]>()
  const [userWhoFoundContacts, setUserWhoFoundContacts] = useState<[]>()

  const state: any = store.getState()
  const user = state.currentUser

  const router = useRouter()

  // notification ID
  const query = router.query.id

  const notificationsFromServer = async () => {

    const res = await getNotifications(user.token)

    if (res.success) {

      setNotifications(res.notifications)

    }
    else {

      NotificationMessage(res)

    }

  }

  useEffect(() => {

    if (user) {

      notificationsFromServer()

    }
    else {

      router.push('/user/login?redirect=/notifications')

    }
  }, [])

  return (

    <>

      <Meta title='Notificações' />

      <div className={Styles.container}>


        <h1>Notificações</h1>

        <p>Todas notificações recebidas desde o início dessa conta.</p>

        <section className={Styles.notifications}>

          {notifications ? (

            <ul>

              {notifications.map((item: any) => (

                <li key={item._id}>

                  <div className={Styles.heading}>

                    {item.pet.type === "DOG" && <SVG.Dog2 alt='Ícone de Cachorro' />}
                    {item.pet.type === "CAT" && <SVG.Cat2 alt='Ícone de Gato' />}
                    {item.pet.type === "OTHER" && <SVG.Dog2 alt='Ícone de Cachorro' />}

                    <h2><Link href={`/pet?id=${item.pet._id}`}>{item.pet.name}</Link></h2>

                  </div>

                  <div className={Styles.body}>

                    <p>
                      <b><Link href={`/user/${item.whoFound._id}`}>{item.whoFound.name}</Link></b> acredita que encontrou seu pet!
                    </p>

                    <h3>Informações dada por quem achou</h3>

                    <ul>

                      <li>
                        <b>Onde foi encontrado:</b> {item.infoSentByWhoFound.foundAddress}
                      </li>

                      <li>
                        <b>Está com Coleira:</b> {item.infoSentByWhoFound.hasCollar ? 'Sim' : 'Não'}
                      </li>

                      <li data-hascollar={item.infoSentByWhoFound.hasCollar}>
                        <b>O que está escrito na coleira:</b> {item.infoSentByWhoFound.hasCollar ? item.infoSentByWhoFound.collarName : 'Não tem coleira'}
                      </li>

                    </ul>

                    <p>Acha que é mesmo o {item.pet.name}? Entre em contato com quem achou!</p>

                    <button type='button'
                      aria-expanded={userWhoFoundContacts ? 'true' : 'false'}
                      aria-controls='who_found_contacts'
                      onClick={() => {
                        if (!userWhoFoundContacts) {



                        }
                      }}
                    >
                      Entrar em contato com {item.whoFound.name}
                    </button>

                    {userWhoFoundContacts && (
                      <ul id='who_found_contacts'>
                        <li>test contasnto</li>

                      </ul>
                    )}

                    <p>As informações estão erradas ou acha que é um engano? </p>

                    <button type='button'
                      id={Styles.cancel_button}
                    >
                      Marca como engano
                    </button>

                  </div>

                  <small>{convertDate(item.createdAt)}</small>

                </li>

              ))}

            </ul>

          ) : (

            <PageLoading />

          )}

        </section>

      </div>

    </>
  )
}

export default Notifications