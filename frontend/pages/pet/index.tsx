import React, { FormEvent, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Styles from './PetPage.module.css'
import Meta from '../../components/Meta'
import Image from 'next/image'
import * as SVG from '../../public/imgs/svg'
import { getPetInfo, notifyOwner } from '../api/petRoutes'
import NotificationMessage from '../../components/notificationMessage'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import Link from 'next/dist/client/link'
import { convertDate } from '../../components/convertDate'

const Pet: NextPage = (info: any) => {

    console.log(info)
    const [loading, setLoading] = useState<boolean>(true)
    const [pet, setPet] = useState<any>(null)
    const [expanded, setExpanded] = useState<boolean>(false)
    const [hasCollarInput, setHasCollarInput] = useState<boolean>(true)
    const [responseForNotification, setResponseForNotification] = useState(null)

    const petImg = React.useRef<HTMLInputElement>(null)

    const userState: any = useSelector((state: RootState) => state.currentUser)

    const router = useRouter()

    // sets pet's data to state
    const settingPetData = async () => {

        setLoading(true)

        setPet(info.chosePet)

        setLoading(false)

    }

    const submitPetFoundForm = async (e: FormEvent) => {

        e.preventDefault()

        const form = e.target as HTMLFormElement;

        const data = {
            pet: {
                _id: `${router.query.id}`,
                name: `${pet.name}`,
                type: `${pet.type}`
            },
            moreInfo: {
                // petImg: form.petImg.value,
                hasCollar: form.hasCollar.value,
                collarName: form.hasCollar.value == 'true' ? form.collarName.value : null,
                foundAddress: form.hasCollar.value
            }
        }

        const res = await notifyOwner(data);

        setResponseForNotification(res)

        setExpanded(false)

        setTimeout(() => {
            setResponseForNotification(null)
        }, 6000)

    }

    useEffect(() => {

        settingPetData()

    }, [])

    return (
        <>
            <Meta
                title={loading === true ?
                    'Loading' : (pet != null ? `${pet.name} (${pet.typeTranslated})` : 'Not Found')}
                description={pet?.moreInfo && pet.moreInfo}
            />

            {/* SHOWS NOTIFICATION WITH THE RESULT AFTER A FORM IS SENT */}
            {responseForNotification && (
                <NotificationMessage props={responseForNotification} />
            )}

            {/* Page Error Message */}
            {info.status == 500 && (

                <div role='alertdialog' id={Styles.not_found_error_message}>

                    <h1><span aria-label={`Código de Erro ${info.status}.`}>({info.status})</span> Algum erro aconteceu...</h1>

                    <p>
                        O Pet pesquisado não está disponível ou não foi propriamente cadastrado.<br />
                        Tente novamente mais tarde.
                    </p>

                    <small>{info.message}</small>

                    <Link href='/found'>Voltar para Procurar Pelos Anúncios</Link>

                </div>

            )}

            <div
                data-error-fetching-data={info.status == 500 ? true : false}
                className={Styles.container}
                data-panel-expanded={expanded ? 'true' : 'false'}
            >

                <section id={Styles["first-content"]}>

                    <div className={Styles.img_container}>

                        <button type='button' aria-label='Foto Anterior'>
                            <SVG.ChevronLeft />
                        </button>

                        <Image
                            src={pet?.img}
                            alt={pet?.name}
                            width={720} height={405}
                            layout='intrinsic'
                        />

                        <button type='button' aria-label='Proxima Foto'>
                            <SVG.ChevronRight />
                        </button>

                    </div>

                    <div className={Styles.pet_info}>

                        <div className={Styles.name_genre}>
                            <h1>{pet?.name}</h1>

                            {pet?.genre == 'male' ?
                                <SVG.MaleSymbol title='Macho' alt='Sexo Masculino' fill='rgb(107, 107, 255)' style={{ width: '30px' }} />
                                :
                                <SVG.FemaleSymbol title='Fêmea' alt='Sexo Feminino' fill='rgb(255, 146, 164)' style={{ width: '30px' }} />
                            }
                        </div>

                        <div className={Styles.details}>

                            <div>
                                <h2 className={Styles.heading2_color}>
                                    Informações
                                </h2>

                                <ul>

                                    <li> Espécie: <b>{pet?.breed}</b></li>
                                    <li> Idade: <b>{pet?.age} Anos</b></li>
                                    <li> Tamanho: <b>{pet?.size} cm</b></li>
                                    <li> Tem Deficiência: <b>{pet?.hasDisability ? 'Sim' : 'Não'}</b></li>
                                    {pet?.hasDisability && (
                                        <li> Qual Tipo de Deficiência: {pet?.disability}</li>
                                    )}
                                    <li> Post Criado em <b>{convertDate(pet?.createdAt)}</b></li>

                                </ul>
                            </div>

                            <div id={Styles["description"]}>

                                <h2 className={Styles.heading2_color}>
                                    Descrição do Pet
                                </h2>


                                <p>
                                    {pet?.moreInfo ?
                                        <><span>
                                            <SVG.Quote fill='var(--primary)'
                                                alt='Aspas, segundo o dono do pet...'
                                            />
                                        </span>
                                            {pet?.moreInfo}
                                        </>
                                        :
                                        'Sem informações adicionais dadas pelo dono.'
                                    }
                                </p>

                            </div>

                        </div>

                        {pet?.particulars.length > 0 && (
                            <div>
                                <h2 className={`${Styles.heading2_color}`}>
                                    Segundo o dono, el{pet?.genre === 'male' ? 'e' : 'a'} é...
                                </h2>

                                <div className={Styles.singularities}>

                                    <ul>
                                        {pet?.particulars?.map((item: string) => (

                                            <li key={item}><SVG.Exclamation />{item}</li>
                                        ))}

                                    </ul>
                                </div>

                            </div>
                        )}

                    </div>


                </section>

                <section className={Styles.second_info_container}>

                    <div id={Styles["second-content"]}>
                        <div className={Styles.text}>

                            <h2 className={`${Styles.heading2_color} ${Styles.heading2_size}`}>
                                Perdido em
                            </h2>

                            <p>
                                {pet?.lastSeen?.street}, {pet?.lastSeen?.county} - {pet?.lastSeen?.state}
                            </p>

                        </div>

                        <div className={`${Styles.text} ${Styles.reward}`}>

                            <h2 className={Styles.heading2_size}>
                                Recompença
                            </h2>

                            <p>
                                R$ {pet?.rewardAmount},00
                            </p>

                        </div>

                        <div className={Styles.button}>

                            <button type='button' onClick={() => {
                                if (userState.token && userState.name) {
                                    setExpanded(!expanded)
                                }
                                else {
                                    router.push(`/user/login?redirect=/pet?id=${router.query.id}`)
                                }
                            }}>
                                Achei Seu Pet
                            </button>

                        </div>

                    </div>

                </section>

            </div >

            {/* Panel to be expanded */}
            <div
                className={expanded ? Styles.expand_true_found_pet_owner_contact : Styles.expand_false_found_pet_owner_contact}
            >

                <h1>Você viu mesmo ?</h1>

                <p>Preencha algumas informações para o dono saber se é ele mesmo!</p>

                <form
                    encType="multipart/form-data"
                    onSubmit={(e) => submitPetFoundForm(e)}
                >

                    <div>
                        <label>

                            Foto do Pet
                            <input type='file' name='petImg' />

                        </label>
                    </div>
                    <div>
                        <p>
                            Está com coleira?
                        </p>
                        <div className={Styles.radio_inputs}>
                            <label>
                                Sim
                                <input type='radio' onClick={() => setHasCollarInput(true)} value='true' name='hasCollar' id='hasCollar_true' />

                            </label>

                            <label>

                                Não
                                <input type='radio' onClick={() => setHasCollarInput(false)} value='false' name='hasCollar' id='hasCollar_false' />

                            </label>
                        </div>
                    </div>
                    <div>
                        <label>

                            O que está escrito nela?
                            <input type='text' name='collarName' disabled={hasCollarInput ? false : true} />

                        </label>
                    </div>
                    <div>
                        <label>

                            Onde Encontrou o Pet?
                            <input type='text'
                                id='foundAddress' name='foundAddress'
                                placeholder='Ex: Rua das Laranjeiras, Bairro do Limão, SP' />

                        </label>
                    </div>
                    <div className={Styles.confirmValues}>
                        <label>

                            Você confirma que o dados acima são reais?
                            <input type='checkbox' value='true' name='confirmedDataOnForm' required />

                        </label>
                    </div>

                    <div className={Styles.submitButton}>
                        <button type='submit'>Informar Dono</button>
                        <button type='button' onClick={() => setExpanded(false)}>Voltar</button>
                    </div>

                </form>

            </div>

        </>
    )
}

export default Pet

export async function getServerSideProps({ query }: { query: { id: string } }) {

    // get pet info through the provided ID on url query
    const res = await getPetInfo(`${query.id}`)

    return {
        props: res
    }

}