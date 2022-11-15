import Styles from '../../styles/userPage/profilePage.module.css'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Meta from '../../components/Meta'
import { RootState } from '../../store'
import Image from 'next/image'
import profile from '../../public/imgs/profile-icon.png'

const Profile: NextPage = () => {

    const [user, setUser] = useState<{ name: string, token: string }>()
    const [editable, setEditable] = useState<boolean>(false)
    const [tabIndex, setTabIndex] = useState<number>(1)

    const userState: any = useSelector((state: RootState) => state.currentUser)

    const router = useRouter()

    useEffect(() => {

        // if user is NOT logged in
        if (!userState.name && !userState.token) {

            router.push('/user/login')
            // alert('no user')

        }
        else {
            setUser(userState)

            // if user is redirect through a query, sets tab to be shown 
            if (router.query.nav) {

                setTabIndex(4)

            }
        }

    }, [router.query.nav])

    return (
        <>
            <Meta
                title='Perfil'
                description='Página de perfil do usuário, onde você poderá editar algumas das suas informações já adicionadas antes.'
            />

            <div className={Styles.container}>

                <section className={Styles.user_info_wrapper}>

                    <Image
                        src={profile}
                        alt={`${user?.name}, foto de perfil`}
                        layout='fixed'
                        height={120}
                        width={120}
                        id={Styles.profile_img}
                    />

                    <div className={Styles.user_info}>

                        {editable ? (
                            <input type='text' aria-label='Edite o nome de usuário' defaultValue={user?.name}></input>
                        ) : (
                            <h2>{user?.name}</h2>
                        )}

                        <p>endereco</p>
                        <p>endereco</p>

                    </div>

                    <button type='button' onClick={() => setEditable(!editable)}>
                        {editable ? 'Salvar Dados' : 'Editar'}
                    </button>

                    <div className={Styles.contacts_mobile_display}>

                        <h3>Contatos</h3>
                        <ul>
                            <li>email: sadas</li>
                            <li>email: sadas</li>
                            <li>email: sadas</li>
                        </ul>

                    </div>

                </section>

                <section className={Styles.user_activity}>

                    <nav className={Styles.tab_container}>
                        <button type='button'
                            data-tab-activated={tabIndex === 1 ? 'true' : 'false'}
                            onClick={() => { setTabIndex(1) }} aria-label='Ir para a sessão Posts Feitos'>
                            Posts
                        </button>
                        <button type='button'
                            data-tab-activated={tabIndex === 2 ? 'true' : 'false'}
                            onClick={() => { setTabIndex(2) }} aria-label='Ir para a sessão de pessoas ajudadas'>
                            Ajudados
                        </button>
                        <button type='button'
                            data-tab-activated={tabIndex === 3 ? 'true' : 'false'}
                            onClick={() => { setTabIndex(3) }} aria-label='Ir para a sessão meus contatos'>
                            Contatos
                        </button>
                        <button type='button'
                            data-tab-activated={tabIndex === 4 ? 'true' : 'false'}
                            onClick={() => { setTabIndex(4) }} aria-label='Ir para a sessão de mais opções'>
                            Mais
                        </button>
                    </nav>

                    <div data-tab-activated={tabIndex === 1 ? 'true' : 'false'} className={Styles.navigation_index_selected}>

                        <div className={Styles.activity_field_container}>

                            <h3>Posts Feitos</h3>

                            <div>

                                post 1

                            </div>

                        </div>

                    </div>

                    <div data-tab-activated={tabIndex === 2 ? 'true' : 'false'} className={Styles.navigation_index_selected}>

                        <div className={Styles.activity_field_container}>

                            <h3>Quem eu Ajudadei</h3>

                            <div>

                                post 1

                            </div>

                        </div>

                    </div>

                    <div data-tab-activated={tabIndex === 3 ? 'true' : 'false'} className={Styles.navigation_index_selected}>

                        <div className={Styles.activity_field_container}>

                            <h3>Meus Contatos</h3>

                            <div>

                                post 1

                            </div>

                        </div>

                    </div>

                    <div data-tab-activated={tabIndex === 4 ? 'true' : 'false'} className={Styles.navigation_index_selected}>

                        <div className={Styles.activity_field_container}>

                            <h3>Configurações da Conta</h3>

                            <div>

                                post 1

                            </div>

                        </div>

                    </div>

                </section>

            </div>
        </>
    )

}

export default Profile