import { useRouter } from 'next/router'
import React from 'react'
import Styles from '../styles/RedirectToLoginPage.module.css'

function RedirectToLoginPage() {

    const router = useRouter()

    // button function to redirect to login or register page 
    const redirect = (method: string) => {

        switch (method) {
            case 'login':
                return router.push(`/user/login?redirect=${router.pathname}`)
            case 'sign_up':
                return router.push(`/user/register?redirect=${router.pathname}`)
            default:
                return

        }
    }

    return (
        <div role='alertdialog' aria-modal='true' className={Styles.container}>
            <h1>Parece que você não está logado!</h1>

            <p>Aperte o botão abaixo para entrar na sua conta ou criar uma agora.</p>

            <div className={Styles.buttons}>
                <button onClick={() => redirect('login')} className={Styles.login_button}>Fazer Login</button>
                <button onClick={() => redirect('sign_up')} className={Styles.register_button}>Criar Conta</button>
            </div>
        </div >
    )
}

export default RedirectToLoginPage