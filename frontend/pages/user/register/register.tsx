import { NextPage } from 'next/types'
import React, { FormEvent, useEffect, useState } from 'react'
import Meta from '../../../components/Meta'
import { registerUser } from '../../api/userRoutes'
import RegisterPageStyles from './registerPage.module.css'
import { RootState, store } from '../../../store'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import PageLoading from '../../../components/pageLoading'
import API from '../../api/IBGE_API'

const Register: NextPage = () => {

    const [loading, setLoading] = useState<Boolean>(false)
    const [addContactsChecked, setAddContactsChecked] = useState<Boolean>(true)

    const [states, setStates] = useState<any>()
    const [counties, setCounties] = useState<any>()

    const router = useRouter()

    const user: any = useSelector((state: RootState) => state.currentUser)

    // get all brazilian states 
    const getStates = async () => {

        const res = await API.getBrazilianStates()

        setStates(res)

    }

    useEffect(() => {

        // if user name is already stored, returns to home
        if ((user.name && user.token) && router.query.redirect) {

            router.push(`/${router.query.redirect}`)

        }
        else if (user.name && user.token) {

            router.push(`/`)
            
        }
        else {
            getStates()
        }

    }, [loading, user, addContactsChecked])


    // if value is true, shows the form section of contacts
    const setAddContactInfo = (value: boolean) => {

        setAddContactsChecked(value)

    }

    const submitForm = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const form = e.target as HTMLFormElement
        setLoading(true)

        if (form.password.value !== form.confirm_password.value) {
            alert('Senhas diferentes. Tente novamente.') // fix
            setLoading(false)
            return console.log('diffent')
        }

        const formValues = {
            firstName: (form.firstName as any).value,
            surname: (form.surname as any).value,
            email: form.email.value,
            password: form.password.value,
            address: {
                state: form.state.value.slice(3),
                state_abbrev: form.state.value.slice(0, 2),
                county: form.county.value,
                street: form.street.value ? form.street.value : ''
            },
            contacts: {
                tel1: {
                    ddd: form.ddd_tel1 ? form.ddd_tel1.value : '',
                    tel: form.tel1 ? form.tel1.value : ''
                },
                tel2: {
                    ddd: form.ddd_tel2 ? form.ddd_tel2.value : '',
                    tel: form.ddd_tel2 ? form.tel2.value : ''
                },
                facebook: form.facebook ? form.facebook.value : '',
                instagram: form.instagram ? form.instagram.value : ''
            }
        }

        registerUser(formValues)

    }

    return (
        <>
            <Meta title='Criar Conta' description='Crie sua conta e tenha acesso ao site por completo.' />

            {loading && (
                <PageLoading />
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

                        <div className={RegisterPageStyles.name_wrapper}>
                            <div>
                                <label>
                                    Primeiro nome
                                    <input type='text' name='firstName' id='firstName' required></input>
                                </label>
                            </div>
                            <div>
                                <label>
                                    Sobrenome
                                    <input type='text' name='surname' id='surname' required></input>
                                </label>
                            </div>
                        </div>

                        <div className={RegisterPageStyles.address_wrapper}>

                            <label>
                                Estado onde vive
                                {states && (
                                    <select name='state' id='state' required onChange={async (e) => {

                                        const res = await API.getBrazilianMunicipies(e.target.value.slice(0, 2))

                                        setCounties(res)

                                    }}>

                                        <option value='undefined' disabled selected>
                                            Selecione um estado
                                        </option>

                                        {states.map((item: any) => (

                                            <option key={item.id} value={[item.sigla, item.nome]}>
                                                {item.nome}
                                            </option>

                                        ))}

                                    </select>
                                )}
                            </label>

                            <label>
                                Cidade ou Município
                                <select name='county' id='county' required data-state-selected={states ? 'true' : 'false'}>

                                    <option value='undefined' disabled selected>
                                        Selecione a cidade / município
                                    </option>

                                    {counties?.map((item: any) => (

                                        <option key={item.id} value={item.nome}>
                                            {item.nome}
                                        </option>

                                    ))}

                                </select>
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
                                    name='confirm_password' id='confirm_password'
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
                                            <input type='text' name='ddd_tel1' id='ddd_tel1'
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
                                            <input type='tel' name='ddd_tel2' id='ddd_tel2'
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