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
            <div className="container">
                {children}
            </div>
            <style jsx>{`
                .container {
                  margin-top: 50px;
                }
            `}</style>
        </>
    )
}