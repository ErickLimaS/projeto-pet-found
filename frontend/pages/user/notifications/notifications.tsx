import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getNotifications } from '../../api/userRoutes'
import { store } from '../../../store'
import { NextPage } from 'next/types'
import NotificationMessage from '../../../components/notificationMessage'
import Meta from '../../../components/Meta'
import Styles from './notifications.module.css'
import PageLoading from '../../../components/pageLoading'
import NotificationCard from '../../../components/user/notificationCard'

const Notifications: NextPage = () => {

  const [notifications, setNotifications] = useState<any>()

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

            notifications?.length > 0 ? (

              <ul>

                {notifications.map((item: any) => (

                  <NotificationCard props={item} key={item._id} />

                ))}

              </ul>

            ) : (

              <div id={Styles.no_notifications}>

                <p>Nenhuma notificação encontrada.</p>

              </div>
            )

          ) : (

            <PageLoading />

          )}

        </section>

      </div>

    </>
  )
}

export default Notifications