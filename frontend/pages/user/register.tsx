import { NextPage } from 'next/types'
import React, { FormEvent } from 'react'
import Meta from '../../components/Meta'
import { registerUser } from '../api/userRoutes'
import RegisterPageStyles from '../../styles/userPage/registerPage.module.css'

const register: NextPage = () => {

    const submitForm = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const password = document.getElementById('password') as HTMLInputElement
        const confirmPassword = document.getElementById('confirm-password') as HTMLInputElement

        if (password.value !== confirmPassword.value) {
            return console.log('diffent')
        }

        const info = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            password: (document.getElementById('password') as HTMLInputElement).value,
            address: {
                state: (document.getElementById('state') as HTMLInputElement).value,
                county: (document.getElementById('county') as HTMLInputElement).value,
                street: (document.getElementById('street') as HTMLInputElement).value
            },
            contacts: {
                tel1: (document.getElementById('tel1') as HTMLInputElement).value,
                tel2: (document.getElementById('tel2') as HTMLInputElement).value,
                facebook: (document.getElementById('facebook') as HTMLInputElement).value,
                instagram: (document.getElementById('instagram') as HTMLInputElement).value
            }
        }

        registerUser(JSON.stringify(info))

    }

    return (
        <>
            <Meta title='Criar Conta' description='Crie sua conta e tenha acesso ao site por completo.' />

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
                                <input type='password' name='password' id='password' required></input>
                            </label>
                            <small>Deve conter 8 ou mais caracteres.</small>
                        </div>

                        <div>
                            <label>
                                Confirmar Senha
                                <input type='password' name='confirm-password' id='confirm-password' ></input>
                            </label>
                        </div>

                        <div className={RegisterPageStyles.later_checkbox_container}>
                            <p>Preencher agora informações de meio de contato?</p>

                            <div>
                                
                                <label>
                                    Sim
                                    <input type='radio' id='fill_later_true' name='fill_later' value='true' />
                                </label>

                                <label>
                                    Não
                                    <input type='radio' id='fill_later_false' name='fill_later' value='false' />
                                </label>

                            </div>
                            <small>Você poderá entrar nas configurações e preenchar mais tarde.</small>

                        </div>

                        <div className={RegisterPageStyles.contacts_wrapper}>
                            <div>
                                <label>
                                    Telefone 1 (opcional)
                                    <input type='tel' name='tel1' id='tel1' ></input>
                                </label>
                                <small>Preencha com um telefone para quando alguem precisar entrar em contato com você.</small>
                            </div>

                            <div>
                                <label>
                                    Telefone 2 (opcional)
                                    <input type='tel' name='tel2' id='tel2' ></input>
                                </label>
                            </div>

                            <div>
                                <label>
                                    Facebook (opcional)
                                    <input type='text' name='facebook' id='facebook' ></input>
                                </label>
                            </div>

                            <div>
                                <label>
                                    Instagram (opcional)
                                    <input type='text' name='instagram' id='instagram' placeholder='@petfound'></input>
                                </label>
                                <small>Coloque o @ do seu perfil.</small>
                            </div>
                        </div>

                        <div className={RegisterPageStyles.submit_container}>
                            <button type='submit' id='submit'>Concluir</button>
                        </div >
                    </form >

                </div>
            </div >
        </>
    )

}

export default register