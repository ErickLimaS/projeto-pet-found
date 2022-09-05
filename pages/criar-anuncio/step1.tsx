import React from 'react'
import Animal from '../../components/criar-anuncio-page/animal'
import Step1Styles from '../../styles/cssCreatePostSteps/step1.module.css'
import { Animais } from '../api/animals'

function Step1() {

    return (
        <nav className={Step1Styles.nav_options}>
            <ul>

                {Animais.map((item: any) => (
                    <Animal info={item} key={item.name}/>
                ))}

            </ul>
        </nav>
    )
}

export default Step1