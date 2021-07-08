import Link from 'next/link';
import Head from "next/head";
import Layout from '../components/layout';


export default function Sell() {
    return (
        <Layout>
            <Head>
                <title>Sell</title>
            </Head>
                <div className="row">
                    <div className="col-sm-6 mx-auto">
                    <h4 className="mb-4">Add A New Listing</h4>
                    <small>Select Category</small>
                        <div className="list-group">
                            <Link href="/sell/freelance">
                                <a className="list-group-item list-group-item-action d-flex">
                                    Freelance<span className="btn btn-secondary btn-sm ms-auto">
                                        Freelance</span>
                                </a>
                            </Link>
                            <Link href="/sell/social-media">
                                <a className="list-group-item list-group-item-action d-flex">
                                    Social Media<span className="btn btn-secondary btn-sm ms-auto">
                                        Social Media</span>
                                </a>
                            </Link>
                            <Link href="/sell/extra-services">
                                <a className="list-group-item list-group-item-action d-flex">
                                    Extra Services
                                <span className="btn btn-secondary btn-sm ms-auto">Extra Services</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
        </Layout>
    )
}