import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import headerStyles from '../styles/Layout/Header.module.css'
import * as C from '../styles/Layout/headerStyledComponents'
import * as SVG from '../public/imgs/svg'

function Header() {

    const [mobileMenu, setMobileMenu] = useState<Boolean>(false)

    useEffect(() => {

        setMobileMenu(false)

    }, [])

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

                        <Link href='/login'>
                            <a>
                                <SVG.ProfilePerson />
                                Login
                            </a>
                        </Link>

                    </div>

                </div>

                <div className={headerStyles.drawer_sidebar_mobile}>

                    <button type='button' onClick={() => setMobileMenu(!mobileMenu)}>

                        <SVG.List />

                    </button>

                    <C.MobileList mobileMenu={mobileMenu}>

                        <div>
                            <button type='button' onClick={() => setMobileMenu(!mobileMenu)}>

                                <SVG.X />

                            </button>
                        </div>

                        <li>
                            <Link href='/login'>
                                <span className={headerStyles.login}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                    {' '}Login
                                </span>
                            </Link>
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

        </header>
    )
}

export default Header