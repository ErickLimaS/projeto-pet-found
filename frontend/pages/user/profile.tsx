import Styles from '../../styles/userPage/profilePage.module.css'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Meta from '../../components/Meta'
import { RootState } from '../../store'
import Image from 'next/image'
import profile from '../../public/imgs/profile-icon.png'
import { getAccountInfo, updateAccountData } from '../api/userRoutes'
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

    // submit data from form
    const submitChangesForm = async (e: FormEvent, method: string) => {

        e.preventDefault()

        const form = e.target as HTMLFormElement

        const email = form.email.value
        const newPasswordCheck1 = form.new_password_1.value
        const newPasswordCheck2 = form.new_password_2.value
        const currentPassword = form.current_password.value

        if (newPasswordCheck1 !== newPasswordCheck2) {

            return alert('dont match')

        }

        updateAccountData(method, email, newPasswordCheck1, currentPassword)

    }

    const submitNameAndAddressChanges = async (e: FormEvent) => {

        e.preventDefault()

        const form = e.target as HTMLFormElement

        const name: string | undefined = (form.name as any).value || undefined
        const street: string | undefined = form.street.value || undefined
        const county: string | undefined = form.county.value || undefined
        const state: string | undefined = form.state.value || undefined
        const password: string = form.current_password.value

        // console.log(name, street, county, state)

        if (name && !street && !county && !state) {
            updateAccountData(
                'CHANGE_NAME',
                undefined, // not sent by this function 
                undefined, // not sent by this function 
                password, // current password
                name, undefined, undefined, undefined
            )
        }
        else if (name && street && county && state) {
            updateAccountData(
                'CHANGE_NAME_AND_ADDRESS',
                undefined, // not sent by this function 
                undefined, // not sent by this function 
                password, // current password
                name, street, county, state
            )
        }
        else {
            updateAccountData(
                'CHANGE_ADDRESS',
                undefined, // not sent by this function 
                undefined, // not sent by this function 
                password, // current password
                undefined, street, county, state
            )
        }

        setEditable(!editable)
    }

    useEffect(() => {

        // if user is NOT logged in
        if (!userState.name && !userState.token) {

            router.push('/user/login?redirect=user/profile')

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
                            <form
                                id='user_info_form'
                                onSubmit={(e) => submitNameAndAddressChanges(e)}
                            >

                                <input type='text'
                                    id='name' name='name'
                                    placeholder='Seu Nome'
                                    aria-label='Edite o nome de usuário' defaultValue={user?.name}></input>

                                <div className={Styles.user_address_inputs}>
                                    <input type='text'
                                        id='street' name='street'
                                        placeholder='Rua onde mora'
                                        defaultValue={user.address?.street}></input>
                                    <div>
                                        <input type='text'
                                            id='county' name='county'
                                            placeholder='Município'
                                            defaultValue={user.address?.county}></input>
                                        <input type='text'
                                            id='state' name='state'
                                            placeholder='Estado'
                                            defaultValue={user.address?.state}></input>
                                    </div>
                                    <input type='password'
                                        id='current_password2' name='current_password'
                                        required
                                        pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                                        title='Precisa conter letras maiúsculas, números e caracteres especiais.'
                                        placeholder='Confirme com sua senha'
                                    ></input>
                                </div>

                                <button type='submit' id='submit' style={{ display: 'none' }}>
                                    Salvar Dados
                                </button>

                            </form>
                        ) : (
                            <>
                                <h2>{user?.name}</h2>

                                <p>{user.address?.street}</p>
                                <p><b>{user.address?.county}, {user.address?.state}</b></p>
                            </>
                        )}

                    </div>


                    {editable ? (
                        <label htmlFor='submit' className={Styles.button_label}>
                            Salvar Dados
                        </label>
                    ) : (
                        <button type='button'
                            form='user_info_form'
                            onClick={() => setEditable(!editable)}>
                            Editar
                        </button>
                    )}

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

                            <h3>Quem eu Ajudei</h3>

                            {user?.petsUserFound?.length > 0 ? (
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

                    <div aria-expanded={tabIndex === 3 ? 'true' : 'false'} className={`${Styles.navigation_index_selected} ${Styles.form_container}`}>

                        <div className={Styles.activity_field_container}>

                            <h3>Configurações da Conta</h3>

                            <form onSubmit={(e) => submitChangesForm(e, 'EMAIL_OR_PASSWORD')}>

                                <div className={Styles.input_wrapper}>

                                    <label>
                                        Mudar Email
                                        <input type='email' id='email' name='email' placeholder={`${user?.email?.slice(0, 5)}*********.com`}></input>
                                    </label>

                                </div>

                                <div className={Styles.input_wrapper}>

                                    <label>
                                        Mudar Senha
                                        <input type='password'
                                            id='new_password_1' name='new_password_1'
                                            placeholder='*********'
                                            pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                                            title='Precisa conter letras maiúsculas, números e caracteres especiais.'
                                        ></input>
                                    </label>

                                </div>

                                <div className={Styles.input_wrapper}>

                                    <label>
                                        Repita a Nova Senha
                                        <input type='password'
                                            id='new_password_2' name='new-password_2'
                                            placeholder='*********'
                                            pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                                            title='Precisa conter letras maiúsculas, números e caracteres especiais.'
                                        ></input>
                                    </label>

                                </div>

                                <div className={Styles.input_wrapper}>

                                    <label>
                                        Confirme as mudanças com sua senha atual
                                        <input type='password'
                                            required id='current_password' name='current_password'
                                            placeholder='*********'
                                            pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                                            title='Precisa conter letras maiúsculas, números e caracteres especiais.'
                                        ></input>
                                    </label>

                                </div>

                                <button type='submit' aria-label='Confirmar Mudança'>
                                    <SVG.CheckLg aria-label='Check Ícone' />
                                    Confimar Mudanças
                                </button>

                            </form>

                        </div>

                    </div>

                </section>

            </div >
        </>
    )

}

export default Profile