import Head from 'next/head'
import Image from "next/image"
import Router from "next/router"
import loading from '../../public/images/loading.gif'
import useAuth from "../data/hook/useAuth"

export default function ForcarAutenticacao(jsx) {

    const { usuario, carregando } = useAuth()

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes("admin-template-cod3r-auth")) {
                                window.location.href = "/autenticacao"
                            }
                        `
                    }} />
                </Head>
                {jsx}    
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} alt="loading" />
            </div>
        )
    }

    if(!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if(carregando) {
        return renderizarCarregando()
    } else {
        Router.push('/autenticacao')
        return null
    }
}