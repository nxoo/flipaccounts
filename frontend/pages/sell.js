import Link from 'next/link';
import Layout from '../components/layout';


export default function Sell() {
    return (
        <Layout>
            <div>
                <h4 className="mb-4">Add A New Listing</h4>
                <div className="row">
                    <small>Select Category</small>
                    <div className="col-sm-6">
                        <div className="list-group">
                            <Link href="/sell/freelance">
                                <a className="list-group-item list-group-item-action d-flex">
                                    Freelance Account <span className="btn btn-secondary btn-sm ms-auto">
                                        Freelance</span>
                                </a>
                            </Link>
                            <Link href="/sell/social-media">
                                <a className="list-group-item list-group-item-action d-flex">
                                    Social media Account <span className="btn btn-secondary btn-sm ms-auto">
                                        Social media</span>
                                </a>
                            </Link>
                            <Link href="/sell/gaming">
                                <a className="list-group-item list-group-item-action d-flex">
                                    Gaming Account <span className="btn btn-secondary btn-sm ms-auto">Gaming</span>
                                </a>
                            </Link>
                            <Link href="/sell/verification">
                                <a className="list-group-item list-group-item-action d-flex">
                                    Verification services
                                <span className="btn btn-secondary btn-sm ms-auto">Verification</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}