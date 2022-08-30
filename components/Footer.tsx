import Link from 'next/link'
import React from 'react'
import footerStyles from '../styles/Footer.module.css'

function Footer() {
    return (
        <footer className={footerStyles.footer}>

            <nav>

                <div>
                    <h1>Placeholder</h1>

                    <ul className={footerStyles.list}>
                        <li>
                            <Link href='/'>Placeholder</Link>
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

                        <li>
                            <Link href='/about'>Placeholder</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1>Placeholder</h1>

                    <ul className={footerStyles.list}>
                        <li>
                            <Link href='/'>Placeholder</Link>
                        </li>

                        <li>
                            <Link href='/about'>Placeholder</Link>
                        </li>

                    </ul>
                </div>

                <div>
                    <h1>Placeholder</h1>
                    
                    <ul className={footerStyles.list}>
                        <li>
                            <Link href='/'>Placeholder</Link>
                        </li>

                        <li>
                            <Link href='/about'>Placeholder</Link>
                        </li>
                        
                        <li>
                            <Link href='/about'>Placeholder</Link>
                        </li>

                    </ul>
                </div>

            </nav>

            <small>Site Criado Para o Projeto do Segundo Semestre de 2022</small>

        </footer>
    )
}

export default Footer