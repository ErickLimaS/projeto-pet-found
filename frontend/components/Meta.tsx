import Head from 'next/head'
import React from 'react'

function Meta({ title, keywords, description }: any) {
    return (
        <Head>
            <meta name='viweport' content='width=devide-width, initial-scale=1'></meta>
            <meta name='keywords' content={keywords ? keywords : 'cachorro, gato, animal, pet, perdido, achar'}></meta>
            <meta name="description" content={description ? description : "Projeto da Uninove do Segundo Semestre de 2022"} />
            <link rel="icon" href="/favicon.ico" />
            <title>{title} | Pet Found</title>
        </Head>
    )
}

export default Meta