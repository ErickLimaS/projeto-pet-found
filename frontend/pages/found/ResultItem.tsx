import React from 'react'
import Image from 'next/image'
import * as C from '../../styles/FoundPage/ResultItem'
import * as SVG from '../../public/imgs/svg'

function ResultItem({ data }: any) {

    return (
        <C.Container href={`pet?id=${data._id}`}>

            <div className='image_container'>
                <Image
                    src='/imgs/procurar-pet/background.jpg'
                    width={234} height={162}
                    layout='intrinsic'
                    alt='Cachorro'
                ></Image>
            </div>

            <div className='item_info'>

                <div className='pet_details'>

                    <h3>{data.name}</h3>

                    <p>{data.breed}</p>
                    <p>Ultima vez visto em <b>{data.lastSeen.street}, {data.lastSeen.county} - {data.lastSeen.state}</b></p>

                </div>

                <C.ItemRewardIcon>

                    {data.hasReward ? <SVG.Coin /> : <SVG.SlashCoin />}

                </C.ItemRewardIcon>

            </div>

        </C.Container>
    )

}

export default ResultItem