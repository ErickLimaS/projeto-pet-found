import React from 'react'
import * as C from './NotificationMessage'

interface ServerResponseTypes {

    success: boolean,
    message: string,
    status: number

}

function NotificationMessage({ props }: { props: ServerResponseTypes | any }) {

    setTimeout(() => props = null, 6000)

    return (
        <C.Container success={props.success}>

            <h1>
                {props.success ?
                    'Concluído!' :
                    'Um erro aconteceu!' + ` ${props.status !== undefined ? `(${props.status})` : ''}`}
            </h1>

            <p>
                {props.success ?
                    'Deu tudo certo!' : props.message || 'Algo deu errado! Tente novamente mais tarde.'}
            </p>

        </C.Container>
    )
}

export default NotificationMessage