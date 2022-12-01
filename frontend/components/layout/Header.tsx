import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import headerStyles from '../../styles/Layout/Header.module.css'
import * as C from '../../styles/Layout/headerStyledComponents'
import * as SVG from '../../public/imgs/svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { logoutUser } from '../../pages/api/userRoutes'

function Header() {

    const [mobileMenu, setMobileMenu] = useState<Boolean>(false)
    const [user, setUser] = useState<any>(null)
    const [isUserLoginPanelOpen, setIsUserLoginPanelOpen] = useState<boolean>(false)

    const userState: any = useSelector((state: RootState) => state.currentUser)

    useEffect(() => {

        if (userState.name) {
            setUser(userState)
        }
        else {
            setUser(null)
        }

        setMobileMenu(false)

    }, [userState])

    return (
        <header className={headerStyles.header}>

            <nav>

                <div className={headerStyles.logo}>

                    <Link href='/'>
                        <SVG.Brand />
                    </Link>

                </div>

                <div className={headerStyles.links}>

                    <ul className={headerStyles.list}>
                        <li>
                            <Link href='/criar-anuncio/step1'>Ajude achar meu Pet</Link>
                        </li>

                        <li>
                            <Link href='/found'>Achei um Pet</Link>
                        </li>

                        {/* <li>
                            <Link href='/como-funciona'>Como Funciona</Link>
                        </li> */}
                    </ul>

                    <span className={headerStyles.line}></span>

                    <div className={headerStyles.login_desktop}>

                        {user ? (
                            <>
                                <button type='button'
                                    aria-labelledby={`Acessar menu da conta de ${user.name}`}
                                    className={headerStyles.user_login}
                                    data-clicked={isUserLoginPanelOpen ? 'true' : 'false'}
                                    onClick={() => setIsUserLoginPanelOpen(!isUserLoginPanelOpen)}
                                >
                                    {user.name}
                                    <SVG.CaretDownFill />
                                </button>

                                {isUserLoginPanelOpen && (

                                    <div className={headerStyles.user_panel}>

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

                </div>

                <div className={headerStyles.drawer_sidebar_mobile}>

                    <button type='button' className='aaa' onClick={() => setMobileMenu(!mobileMenu)}>

                        <SVG.List />

                    </button>

                    <C.MobileList mobileMenu={mobileMenu}>

                        <div className='button-container'>
                            <button type='button' className='close-panel' onClick={() => setMobileMenu(!mobileMenu)}>

                                <SVG.X />

                            </button>
                        </div>

                        <li className={headerStyles.login}>
                            {user ? (
                                <>
                                    <button type='button'
                                        aria-labelledby={`Acessar menu da conta de ${user.name}`}
                                        className={headerStyles.user_login}
                                        data-clicked={isUserLoginPanelOpen ? 'true' : 'false'}
                                        onClick={() => setIsUserLoginPanelOpen(!isUserLoginPanelOpen)}
                                    >
                                        {user.name}
                                        <SVG.CaretDownFill />
                                    </button>
                                    {isUserLoginPanelOpen && (

                                        <div className={headerStyles.user_panel}>

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
                            <Link href='/criar-anuncio/step1'>Ajude achar meu Pet</Link>
                        </li>

                        <li>
                            <Link href='/found'>Achei um Pet</Link>
                        </li>

                        {/* <li>
                            <Link href='/como-funciona'>Como Funciona</Link>
                        </li> */}

                    </C.MobileList>

                </div>

            </nav>

        </header >
    )
}

export default Header