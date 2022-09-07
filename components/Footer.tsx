import Link from 'next/link'
import React from 'react'
import footerStyles from '../styles/Footer.module.css'

function Footer() {
    return (
        <footer className={footerStyles.footer}>

            <nav>

                <div>
                    <h1>Sobre</h1>

                    <ul className={footerStyles.list}>
                        <li>
                            <Link href='/#about'>Sobre Nós</Link>
                        </li>

                        <li>
                            <Link href='/#our-team'>Nossa Equipe</Link>
                        </li>

                        <li>
                            <Link href='/#our-mission'>Nossa Missão</Link>
                        </li>

                        <li>
                            <Link href='/#newsletter'>Newsletter</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h1>APIs Usadas</h1>

                    <ul className={footerStyles.list}>
                        <li>
                            <Link href='https://documenter.getpostman.com/view/5578104/RWgqUxxh#intro'>The Cat API</Link>
                        </li>

                        <li>
                            <Link href='https://documenter.getpostman.com/view/4016432/the-dog-api/RW81vZ4Z#intro'>The Dog API</Link>
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