import Link from 'next/link'
import React from 'react'
import footerStyles from '../../styles/Layout/Footer.module.css'
import * as SVG from '../../public/imgs/svg'

function Footer() {
    return (
        <footer className={footerStyles.footer}>

            <nav>

                <div className={footerStyles.container_1}>
                    <div className={footerStyles.brand_text}>

                        <SVG.Brand />

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam placerat laoreet arcu, sed viverra dui rutrum nec.
                        </p>

                    </div>

                    <div className={footerStyles.mobile_brand_text}>

                        <SVG.Brand />

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam placerat laoreet arcu, sed viverra dui rutrum nec.
                        </p>

                    </div>

                    <div className={footerStyles.links_container}>
                        <ul className={footerStyles.links}>
                            <li>
                                <h6>APIs Usadas</h6>

                                <ul className={footerStyles.list}>
                                    <li>
                                        <Link href='https://documenter.getpostman.com/view/5578104/RWgqUxxh#intro'>The Cat API</Link>
                                    </li>

                                    <li>
                                        <Link href='https://documenter.getpostman.com/view/4016432/the-dog-api/RW81vZ4Z#intro'>The Dog API</Link>
                                    </li>

                                    <li>
                                        <Link href='https://servicodados.ibge.gov.br/api/docs/localidades'>IBGE - Localidades</Link>
                                    </li>

                                </ul>
                            </li>
                            <li>
                                <h6>Placeholder</h6>

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
                            </li>
                            <li>
                                <h6>Sobre</h6>

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
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={footerStyles.social_media}>

                    <Link href='/'><a><SVG.Facebook /></a></Link>
                    <Link href='/'><a><SVG.Instagram /></a></Link>
                    <Link href='/'><a><SVG.Twitter /></a></Link>

                </div>

            </nav>

            <small>Site Criado Para o Projeto do Segundo Semestre de 2022</small>

        </footer>
    )
}

export default Footer