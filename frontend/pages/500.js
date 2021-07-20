import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";


export default function Custom500() {
    return (
        <Layout>
            <Head>
                <title>500 - Page Not Found</title>
            </Head>
            <div>
                <h2>500 - Page Not Found</h2>
                <Link href="/">
                    <a>← Back home</a>
                </Link>
            </div>
        </Layout>
    )
}
