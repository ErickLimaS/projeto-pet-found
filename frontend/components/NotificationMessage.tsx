import React from 'react'
import * as C from '../styles/NotificationMessage'

function NotificationMessage({ props }: any) {

    return (
        <C.Container success={props.success}>

            <h1>
                {props.success ?
                    'Mudanças Concluídas!' :
                    'Um erro aconteceu!' + ` ${props.status !== undefined ? `(${props.status})` : ''}`}
            </h1>

            <p>
                {props.success ? 'Deu tudo certo!' : props.message}
            </p>

        </C.Container>
    )
}

export default NotificationMessage