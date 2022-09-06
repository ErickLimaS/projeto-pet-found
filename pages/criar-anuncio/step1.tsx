import React, { PropsWithChildren } from 'react'
import CriarAnuncio from './index'
import Animal from '../../components/criar-anuncio-page/animal'
import Step1Styles from '../../styles/cssCreatePostSteps/step1.module.css'
import { Animais } from '../api/animals'

const Step1 = () => {

    return (
        <CriarAnuncio>
            <nav className={Step1Styles.nav_options}>
                <ul>

                    {Animais.map((item: any) => (
                        <Animal info={item} key={item.name} />
                    ))}

                </ul>
            </nav>
        </CriarAnuncio>
    )
}

export default Step1