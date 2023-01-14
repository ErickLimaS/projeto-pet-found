import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Styles from './Complete.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import Link from 'next/link'
import * as SVG from '../../../public/imgs/svg'
import Meta from '../../../components/Meta'
import { getPetInfo } from '../../api/petRoutes'
import Image from 'next/image'
import { convertDate } from '../../../components/convertDate'
import { useRouter } from 'next/router'

interface PetProps {

    type: String,
    createdAt: string,
    typeTranslated: String,
    name: String,
    genre: String,
    age: Number,
    size: Number,
    hasDisability: Boolean,
    disability: String,
    breed: String,
    particulars: [String],
    lastSeen: {
        whereOwnerLives: Boolean,
        state: String,
        state_abbrev: String,
        county: String,
        street: String
    },
    hasReward: Boolean,
    rewardAmount: Number,
    moreInfo: String,
    postDetails: String

}

const Complete: NextPage = (info: any) => {

    const steps = useSelector((state: RootState) => state.changeCreateLostPetPostSteps)
    const postInfo: any = useSelector((state: RootState) => state.setPetInfo)
    const { currentStep }: any = steps

    const [tabVisible, setTabVisible] = useState<number>(0)
    const [petQueried] = useState<PetProps>(info.pet)

    const router = useRouter()

    useEffect(() => {

        // if user dont follow the steps from beginning, reiniciate the steps process
        if (currentStep !== 4 && !postInfo.info) {
            router.push('/criar-anuncio/step1')
        }

    }, [])

    return (
        <>
            <Meta title='Anúncio Criado' />

            <div className={Styles.container}>

                <section className={Styles.post_done}>
                    <h1>Anúncio Criado!</h1>

                    <p>
                        Essas são as informações que aparecerão para quem clicar no seu anúncio!
                    </p>
                </section>

                <div className={Styles.all_pet_info}>

                    <section className={Styles.heading_info}>

                        <Image src=''
                            alt={`Foto d${petQueried.genre == 'male' ? 'o' : 'a'} ${petQueried.name}`}
                            width={320} height={240}
                            layout='responsive'
                        />

                        <h2>
                            {petQueried.name}
                            {petQueried.genre === 'male' ?
                                <SVG.MaleSymbol title='Macho' alt='Sexo Masculino' fill='rgb(107, 107, 255)' style={{ width: '30px' }} /> :
                                <SVG.FemaleSymbol title='Fêmea' alt='Sexo Feminino' fill='rgb(255, 146, 164)' style={{ width: '30px' }} />
                            }
                        </h2>

                        <p>
                            {petQueried.hasReward ?
                                `R$ ${petQueried.rewardAmount},00` : 'Sem Recompensa'
                            }
                        </p>

                    </section>

                    <div className={Styles.grid_template_area}>
                        <section className={Styles.info_section}>

                            <h3>Última vez visto em</h3>

                            <div
                                className={`${Styles.smaller_font} ${Styles.background} ${Styles.flex}`}
                            >

                                <p>
                                    <b>{petQueried.lastSeen.street}</b>
                                </p>
                                <p>
                                    {petQueried.lastSeen.county} -{petQueried.lastSeen.state}
                                </p>

                            </div>

                        </section>

                        <section className={Styles.info_section}>

                            <h3>Contatos</h3>

                            <div className={`${Styles.background} ${Styles.list_container}`}>

                                <ul>

                                    <li><SVG.Telephone fill='var(--primary)' /> {info.contacts.tel1.ddd} {info.contacts.tel1.tel}</li>
                                    <li><SVG.Telephone fill='var(--primary)' /> {info.contacts.tel2.ddd} {info.contacts.tel2.tel}</li>
                                    <li>
                                        <SVG.Facebook fill='#4267B2' />
                                        {' '}
                                        <Link href={info.contacts.facebook} target='_blank' rel='no_referrer'>
                                            Meu Perfil
                                        </Link>
                                    </li>
                                    <li><SVG.Instagram fill='#E1306C' /> {info.contacts.instagram}</li>

                                </ul>

                            </div>

                        </section>

                        <section className={Styles.info_section}>

                            <div className={Styles.heading_navigation}>
                                <button
                                    disabled={tabVisible == 0 ? true : false}
                                    onClick={() => setTabVisible((curr) => curr - 1)}
                                >
                                    <SVG.ChevronLeft
                                        title='Ir para o painel anterior.'
                                        alt='Seta para esquerda.'
                                    />
                                </button>
                                {tabVisible === 0 && (<h3>Mais Informações</h3>)}
                                {tabVisible === 1 && (<h3>Outros Detalhes</h3>)}
                                {tabVisible === 2 && (<h3>Características</h3>)}
                                <button
                                    disabled={tabVisible == 2 ? true : false}
                                    onClick={() => setTabVisible((curr) => curr + 1)}
                                >
                                    <SVG.ChevronRight
                                        title='Ir para o próximo painel.'
                                        alt='Seta para direita.'
                                    />
                                </button>
                            </div>

                            <div data-tabActive={tabVisible === 0 ? true : false}
                                className={`${Styles.background} ${Styles.list_container} ${Styles.min_height}`}
                            >

                                <ul className={Styles.flex}>
                                    <li>Raça: <b>{petQueried.breed}</b></li>
                                    <li>Tem Deficiência: <b>{petQueried.disability ? 'Sim' : 'Não'}</b></li>
                                    {petQueried.disability && (
                                        <li>Tipo de Deficiência: <b>{petQueried.disability}</b></li>
                                    )}
                                    <li>Idade: <b><>{petQueried.age} Anos</></b></li>
                                    <li>Tamanho: <b><>{petQueried.size} cm</></b></li>
                                    <li>Perdido em <b>{convertDate(petQueried.createdAt)}</b></li>
                                </ul>

                            </div>

                            <div data-tabActive={tabVisible === 1 ? true : false}
                                className={`${Styles.background} ${Styles.min_height}`}
                            >

                                {petQueried.postDetails ? (
                                    <p>{petQueried.postDetails}</p>
                                ) : (
                                    <p>Nenhum detalhe adicionado pelo dono.</p>
                                )}

                            </div>

                            <div data-tabActive={tabVisible === 2 ? true : false}
                                className={`${Styles.background} ${Styles.grid_particulars_container}  ${Styles.min_height}`}
                            >

                                {petQueried.particulars.length > 0 ? (
                                    <ul>

                                        <li >item</li>
                                        <li >item</li>
                                        {petQueried.particulars.map((item: String, key) => (
                                            <li key={key}>{item}</li>
                                        ))}

                                    </ul>
                                ) : (
                                    <p>Nenhuma característica adicionada pelo dono.</p>
                                )}

                            </div>

                        </section>
                    </div>
                </div>

                <Link href='/'>Ir para o Início</Link>

            </div>

        </>
    )
}

export default Complete

// gets the pet info on url query
export async function getServerSideProps({ query }: any) {

    const res = await getPetInfo(query.pet);

    return {
        props: {
            pet: res.chosePet,
            contacts: res.contacts
        }
    }

}