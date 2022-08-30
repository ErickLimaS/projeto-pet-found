import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import headerStyles from '../styles/Header.module.css'
import * as C from '../styles/headerStyledComponents'
import MenuSvg from '../public/imgs/svg/list.svg'

function Header() {

    const [mobileMenu, setMobileMenu] = useState<Boolean>(false)

    useEffect(() => {

        setMobileMenu(false)

    }, [])

    return (
        <header className={headerStyles.header}>

            <nav>

                <div>

                    <span>logo</span>

                </div>

                <ul className={headerStyles.list}>
                    <li>
                        <Link href='/'>Home</Link>
                    </li>

                    <li>
                        <Link href='/about'>Placeholder</Link>
                    </li>

                    <li>
                        <Link href='/about'>Placeholder</Link>
                    </li>

                    <li>
                        <Link href='/about'>Placeholder</Link>
                    </li>
                </ul>

                <div className={headerStyles.login_desktop}>

                    <Link href='/login'>Login</Link>

                </div>

                <div className={headerStyles.drawer_sidebar_mobile}>

                    <button type='button' onClick={() => setMobileMenu(!mobileMenu)}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>

                    </button>

                    <C.mobileList mobileMenu={mobileMenu}>

                        <li>
                            <Link href='/login'>Login</Link>
                        </li>

                        <li>
                            <Link href='/'>Home</Link>
                        </li>

                        <li>
                            <Link href='/about'>Placeholder</Link>
                        </li>

                        <li>
                            <Link href='/about'>Placeholder</Link>
                        </li>

                        <li>
                            <Link href='/about'>Placeholder</Link>
                        </li>

                    </C.mobileList>

                </div>

            </nav>

        </header>
    )
}

export default Header