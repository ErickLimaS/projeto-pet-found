import Link from 'next/link'
import { NextPage } from 'next/types'
import React, { FormEvent, useEffect, useState } from 'react'
import Meta from '../../components/Meta'
import LoginPageStyles from '../../styles/userPage/loginPage.module.css'
import * as SVG from '../../public/imgs/svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useRouter } from 'next/router'
import { loginUser } from '../api/userRoutes'
import PageLoading from '../../components/PageLoading'

export const Login: NextPage = () => {

    const user: any = useSelector((state: RootState) => state.currentUser)
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)
    const [loginProcess, setLoginProcess] = useState<any>(undefined)

    useEffect(() => {

        //if user is logged in, he will be redirected to home page
        if (user.name && user.token) {

            const { redirect } = router.query // redirects to page after login

            if (redirect) {

                router.push(`/${redirect}`)

            }
            else {

                router.push('/')

            }
        }

    }, [user, loginProcess])

    const submitForm = async (e: FormEvent) => {

        e.preventDefault()

        setLoading(true)

        // only gets a error message, not applied to a successful request (status 202)
        const loginRequest = await loginUser(
            {
                email: (document.getElementById('email') as HTMLInputElement).value,
                password: (document.getElementById('current-password') as HTMLInputElement).value
            }
        )

        setLoading(false)

        setLoginProcess(loginRequest)

    }

    return (
        <>

            <Meta title='Login' description='Faça o login na sua conta e tenha acesso ao site por completo.' />

            {loading && (
                <PageLoading />
            )}

            {/* if email or password doesnt match with server's, shows a error message */}
            {loginProcess && (
                <div className={LoginPageStyles.error_message_container}>

                    <h1>Erro {loginProcess.status}</h1>

                    <p>{loginProcess.message}</p>

                    <button type='button'
                        onClick={() => setLoginProcess(undefined)}
                    >
                        Vou Arrumar
                    </button>

                </div>
            )}

            <div className={LoginPageStyles.container}>

                <div className={LoginPageStyles.text}>

                    <h1>Entre na sua conta!</h1>

                    <p>Veja tudo o que aconteceu enquanto você não estava online.</p>

                </div>

                <div className={LoginPageStyles.form_container}>

                    <div className={LoginPageStyles.form_heading}>
                        Conta <SVG.Brand />
                    </div>

                    <form onSubmit={(e) => submitForm(e)}>

                        <div>
                            <label>
                                Email
                                <input
                                    type='email'
                                    name='email' id='email'
                                    placeholder='example@gmail.com'
                                    required
                                ></input>
                            </label>
                        </div>

                        <div>
                            <label>
                                Senha
                                <input
                                    type='password'
                                    name='current-password' id='current-password'
                                    placeholder='Sua senha'
                                    pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                                    title='Precisa conter letras maiúsculas, números e caracteres especiais.'
                                    required
                                ></input>
                            </label>
                        </div>

                        <div>
                            <button type='submit'>Entrar</button>
                        </div>

                    </form>

                    <Link href='/user/register'>Não tem uma conta? Clique Aqui!</Link>

                </div>

            </div>

        </>
    )

}

export default Login
