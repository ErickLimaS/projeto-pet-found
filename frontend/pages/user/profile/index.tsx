import Styles from './profilePage.module.css'
import { useRouter } from 'next/router'
import { NextPage } from 'next/types'
import React, { FormEvent, useEffect, useId, useState } from 'react'
import { useSelector } from 'react-redux'
import Meta from '../../../components/Meta'
import { RootState } from '../../../store'
import Image from 'next/image'
import profile from '../../../public/imgs/profile-icon.png'
import { getAccountInfo, updateAccountData } from '../../api/userRoutes'
import * as SVG from '../../../public/imgs/svg'
import Link from 'next/link'
import NotificationMessage from '../../../components/notificationMessage'
import PageLoading from '../../../components/pageLoading'
import { convertDate } from '../../../components/convertDate'

const Profile: NextPage = () => {

    const [user, setUser] = useState<any>([])
    const [editable, setEditable] = useState<boolean>(false)
    const [editContacts, setEditContacts] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [tabIndex, setTabIndex] = useState<number>(1)
    const [responseForNotification, setResponseForNotification] = useState<{} | any>(null)

    const userState: any = useSelector((state: RootState) => state.currentUser)

    const tabId1 = useId()
    const tabId2 = useId()
    const tabId3 = useId()
    const tabId4 = useId()

    const router = useRouter()

    // submit data from form
    const submitEmailPasswordForm = async (e: FormEvent, method: string) => {

        e.preventDefault()

        const form = e.target as HTMLFormElement

        const email = form.email.value
        const newPasswordCheck1 = form.new_password_1.value
        const newPasswordCheck2 = form.new_password_2.value
        const currentPassword = form.current_password.value

        if (newPasswordCheck1 !== newPasswordCheck2) {


            // erases notification data after 5.5 seconds
            setTimeout(() => { setResponseForNotification(null) }, 5500)

            // sets what the server responded to be notified on screen
            return setResponseForNotification(
                {
                    success: false,
                    message: 'As Senhas não são iguais. Tente novamente.'
                }
            )

        }

        const result = await updateAccountData(method, {
            email: email,
            newPassword: newPasswordCheck1,
            currentPassword: currentPassword
        })

        // sets what the server responded to be notified on screen
        setResponseForNotification(result)

        // erases notification data after 5.5 seconds
        setTimeout(() => { setResponseForNotification(null) }, 5500)

    }

    // submits all data about name, address and contact info
    const submitNameAddressContacts = async (e: FormEvent, method: string) => {

        e.preventDefault()

        const form = e.target as HTMLFormElement

        switch (method) {
            case 'NAME_AND_ADDRESS':

                const firstName: string | undefined = (form.first_name as any).value || undefined
                const surname: string | undefined = (form.surname as any).value || undefined
                const street: string | undefined = form.street.value || undefined
                const county: string | undefined = form.county.value || undefined
                const state: string | undefined = form.state.value || undefined
                const password: string = form.current_password.value

                if (firstName && !street && !county && !state) {
                    const result = await updateAccountData(
                        'CHANGE_NAME',
                        {
                            newPassword: password,
                            firstName: firstName,
                            surname: surname

                        }
                    )

                    // sets what the server responded to be notified on screen
                    setResponseForNotification(result)

                }
                else if (firstName && street && county && state) {
                    const result = await updateAccountData(
                        'CHANGE_NAME_AND_ADDRESS',
                        {
                            firstName: firstName,
                            surname: surname,
                            street: street,
                            county: county,
                            state: state,
                            currentPassword: password
                        }
                    )

                    // sets what the server responded to be notified on screen
                    setResponseForNotification(result)

                }
                else {
                    const result = await updateAccountData(
                        'CHANGE_ADDRESS',
                        {
                            newPassword: password,
                            street: street,
                            county: county,
                            state: state
                        }
                    )

                    // sets what the server responded to be notified on screen
                    setResponseForNotification(result)

                }

                break;

            case 'CONTACTS':

                const tel1: object | undefined = { ddd: form.tel1.value.slice(0, 2), tel: form.tel1.value.slice(3) } || undefined
                const tel2: object | undefined = { ddd: form.tel2.value.slice(0, 2), tel: form.tel2.value.slice(3) } || undefined
                const facebook: string | undefined = form.facebook.value || undefined
                const instagram: string | undefined = form.instagram.value || undefined

                const result = await updateAccountData(
                    'CHANGE_CONTACTS',
                    {
                        tel1:tel1,
                        tel2:tel2,
                        facebook:facebook,
                        instagram:instagram
                    }
                )

                // sets what the server responded to be notified on screen
                setResponseForNotification(result)

        }

        // erases notification data after 5.5 seconds
        setTimeout(() => { setResponseForNotification(null) }, 5500)

        // Close edit form
        setEditable(false)
        setEditContacts(false)
    }

    useEffect(() => {

        // if user is NOT logged in
        if (!userState.name && !userState.token) {

            router.push('/user/login?redirect=user/profile')

        }
        else {

            // gets user info from server
            (async function allAccountInfo() {

                setLoading(true)

                const res = await getAccountInfo()

                setUser(userState)

                if (res.data.success) {

                    setUser(res.data.user)

                }
                else {
                    alert('Erro')
                }

                setLoading(false)
            }())

        }

    }, [router.query.nav, userState])

    return (
        <>
            <Meta
                title='Perfil'
                description='Página de perfil do usuário, onde você poderá editar algumas das suas informações já adicionadas antes.'
            />

            {/* SHOWS NOTIFICATION WITH THE RESULT AFTER A FORM IS SENT */}
            {responseForNotification && (
                <NotificationMessage props={responseForNotification} />
            )}

            {loading && (
                <PageLoading />
            )}

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
                                onSubmit={(e) => submitNameAddressContacts(e, 'NAME_AND_ADDRESS')}
                            >

                                <input type='text'
                                    id='name' name='first_name'
                                    placeholder='Seu Nome'
                                    aria-label='Edite o primeiro nome de usuário' defaultValue={user?.firstName}>

                                </input>

                                <input type='text'
                                    id='name' name='surname'
                                    placeholder='Seu Nome'
                                    aria-label='Edite o sobrenome de usuário' defaultValue={user?.surname}>

                                </input>

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
                                    Salvar Mudanças
                                </button>

                                <button type='button' id='no_changes' style={{ display: 'none' }}
                                    onClick={() => setEditable(!editable)}>
                                    Voltar sem modificar
                                </button>

                            </form>
                        ) : (
                            <>
                                <h2>{user?.firstName} {user?.surname}</h2>

                                <p>{user.address?.street}</p>
                                <p><b>{user.address?.county}, {user.address?.state}</b></p>
                            </>
                        )}

                    </div>

                    {editable ? (
                        <>

                            <label role='button' htmlFor='submit' className={Styles.button}>
                                Salvar Mudanças
                            </label>

                            <label role='button' htmlFor='no_changes' className={Styles.button_label_no_changes}>
                                Voltar sem modificar
                            </label>

                        </>
                    ) : (
                        <button type='button'
                            form='user_info_form'
                            className={Styles.edit_button}
                            onClick={() => setEditable(!editable)}>
                            Editar
                        </button>
                    )}

                    <div className={Styles.contacts_mobile_display}>

                        <div className={Styles.heading}>
                            <h3>Contatos</h3>
                            {!editContacts ? (
                                <button type='button' data-action='edit' onClick={() => setEditContacts(true)}>Editar</button>
                            ) : (
                                <button type='button' data-action='cancel' onClick={() => setEditContacts(false)}>Cancelar</button>
                            )}
                        </div>

                        {!editContacts ? (
                            <ul>
                                <li>
                                    <SVG.Telephone fill='#FD9600' aria-label='Primeiro número de Telefone' />
                                    {user?.contacts?.tel1 ? (
                                        `${user?.contacts?.tel1.ddd} ${user?.contacts?.tel1.tel}`
                                    ) : (
                                        <p>Não Adicionado</p>
                                    )}
                                </li>
                                <li>
                                    <SVG.Telephone fill='#FD9600' aria-label='Segundo número de Telefone' />
                                    {user?.contacts?.tel2 ? (
                                        `${user?.contacts?.tel2.ddd} ${user?.contacts?.tel2.tel}`
                                    ) : (
                                        <p>Não Adicionado</p>
                                    )}
                                </li>
                                <li>
                                    <SVG.Facebook fill='#4267B2' aria-label='Link do perfil do facebook' />
                                    {user?.contacts?.facebook ? (
                                        <a href={user?.contacts?.facebook} target='_blank' rel='noreferrer'>Meu Perfil</a>
                                    ) : (
                                        <p>Não Adicionado</p>
                                    )}
                                </li>
                                <li>
                                    <SVG.Instagram fill='#E1306C' aria-label='Link do perfil do instagram' />
                                    {user?.contacts?.instagram ? (
                                        <a href={`https://www.instagram.com/${user?.contacts?.instagram.slice(1)}`} target='_blank' rel='noreferrer'>{user?.contacts?.instagram}</a>
                                    ) : (
                                        <p>Não Adicionado</p>
                                    )}
                                </li>
                            </ul>
                        ) : (
                            <form onSubmit={(e) => submitNameAddressContacts(e, 'CONTACTS')}>
                                <label>
                                    <div className={Styles.heading}>
                                        <SVG.Telephone fill='#FD9600' aria-label='Primeiro número de Telefone' />
                                        Telefone 1
                                    </div>
                                    <input type='tel' id='tel1' name='tel1'
                                        pattern='^\d.{10,11}$'
                                        placeholder='Seu número'
                                        defaultValue={`${user?.contacts?.tel1.ddd}${user?.contacts?.tel1.tel}`}></input>
                                </label>

                                <label>
                                    <div className={Styles.heading}>
                                        <SVG.Telephone fill='#FD9600' aria-label='Segundo número de Telefone' />
                                        Telefone 2
                                    </div>
                                    <input type='tel' id='tel2' name='tel2'
                                        pattern='^\d.{10,11}$'
                                        placeholder='Seu outro número'
                                        defaultValue={`${user?.contacts?.tel2.ddd}${user?.contacts?.tel2.tel}`}></input>
                                </label>
                                <label>
                                    <div className={Styles.heading}>
                                        <SVG.Facebook fill='#4267B2' aria-label='Link do perfil do facebook' />
                                        Facebook
                                    </div>
                                    <input type='text' id='facebook' name='facebook'
                                        placeholder='Copie e cole aqui o link do seu perfil'
                                        pattern='(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)'
                                        title='Verifique se está nesse formato: https://pt-br.facebook.com/seu-nome-de-usuario'
                                        defaultValue={user?.contacts?.facebook}></input>
                                </label>
                                <label>
                                    <div className={Styles.heading}>
                                        <SVG.Instagram fill='#E1306C' aria-label='Link do perfil do instagram' />
                                        Instagram
                                    </div>
                                    <input type='text' id='instagram' name='instagram'
                                        placeholder='Coloque o @ do seu perfil'
                                        pattern='^@[a-zA-Z_](?!.*?\.{2})[\w.]{1,28}[\w]$'
                                        title='Verifique se está nesse formato: @petfound'
                                        defaultValue={user?.contacts?.instagram}></input>
                                </label>

                                <button type='submit' id='submit_contacts' >
                                    Salvar Mudanças
                                </button>
                            </form>
                        )}

                    </div>

                </section>

                <section className={Styles.user_activity}>

                    <nav className={Styles.tab_container} role='tablist'>
                        <button type='button'
                            role='tab'
                            data-tab='1'
                            aria-selected={tabIndex === 1 ? 'true' : 'false'}
                            aria-controls={tabId1}
                            data-tab-activated={tabIndex === 1 ? 'true' : 'false'}
                            onClick={() => { setTabIndex(1) }} aria-label='Ir para a sessão 
                            Posts Feitos'
                        >
                            Posts
                        </button>
                        <button type='button'
                            role='tab'
                            data-tab='2'
                            aria-selected={tabIndex === 2 ? 'true' : 'false'}
                            aria-controls={tabId2}
                            data-tab-activated={tabIndex === 2 ? 'true' : 'false'}
                            onClick={() => { setTabIndex(2) }} aria-label='Ir para a sessão de pessoas ajudadas'>
                            Ajudados
                        </button>
                        <button type='button'
                            role='tab'
                            data-tab='3'
                            aria-selected={tabIndex === 3 ? 'true' : 'false'}
                            aria-controls={tabId3}
                            data-tab-activated={tabIndex === 3 ? 'true' : 'false'}
                            onClick={() => { setTabIndex(3) }} aria-label='Ir para a sessão de mais opções'>
                            Mais
                        </button>
                        <button type='button'
                            role='tab'
                            data-tab='4'
                            aria-selected={tabIndex === 4 ? 'true' : 'false'}
                            aria-controls={tabId4}
                            data-tab-activated={tabIndex === 4 ? 'true' : 'false'}
                            onClick={() => { setTabIndex(4) }} aria-label='Ir para a sessão de meus contatos'>
                            Contatos
                        </button>
                    </nav>

                    <div
                        role='tabpanel'
                        className={Styles.navigation_index_selected}
                        id={tabId1}
                        data-expanded={tabIndex === 1 ? 'true' : 'false'}
                    >

                        <div className={Styles.activity_field_container}>

                            <h3>Posts sobre Meus Pets</h3>

                            {user?.petsRegistered?.length > 0 ? (
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
                                                                    <Link href={pet.userWhoFound._id}>
                                                                        {pet.userWhoFound.firstName}
                                                                    </Link> achou seu pet
                                                                </h4>

                                                                <p>
                                                                    {pet.userWhoFound.rewardAccepted ?
                                                                        `Aceitou a Recomensa` :
                                                                        'Não Aceitou a recompensa'
                                                                    }
                                                                </p>
                                                                <p>
                                                                    Achou em {convertDate(pet.dateWhenFound)}
                                                                </p>

                                                            </div>

                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className={Styles.custom_border}></span>

                                                            <div className={Styles.pet_found_by}>

                                                                <h4>
                                                                    Ainda não encontrado
                                                                </h4>

                                                                <p>
                                                                    Criado em {convertDate(pet.createdAt)}
                                                                </p>

                                                            </div>

                                                        </>
                                                    )}

                                                </a>
                                            </Link>
                                        </li>

                                    ))}

                                </ul>
                            ) : (

                                <p>Nenhum post feito.</p>

                            )}

                        </div>

                    </div>

                    <div
                        role='tabpanel'
                        className={Styles.navigation_index_selected}
                        id={tabId2}
                        data-expanded={tabIndex === 2 ? 'true' : 'false'}
                    >

                        <div className={Styles.activity_field_container}>

                            <h3>Quem eu Ajudei</h3>

                            {user?.petsFound?.length > 0 ? (
                                <ul className={Styles.list_lost_pets}>

                                    {user?.petsFound?.map((pet: any, key: any) => (

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
                                                            <Link href={`${pet.userWhoFound._id}`}>{pet.userWhoFound.firstName}</Link> achou seu pet
                                                        </h4>

                                                        {pet.hasReward ? (

                                                            <p>
                                                                {pet.userWhoFound.rewardAccepted ? `Aceitou` : 'Não aceitou'} a Recomensa
                                                            </p>

                                                        ) : (

                                                            <p>Não tem Recompensa</p>
                                                        )}

                                                        <p>Achou em {convertDate(pet.dateWhenFound)}</p>

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

                    <div
                        role='tabpanel'
                        className={`${Styles.navigation_index_selected} ${Styles.form_container}`}
                        id={tabId3}
                        data-expanded={tabIndex === 3 ? 'true' : 'false'}
                    >

                        <div className={Styles.activity_field_container}>

                            <h3>Configurações da Conta</h3>

                            <form onSubmit={(e) => submitEmailPasswordForm(e, 'EMAIL_OR_PASSWORD')}>

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

                    {/* MOBILE ONLY TAB  */}
                    <div
                        role='tabpanel'
                        className={`${Styles.navigation_index_selected} ${Styles.form_container}`}
                        id={tabId4}
                        data-expanded={tabIndex === 4 ? 'true' : 'false'}
                    >

                        <div className={Styles.activity_field_container}>

                            <div className={Styles.heading}>
                                <h3>Contatos</h3>
                                {!editContacts ? (
                                    <button type='button' data-action='edit' onClick={() => setEditContacts(true)}>Editar</button>
                                ) : (
                                    <button type='button' data-action='cancel' onClick={() => setEditContacts(false)}>Cancelar</button>
                                )}
                            </div>

                            {!editContacts ? (
                                <ul className={Styles.contacts_list}>
                                    <li>
                                        <SVG.Telephone fill='#FD9600' aria-label='Primeiro número de Telefone' />
                                        ({user?.contacts?.tel1?.ddd})
                                        {user?.contacts?.tel1?.tel.slice(0, 5)}
                                        -
                                        {user?.contacts?.tel1?.tel.slice(5)}

                                    </li>
                                    <li>
                                        <SVG.Telephone fill='#FD9600' aria-label='Segundo número de Telefone' />
                                        {user?.contacts?.tel2 ? (
                                            <>
                                                ({user?.contacts?.tel2?.ddd})
                                                {user?.contacts?.tel2?.tel.slice(0, 5)}
                                                -
                                                {user?.contacts?.tel2?.tel.slice(5)}
                                            </>
                                        ) : (
                                            <p>Não Adicionado</p>
                                        )}
                                    </li>
                                    <li>
                                        <SVG.Facebook fill='#4267B2' aria-label='Link do perfil do facebook' />
                                        {user?.contacts?.facebook ? (
                                            <a href={user?.contacts?.facebook} target='_blank' rel='noreferrer'>Meu Perfil</a>
                                        ) : (
                                            <p>Não Adicionado</p>
                                        )}
                                    </li>
                                    <li>
                                        <SVG.Instagram fill='#E1306C' aria-label='Link do perfil do instagram' />
                                        {user?.contacts?.instagram ? (
                                            <a href={`https://www.instagram.com/${user?.contacts?.instagram.slice(1)}`} target='_blank' rel='noreferrer'>{user?.contacts?.instagram}</a>
                                        ) : (
                                            <p>Não Adicionado</p>
                                        )}
                                    </li>
                                </ul>
                            ) : (
                                <form className={Styles.contacts_form} onSubmit={(e) => submitNameAddressContacts(e, 'CONTACTS')}>
                                    <label>
                                        <div className={Styles.heading}>
                                            <SVG.Telephone fill='#FD9600' aria-label='Primeiro número de Telefone' />
                                            Telefone 1
                                        </div>
                                        <input type='tel' id='tel1' name='tel1'
                                            pattern='^\d.{10,10}$'
                                            placeholder='Seu número'
                                            defaultValue={`${user?.contacts?.tel1.ddd} ${user?.contacts?.tel1.tel}`}></input>
                                    </label>

                                    <label>
                                        <div className={Styles.heading}>
                                            <SVG.Telephone fill='#FD9600' aria-label='Segundo número de Telefone' />
                                            Telefone 2
                                        </div>
                                        <input type='tel' id='tel2' name='tel2'
                                            pattern='^\d.{10,10}$'
                                            placeholder='Seu outro número'
                                            defaultValue={`${user?.contacts?.tel2.ddd} ${user?.contacts?.tel2.tel}`}></input>
                                    </label>
                                    <label>
                                        <div className={Styles.heading}>
                                            <SVG.Facebook fill='#4267B2' aria-label='Link do perfil do facebook' />
                                            Facebook
                                        </div>
                                        <input type='text' id='facebook' name='facebook'
                                            placeholder='Copie e cole aqui o link do seu perfil'
                                            pattern='(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)'
                                            title='Verifique se está nesse formato: https://pt-br.facebook.com/seu-nome-de-usuario'
                                            defaultValue={user?.contacts?.facebook}></input>
                                    </label>
                                    <label>
                                        <div className={Styles.heading}>
                                            <SVG.Instagram fill='#E1306C' aria-label='Link do perfil do instagram' />
                                            Instagram
                                        </div>
                                        <input type='text' id='instagram' name='instagram'
                                            placeholder='Coloque o @ do seu perfil'
                                            pattern='^@[a-zA-Z_](?!.*?\.{2})[\w.]{1,28}[\w]$'
                                            title='Verifique se está nesse formato: @petfound'
                                            defaultValue={user?.contacts?.instagram}></input>
                                    </label>

                                    <button type='submit' id='submit_contacts' >
                                        Salvar Mudanças
                                    </button>
                                </form>
                            )}

                        </div>

                    </div>

                </section>

            </div >
        </>
    )

}

export default Profile