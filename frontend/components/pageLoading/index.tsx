import React from 'react'
import LoadingStyles from './Loading.module.css'
import { Loading } from '../../public/imgs/svg'

function PageLoading() {

  return (
    <div role='progressbar' className={LoadingStyles.loading_container}>
      <Loading alt='Carregando a página' />
    </div>
  )

}

export default PageLoading