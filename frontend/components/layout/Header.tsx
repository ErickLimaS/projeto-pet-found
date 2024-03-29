import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Styles from '../../styles/Layout/Header.module.css'
import * as C from '../../styles/Layout/headerStyledComponents'
import * as SVG from '../../public/imgs/svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { getNotifications, logoutUser, setNotificationsToRead } from '../../pages/api/userRoutes'
import { convertDate } from '../convertDate'

function Header() {

    const [mobileMenu, setMobileMenu] = useState<Boolean>(false)
    const [user, setUser] = useState<any>(null)
    const [isUserLoginPanelOpen, setIsUserLoginPanelOpen] = useState<boolean>(false)
    const [expandNotifications, setExpandNotifications] = useState<boolean>(false)
    const [notifications, setNotifications] = useState<[]>()

    const userState: any = useSelector((state: RootState) => state.currentUser)

    // get notificatinos not read by user to be displayed
    const notificationsFromServer = async () => {

        const res = await getNotifications(userState.token, 'not_read')

        setNotifications(res?.notifications)

    }

    // handle notifications from user's account
    const notificationsSettings = () => {

        setExpandNotifications(!expandNotifications)

        // set notifications received as already read
        if (expandNotifications === true) {
            setNotificationsToRead()
        }

    }

    useEffect(() => {

        if (userState.name && userState.token) {
            setUser(userState)
            notificationsFromServer()
        }
        else {
            setUser(null)
        }

        setMobileMenu(false)

    }, [userState])

    return (
        <header className={Styles.header}>

            <nav>

                <div className={Styles.logo}>

                    <Link href='/'>
                        <SVG.Brand />
                    </Link>

                </div>

                <div className={Styles.links}>

                    <ul className={Styles.list}>
                        <li>
                            <Link href='/criar-anuncio/step1'>Ajudem a achar meu Pet</Link>
                        </li>

                        <li>
                            <Link href='/found'>Procurar Pelos Anúncios</Link>
                        </li>

                        {/* <li>
                            <Link href='/como-funciona'>Como Funciona</Link>
                        </li> */}
                    </ul>

                    <span className={Styles.line}></span>

                    <div className={Styles.login_desktop}>

                        {user ? (
                            <>
                                <button type='button'
                                    aria-labelledby={`Acessar menu da conta de ${user.name}`}
                                    className={Styles.user_login}
                                    data-clicked={isUserLoginPanelOpen ? 'true' : 'false'}
                                    onClick={() => setIsUserLoginPanelOpen(!isUserLoginPanelOpen)}
                                >
                                    {user.name}
                                    <SVG.CaretDownFill />
                                </button>

                                {isUserLoginPanelOpen && (

                                    <div className={Styles.user_panel}>

                                        <ul>
                                            <li>
                                                <Link href='/user/profile'>
                                                    <a>
                                                        <SVG.Profile /> Meu Perfil
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href='/my-pets'>
                                                    <a>
                                                        <SVG.PawIcon /> Meus Pets
                                                    </a>
                                                </Link>
                                            </li>
                                            <li>
                                                <button type='button'
                                                    onClick={() => logoutUser()}>
                                                    <SVG.BoxArrowLeft /> Sair da Conta
                                                </button>
                                            </li>

                                        </ul>

                                    </div>

                                )}
                            </>
                        ) : (
                            <Link href='/user/login'>
                                <a>
                                    <SVG.ProfilePerson />
                                    Login
                                </a>
                            </Link>
                        )}

                    </div>

                    {notifications && (

                        <div className={Styles.notifications_container}>

                            <button type='button'
                                aria-expanded={expandNotifications} aria-controls='notification_list'
                                onClick={() => notificationsSettings()}
                            >
                                {notifications.length > 0 ?
                                    <SVG.BellFill
                                        aria-label='Icone de novas notificações'
                                        data-notifications-available={notifications.length > 0 ? 'true' : 'false'}
                                    />
                                    :
                                    <SVG.Bell
                                        aria-label='Icone de sem novas notificações'
                                    />
                                }
                            </button>

                            {expandNotifications && (

                                <div className={Styles.notifications_panel} id='notification_list'>
                                    {notifications.length > 0 ? (
                                        <ul>

                                            {notifications.map((item: any) => (

                                                <li key={item._id}>

                                                    <Link
                                                        href={`/user/notifications?id=${item._id}`} className={Styles.notification}
                                                    >
                                                        <a>
                                                            <div
                                                                className={Styles.icon_container}
                                                            >
                                                                <SVG.Bell
                                                                    aria-label='Icone de nova notificação'
                                                                />
                                                            </div>

                                                            <div>

                                                                <h6>
                                                                    Noticias d{item.pet.genre === 'male' ? 'o' : 'a'} {item.pet.name}
                                                                </h6>

                                                                <p>
                                                                    O usuário {item.whoFound.name} acredita que encontrou {item.pet.genre === 'male' ? 'o' : 'a'} {item.pet.name}.
                                                                </p>

                                                                <small>
                                                                    Em {convertDate(item.createdAt)}
                                                                </small>

                                                            </div>
                                                        </a>
                                                    </Link>

                                                </li>

                                            ))}
                                        </ul>
                                    ) : (
                                        <div className={Styles.no_notifications_container}>
                                            <h6>Sem novas notificações</h6>
                                        </div>
                                    )}
                                    <Link href='/user/notifications'>
                                        Ver notificações antigas
                                    </Link>
                                </div>

                            )}
                        </div>

                    )}
                </div>

                <div className={Styles.mobile_wrapper}>
                    {notifications && (

                        <div className={Styles.notifications_container}>

                            <button type='button'
                                aria-expanded={expandNotifications} aria-controls='notification_list'
                                onClick={() => notificationsSettings()}
                            >
                                {notifications.length > 0 ?
                                    <SVG.BellFill
                                        aria-label='Icone de novas notificações'
                                        data-notifications-available={notifications.length > 0 ? 'true' : 'false'}
                                    />
                                    :
                                    <SVG.Bell
                                        aria-label='Icone de sem novas notificações'
                                    />
                                }
                            </button>

                            {expandNotifications && (

                                <div className={Styles.notifications_panel} id='notification_list'>
                                    {notifications.length > 0 ? (
                                        <ul>

                                            {notifications.map((item: any) => (

                                                <li key={item._id}>

                                                    <Link
                                                        href={`/user/notifications?id=${item._id}`} className={Styles.notification}
                                                    >
                                                        <a>
                                                            <div
                                                                className={Styles.icon_container}
                                                            >
                                                                <SVG.Bell
                                                                    aria-label='Icone de nova notificação'
                                                                />
                                                            </div>

                                                            <div>

                                                                <h6>
                                                                    Noticias d{item.pet.genre === 'male' ? 'o' : 'a'} {item.pet.name}
                                                                </h6>

                                                                <p>
                                                                    O usuário {item.whoFound.name} acredita que encontrou {item.pet.genre === 'male' ? 'o' : 'a'} {item.pet.name}.
                                                                </p>

                                                                <small>
                                                                    Em {convertDate(item.createdAt)}
                                                                </small>

                                                            </div>
                                                        </a>
                                                    </Link>

                                                </li>

                                            ))}
                                        </ul>
                                    ) : (
                                        <div className={Styles.no_notifications_container}>
                                            <h6>Sem novas notificações</h6>
                                        </div>
                                    )}
                                    <Link href='/user/notifications'>
                                        Ver notificações antigas
                                    </Link>
                                </div>

                            )}
                        </div>

                    )}

                    <div className={Styles.drawer_sidebar_mobile}>

                        <button type='button'
                            aria-label='Abrir Menu'
                            aria-expanded={mobileMenu ? 'true' : 'false'}
                            aria-controls='menu'
                            onClick={() => setMobileMenu(!mobileMenu)}>

                            <SVG.List />

                        </button>

                        <C.MobileList mobileMenu={mobileMenu} id='menu'>

                            <div className='button-container'>
                                <button type='button' className='close-panel'
                                    aria-label='Fechar Menu'
                                    onClick={() => setMobileMenu(!mobileMenu)}>

                                    <SVG.X />

                                </button>
                            </div>

                            <li className={Styles.login}>
                                {user ? (
                                    <>
                                        <button type='button'
                                            aria-labelledby={`Acessar menu da conta de ${user.name}`}
                                            className={Styles.user_login}
                                            data-clicked={isUserLoginPanelOpen ? 'true' : 'false'}
                                            onClick={() => setIsUserLoginPanelOpen(!isUserLoginPanelOpen)}
                                        >
                                            {user.name}
                                            <SVG.CaretDownFill />
                                        </button>
                                        {isUserLoginPanelOpen && (

                                            <div className={Styles.user_panel}>

                                                <ul>

                                                    <li>
                                                        <Link href='/user/profile'>
                                                            <a>
                                                                <SVG.Profile /> Meu Perfil
                                                            </a>
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link href='/my-pets'>
                                                            <a>
                                                                <SVG.PawIcon /> Meus Pets
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button type='button'
                                                            onClick={() => logoutUser()}>
                                                            <SVG.BoxArrowLeft /> Sair da Conta
                                                        </button>
                                                    </li>

                                                </ul>

                                            </div>

                                        )}
                                    </>
                                ) : (
                                    <Link href='/user/login'>
                                        <a>
                                            <SVG.ProfilePerson />
                                            Login
                                        </a>
                                    </Link>
                                )}
                            </li>

                            <li>
                                <Link href='/'>Início</Link>
                            </li>

                            <li>
                                <Link href='/criar-anuncio/step1'>Ajudem a achar meu Pet</Link>
                            </li>

                            <li>
                                <Link href='/found'>Procurar Pelos Anúncios</Link>
                            </li>

                            {/* <li>
                            <Link href='/como-funciona'>Como Funciona</Link>
                        </li> */}

                        </C.MobileList>


                    </div>

                </div>
            </nav>

        </header >
    )
}

export default Header