import React from 'react'
import Image from 'next/image'
import * as C from '../../styles/FoundPage/ResultItem'
import * as SVG from '../../public/imgs/svg'

function ResultItem({ data }: any) {

    return (
        <C.Container
            href={`pet?id=${data._id}`}
            aria-label={`${data.typeTranslated} ${data.name}`}
        >

            <div className='image_container'>
                <Image
                    src='/imgs/procurar-pet/background.jpg'
                    width={234} height={162}
                    layout='responsive'
                    alt='Cachorro'
                ></Image>
            </div>

            <div className='item_info'>

                <div className='pet_details'>

                    <div className='name_icon_container'>
                        <h3>
                            {/* Upper case first letter */}
                            {data.name.slice(0, 1).toUpperCase()}
                            {data.name.slice(1, data.name.length)}
                        </h3>

                        <C.ItemRewardIconMobile hasReward={data.hasReward}>

                            {data.hasReward ?
                                <SVG.Coin aria-label='Há recompensa por esse pet encontrado.' />
                                :
                                <SVG.SlashCoin aria-label='Não há recompensa por esse pet encontrado.' />
                            }

                        </C.ItemRewardIconMobile>

                    </div>

                    <p>Da raça <b>{data.breed}</b></p>
                    <p>Ultima vez visto em <b>{data.lastSeen.street && `${data.lastSeen.street},`} {data.lastSeen.county} - {data.lastSeen.state}</b></p>

                </div>

                <C.ItemRewardIcon hasReward={data.hasReward}>

                    {data.hasReward ?
                        <SVG.Coin aria-label='Há recompensa por esse pet encontrado.' />
                        :
                        <SVG.SlashCoin aria-label='Não há recompensa por esse pet encontrado.' />
                    }

                </C.ItemRewardIcon>

            </div>

        </C.Container>
    )

}

export default ResultItem