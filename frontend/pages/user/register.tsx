import { NextPage } from 'next/types'
import React, { FormEvent, useEffect, useState } from 'react'
import Meta from '../../components/Meta'
import { registerUser } from '../api/userRoutes'
import RegisterPageStyles from '../../styles/userPage/registerPage.module.css'
import { RootState, store } from '../../store'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Register: NextPage = () => {

    const [loading, setLoading] = useState<Boolean>(false)
    const [addContactsChecked, setAddContactsChecked] = useState<Boolean>(true)

    const router = useRouter()

    const user: any = useSelector((state: RootState) => state.currentUser)

    useEffect(() => {

        // if user name is already stored, returns to home
        if (user.name != null && user.token != null) {

            router.push('/')

        }

        // if successful, returns to home 
        if (user.success === true) {

            setLoading(false)
            setTimeout(() => router.push('/'), 4000)

        }

    }, [loading, user, addContactsChecked])


    // if value is true, shows the form section of contacts
    const setAddContactInfo = (value: boolean) => {

        setAddContactsChecked(value)

    }

    const submitForm = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        setLoading(true)

        const password = document.getElementById('password') as HTMLInputElement
        const confirmPassword = document.getElementById('confirm-password') as HTMLInputElement

        if (password.value !== confirmPassword.value) {
            return console.log('diffent')
        }

        const formValues = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            password: (document.getElementById('password') as HTMLInputElement).value,
            address: {
                state: (document.getElementById('state') as HTMLInputElement).value,
                county: (document.getElementById('county') as HTMLInputElement).value,
                street: (document.getElementById('street') as HTMLInputElement).value
            },
            contacts: {
                tel1: {
                    ddd: (document.getElementById('ddd-tel1') as HTMLInputElement).value,
                    tel: (document.getElementById('tel1') as HTMLInputElement).value
                },
                tel2: {
                    ddd: (document.getElementById('ddd-tel2') as HTMLInputElement).value,
                    tel: (document.getElementById('tel2') as HTMLInputElement).value
                },
                facebook: (document.getElementById('facebook') as HTMLInputElement).value,
                instagram: (document.getElementById('instagram') as HTMLInputElement).value
            }
        }

        registerUser(formValues)

    }

    return (
        <>
            <Meta title='Criar Conta' description='Crie sua conta e tenha acesso ao site por completo.' />

            {loading && (
                <div data-active={loading ? "true" : "false"} className={RegisterPageStyles.loading_container}>
                    <p>loading...</p>
                </div>)
            }

            {user?.success === true && (

                <div data-active={user?.success === true ? "true" : "false"} className={RegisterPageStyles.warning_absolute}>

                    <h1>Conta Criada!</h1>

                    <p>Voltar para a página inicial?</p>

                    <Link href='/' >Voltar</Link>

                </div>

            )}

            <div className={RegisterPageStyles.container}>

                <div className={RegisterPageStyles.heading_text}>

                    <h1>Criar Conta</h1>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et mollis erat. Phasellus est sapien, porta sed efficitur pretium, molestie quis nisi.
                    </p>

                    <p className={RegisterPageStyles.align_left}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et mollis erat:
                    </p>

                    <ul className={RegisterPageStyles.align_left}>
                        <li>das</li>
                        <li>dsa</li>
                        <li>dsa</li>
                        <li>dsa</li>
                    </ul>

                    <Link href='/user/login'>Já tem uma conta? Faça o login aqui!</Link>

                </div>

                <div className={RegisterPageStyles.form_container}>

                    <form onSubmit={(e) => submitForm(e)}>

                        <div>
                            <label>
                                Seu nome
                                <input type='text' name='name' id='name' required></input>
                            </label>
                        </div>

                        <div className={RegisterPageStyles.address_wrapper}>

                            <label>
                                Estado onde vive
                                <input type='text' name='state' id='state' required></input>
                            </label>

                            <label>
                                Cidade ou Município
                                <input type='text' name='county' id='county' required></input>
                            </label>

                            <label>
                                Rua (Opcional)
                                <input type='text' name='street' id='street'></input>
                            </label>

                        </div>

                        <div>
                            <label>
                                Email
                                <input type='email' name='email' id='email' required></input>
                            </label>
                        </div>

                        <div>
                            <label>
                                Senha
                                <input type='password'
                                    name='password' id='password'
                                    required
                                    pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                                    title='Precisa conter letras maiúsculas, números (0-9) e caracteres especiais (@, !, $, etc.).'
                                ></input>
                            </label>
                            <small>Deve conter 8 ou mais caracteres.</small>
                        </div>

                        <div>
                            <label>
                                Confirmar Senha
                                <input type='password'
                                    name='confirm-password' id='confirm-password'
                                    pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                                    title='Precisa conter letras maiúsculas, números e caracteres especiais.'
                                ></input>
                            </label>
                        </div>

                        <div className={RegisterPageStyles.later_checkbox_container}>
                            <p>Preencher agora informações sobre meios de contato?</p>

                            <div>

                                <label>
                                    Sim
                                    <input type='radio'
                                        id='fill_later_true' name='fill_later'
                                        value='true'
                                        onClick={() => setAddContactInfo(true)}
                                        defaultChecked />
                                </label>

                                <label>
                                    Não
                                    <input type='radio'
                                        id='fill_later_false' name='fill_later'
                                        onClick={() => setAddContactInfo(false)}
                                        value='false' />
                                </label>

                            </div>
                            <small>Você poderá entrar nas configurações e preenchar mais tarde.</small>

                        </div>

                        {/* if above radio checked true, shows below div */}
                        {addContactsChecked && (

                            <div className={RegisterPageStyles.contacts_wrapper}>

                                <div className={RegisterPageStyles.row}>
                                    <div>
                                        <label>
                                            DDD - Telefone 1 <small>opcinal</small>
                                            <input type='text' name='ddd-tel1' id='ddd-tel1'
                                                pattern='^\d.{1}$'
                                            ></input>
                                        </label>
                                        <small>DDD do número sem o zero.</small>
                                    </div>
                                    <div>
                                        <label>
                                            Telefone 1 <small>opcinal</small>
                                            <input type='text' name='tel1' id='tel1'
                                                pattern='^\d.{7,8}$'
                                            ></input>
                                        </label>
                                        <small>Apenas números, sem o DDD.</small>
                                    </div>
                                </div>


                                <div className={RegisterPageStyles.row}>
                                    <div>
                                        <label>
                                            DDD - Telefone 2 <small>opcinal</small>
                                            <input type='tel' name='ddd-tel2' id='ddd-tel2'
                                                pattern='^\d.{1}$'
                                            ></input>
                                        </label>
                                        <small>DDD do número sem o zero.</small>
                                    </div>
                                    <div>
                                        <label>
                                            Telefone 2 <small>opcinal</small>
                                            <input type='tel' name='tel2' id='tel2'
                                                pattern='^\d.{7,8}$'
                                            ></input>
                                        </label>
                                        <small>Apenas números, sem o DDD.</small>
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        Facebook <small>opcinal</small>
                                        <input type='text' name='facebook' id='facebook'
                                            placeholder='Ex: https://pt-br.facebook.com/zuck/'
                                            pattern='(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)'
                                            title='Verifique se está nesse formato: https://pt-br.facebook.com/seu-nome-de-usuario'
                                        ></input>
                                    </label>
                                    <small>Copie e cole o link do seu perfil acima.</small>
                                </div>

                                <div>
                                    <label>
                                        Instagram <small>opcinal</small>
                                        <input type='text' name='instagram' id='instagram' placeholder='Ex: @petfound'
                                            pattern='^@[a-zA-Z_](?!.*?\.{2})[\w.]{1,28}[\w]$'
                                            title='Verifique se está nesse formato: @petfound'
                                        ></input>
                                    </label>
                                    <small>Coloque o @ do seu perfil.</small>
                                </div>
                            </div>

                        )}

                        <div className={RegisterPageStyles.submit_container}>
                            <button type='submit' id='submit'>Concluir</button>
                        </div >

                    </form >

                </div>
            </div >
        </>
    )

}

export default Register