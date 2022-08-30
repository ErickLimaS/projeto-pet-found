import React from 'react'
import styles from '../styles/Layout.module.css'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'

function Layout({ children }: any) {
    return (
        <>
            <Meta />
            <Header />

            <div className={styles.container}>
                <main className={styles.main}>


                    {children}

                </main>
            </div>

            <Footer />
        </>
    )
}

export default Layout