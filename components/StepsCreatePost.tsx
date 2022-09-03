import React from 'react'
import * as C from '../styles/StepsCreatePost'

function StepsCreatePost() {

    // REDUX - PASSING WHICH STEP USER IS ON 

    return (

        <C.Container>

            <ol>

                <li id='step1'>1 - Escolher o Pet</li>
                <li id='step1'>2 - Características do Pet</li>
                <li id='step1'>3 - Informações do Dono</li>

            </ol>

        </C.Container>

    )
}

export default StepsCreatePost