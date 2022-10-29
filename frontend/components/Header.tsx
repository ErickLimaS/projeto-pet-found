import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import headerStyles from '../styles/Layout/Header.module.css'
import * as C from '../styles/Layout/headerStyledComponents'
import * as SVG from '../public/imgs/svg'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function Header() {

    const [mobileMenu, setMobileMenu] = useState<Boolean>(false)
    const [user, setUser] = useState<any>()

    const userState: any = useSelector((state: RootState) => state.currentUser)

    useEffect(() => {

        if (userState.name) {
            setUser(userState)
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
                            <Link href='/criar-anuncio/step1'>Perdi meu Pet</Link>
                        </li>

                        <li>
                            <Link href='/found'>Achei Um Pet</Link>
                        </li>

                        <li>
                            <Link href='/como-funciona'>Como Funciona</Link>
                        </li>
                    </ul>

                    <span className={headerStyles.line}></span>

                    <div className={headerStyles.login_desktop}>

                        {user ? (
                            <button type='button' aria-labelledby={`Acessar menu da conta de ${user.name}`}>
                                {user.name}
                                <SVG.CaretDownFill />
                            </button>
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
                                <button type='button' aria-labelledby={`Acessar menu da conta de ${user.name}`}>
                                    {user.name}
                                    <SVG.CaretDownFill />
                                </button>
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
                            <Link href='/criar-anuncio/step1'>Criar Anúncio</Link>
                        </li>

                        <li>
                            <Link href='/found'>Achei Um Pet</Link>
                        </li>

                        <li>
                            <Link href='/como-funciona'>Como Funciona</Link>
                        </li>

                    </C.MobileList>

                </div>

            </nav>

        </header >
    )
}

export default Header