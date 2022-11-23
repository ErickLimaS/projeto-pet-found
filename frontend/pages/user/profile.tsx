import Styles from '../../styles/userPage/profilePage.module.css'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Meta from '../../components/Meta'
import { RootState } from '../../store'
import Image from 'next/image'
import profile from '../../public/imgs/profile-icon.png'
import { getAccountInfo } from '../api/userRoutes'
import * as SVG from '../../public/imgs/svg'
import Link from 'next/link'

interface userRegisterTypes {
    email: string,
    password: string,
    name: string,
    address: {
        state: string,
        county: string,
        street: string | null // null is for the optional inputs
    },
    contacts: {
        tel1: {
            ddd: string | null,
            tel: string | null
        },
        tel2: {
            ddd: string | null,
            tel: string | null
        },
        facebook: string | null,
        instagram: string | null
    }
}

const Profile: NextPage = () => {

    const [user, setUser] = useState<any>([])
    const [editable, setEditable] = useState<boolean>(false)
    const [tabIndex, setTabIndex] = useState<number>(1)

    const userState: any = useSelector((state: RootState) => state.currentUser)

    const router = useRouter()

    useEffect(() => {

        // if user is NOT logged in
        if (!userState.name && !userState.token) {

            router.push('/user/login')
            alert('no user')

        }
        else {
            // gets user info from server
            (async function allAccountInfo() {
                const res = await getAccountInfo()

                setUser(userState)

                if (res.status === 200) {

                    setUser(res.data)

                }

            }())

            // if user is redirect through a query, sets tab to be shown 
            if (router.query.nav) {

                setTabIndex(4)

            }
        }

    }, [router.query.nav, userState])

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

                        <p>{user.address?.street}</p>
                        <p><b>{user.address?.county}, {user.address?.state}</b></p>

                    </div>

                    <button type='button' onClick={() => setEditable(!editable)}>
                        {editable ? 'Salvar Dados' : 'Editar'}
                    </button>

                    <div className={Styles.contacts_mobile_display}>

                        <h3>Contatos</h3>
                        <ul>
                            {user?.contacts?.tel1 && (
                                <li>
                                    <SVG.Telephone aria-label='Primeiro número de Telefone' /> {user?.contacts?.tel1}
                                </li>
                            )}
                            {user?.contacts?.tel2 && (
                                <li>
                                    <SVG.Telephone aria-label='Segundo número de Telefone' /> {user?.contacts?.tel2}
                                </li>
                            )}
                            {user?.contacts?.facebook && (
                                <li>
                                    <SVG.Facebook aria-label='Link do perfil do facebook' />
                                    <a href={user?.contacts?.facebook}>Perfil do Facebook</a>
                                </li>
                            )}
                            {user?.contacts?.instagram && (
                                <li>
                                    <SVG.Instagram aria-label='Link do perfil do instagram' /> <a href={user?.contacts?.instagram}>Perfil do Instagram</a>
                                </li>
                            )}
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
                            onClick={() => { setTabIndex(3) }} aria-label='Ir para a sessão de mais opções'>
                            Mais
                        </button>
                    </nav>

                    <div aria-expanded={tabIndex === 1 ? 'true' : 'false'} className={Styles.navigation_index_selected}>

                        <div className={Styles.activity_field_container}>

                            <h3>Posts sobre Meus Pets</h3>

                            <ul className={Styles.list_lost_pets}>

                                {user?.petsRegistered?.map((pet: any, key: any) => (

                                    <li key={key} data-found={pet.wasFound ? 'true' : 'false'}>
                                        <Link href={`/pet?id=${pet._id}`} >
                                            <a className={Styles.link_pet_page}>
                                                <Image
                                                    src={profile}
                                                    alt={`Foto do anúncio de ${pet?.name}`}
                                                    layout='responsive'
                                                    height={160}
                                                    width={300}
                                                    className={Styles.pet_img}
                                                />

                                                <div className={Styles.pet_info}>
                                                    <h4>
                                                        {pet.name}
                                                    </h4>

                                                    <p>{pet.breed}</p>
                                                    {pet.hasReward ? (
                                                        <p className={Styles.reward_paragraph}>R$ {pet.rewardAmount},00</p>
                                                    ) : (
                                                        <p className={Styles.reward_paragraph}>Sem recompensa</p>
                                                    )}

                                                </div>

                                                {pet.wasFound ? (
                                                    <>
                                                        <span className={Styles.custom_border}></span>

                                                        <div className={Styles.pet_found_by}>

                                                            <h4>
                                                                <Link href='/'>Erick</Link> achou seu pet
                                                            </h4>

                                                            <p>Aceitou a Recomensa</p>

                                                            <p>Achou em 15/10/2022</p>

                                                        </div>

                                                    </>
                                                ) : (
                                                    <>
                                                        <span className={Styles.custom_border}></span>

                                                        <div className={Styles.pet_found_by}>

                                                            <h4>
                                                                Ainda não encontrado
                                                            </h4>

                                                            <p>Criado em 15/10/2022</p>

                                                        </div>

                                                    </>
                                                )}

                                            </a>
                                        </Link>
                                    </li>

                                ))}

                            </ul>

                        </div>

                    </div>

                    <div aria-expanded={tabIndex === 2 ? 'true' : 'false'} className={Styles.navigation_index_selected}>

                        <div className={Styles.activity_field_container}>

                            <h3>Quem eu Ajudadei</h3>

                            {user?.petsUserFound ? (
                                <ul className={Styles.list_lost_pets}>

                                    {user?.petsUserFound?.map((pet: any, key: any) => (

                                        <li key={key} data-found={pet.wasFound ? 'true' : 'false'}>
                                            <Link href={`/pet?id=${pet._id}`} >
                                                <a className={Styles.link_pet_page}>
                                                    <Image
                                                        src={profile}
                                                        alt={`Foto do anúncio de ${pet?.name}`}
                                                        layout='responsive'
                                                        height={160}
                                                        width={300}
                                                        className={Styles.pet_img}
                                                    />

                                                    <div className={Styles.pet_info}>
                                                        <h4>
                                                            {pet.name}
                                                        </h4>

                                                        <p>{pet.breed}</p>
                                                        {pet.hasReward ? (
                                                            <p className={Styles.reward_paragraph}>R$ {pet.rewardAmount},00</p>
                                                        ) : (
                                                            <p className={Styles.reward_paragraph}>Sem recompensa</p>
                                                        )}

                                                    </div>


                                                    <span className={Styles.custom_border}></span>

                                                    <div className={Styles.pet_found_by}>

                                                        <h4>
                                                            <Link href='/'>pet.userWhoFound.name</Link> achou seu pet
                                                        </h4>

                                                        {pet.hasReward ? (

                                                            <p>pet.userWhoFound.rewardAccepted a Recomensa</p>

                                                        ) : (

                                                            <p>pet.userWhoFound.rewardAccepted a Recomensa</p>
                                                        )}

                                                        <p>Achou em pet.userWhoFound.dateWhenFound</p>

                                                    </div>

                                                </a>
                                            </Link>
                                        </li>

                                    ))}

                                </ul>
                            ) : (

                                <p className={Styles.message_not_found}>Você não encontrou nenhum pet ainda.</p>

                            )}

                        </div>

                    </div>

                    <div aria-expanded={tabIndex === 3 ? 'true' : 'false'} className={Styles.navigation_index_selected}>

                        <div className={Styles.activity_field_container}>

                            <h3>Configurações da Conta</h3>

                            <ul className={Styles.list_lost_pets}>

                                <li>post</li>

                            </ul>

                        </div>

                    </div>

                </section>

            </div >
        </>
    )

}

export default Profile