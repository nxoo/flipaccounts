import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";


export default function Custom404() {
    return (
        <Layout>
            <Head>
                <title>404 - Page Not Found</title>
            </Head>
            <div>
                <h2>404 - Page Not Found</h2>
                <Link href="/">
                    <a>← Back home</a>
                </Link>
            </div>
        </Layout>
    )
}
