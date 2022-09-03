import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Meta from '../../components/Meta'
import StepsCreatePost from '../../components/StepsCreatePost'
import LostPageStyles from '../../styles/Index_perdi_meu_pet.module.css'

const CriarAnuncio: NextPage = () => {

    return (
        <div className={LostPageStyles.page_content}>

            <Meta title='Criar Anúncio' />

            <div className={LostPageStyles.heading_and_creating_post_progress}>

                <h1>Criar Anúncio</h1>

                {/* Show Which Step User is Currently On, changes as user progress with the post creation */}
                <StepsCreatePost />

            </div>

            <div className={LostPageStyles.pet_posters}>

                <nav>
                    <ul>

                        <li>

                            <Link href='/' >
                                <Image src='/imgs/lost-pets/lost-cat.jpg' alt='Gato em Cartaz de Desaparecido' width={260} height={260} layout='intrinsic' />
                            </Link>

                            <Link href='/' >
                                <h2>Anúncio para Gato Perdido</h2>
                            </Link>
                            
                        </li>

                        <li>

                            <Link href='/' >
                                <Image src='/imgs/lost-pets/lost-dog.jpg' alt='Cachorro em Cartaz de Desaparecido' width={260} height={260} layout='intrinsic' />
                            </Link>

                            <Link href='/' >
                                <h2>Anúncio para Cachorro Perdido</h2>
                            </Link>

                        </li>

                        <li>

                            <Link href='/' >
                                <Image src='/imgs/lost-pets/lost-template.jpg' alt='Template de Anúncio de animal desaparecido.' width={260} height={260} layout='intrinsic' />
                            </Link>

                            <Link href='/' >
                                <h2>Anúncio para Outro Animal Perdido</h2>
                            </Link>

                        </li>

                    </ul>
                </nav>

            </div>

        </div>
    )
}

export default CriarAnuncio