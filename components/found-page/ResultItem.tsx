import React from 'react'
import Image from 'next/image'
import * as C from '../../styles/Found-page/ResultItem'
import * as SVG from '../../public/imgs/svg'

function ResultItem({ data }: any) {


    return (
        <C.Container href='test'>

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

                    <h3>Nome Pet</h3>

                    <p>Raca</p>
                    <p>Endereco</p>

                </div>

                <C.ItemRewardIcon>

                    {data ? <SVG.Coin /> : <SVG.SlashCoin />}

                </C.ItemRewardIcon>

            </div>

        </C.Container>
    )

}

export default ResultItem