import Link from 'next/link';
import { useState } from 'react'
import Layout from '../components/layout';


export default function Sell() {
    const [category, setCategory] = useState('')

    return (
        <Layout>
            <div>
                {/*
                <h4 style={{ marginBottom: "40px" }}>Add A New Listing</h4>
                <div className="col-sm-6" style={{ marginBottom: "100px" }}>
                    <form className="d-grid gap-2 d-md-flex">
                        <div className="col-auto">
                            <select className="form-select" id="form-select"
                                aria-label="Default select example" required>
                                <option value="">Category</option>
                                <option value="1">Freelance</option>
                                <option value="2">Social Media</option>
                                <option value="3">Gaming</option>
                                <option value="4">Verification Services</option>
                            </select>
                        </div>
                        <button href="#" className="btn btn-secondary" type="submit">Continue</button>
                    </form>
                </div>
                */}
                <h4 className="mb-4">Add A New Listing</h4>
                <div className="row">
                <small>Select Category</small>
                    <div className="col-sm-6">
                        <div className="list-group">
                            <a href="#" className="list-group-item list-group-item-action d-flex">
                                Freelance Account <span className="btn btn-secondary btn-sm ms-auto">
                                    Freelance</span>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex">
                                Social media Account <span className="btn btn-secondary btn-sm ms-auto">
                                    Social media</span>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex">
                                Gaming Account <span className="btn btn-secondary btn-sm ms-auto">Gaming</span>
                            </a>
                            <a href="#" className="list-group-item list-group-item-action d-flex">
                                Verification services
                                <span className="btn btn-secondary btn-sm ms-auto">Verification</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}