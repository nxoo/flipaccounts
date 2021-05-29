import Head from "next/head";
import Navbar from "./navbar";


export default function Layout({children}) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>FlipAccounts</title>
            </Head>
            <Navbar/>
            <div className="container layout">
                {children}
            </div>
            <style jsx global>{`
              body {
                padding-top: 56px;
              }

              @media (min-width: 992px) {
                .layout {
                  padding-top: 50px;
                }
              }

              @media (max-width: 990px) {
                .layout {
                  padding-top: 20px;
                }
              }
            `}</style>
        </>
    )
}