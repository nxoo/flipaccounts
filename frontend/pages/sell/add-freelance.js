import { useState } from 'react';
import Layout from "../../components/layout";


export default function addFreelance() {
    const [category, setCategory] = useState('');
    const [company, setComopany] = useState('');
    const [type, setType] = useState('');
    const [rating, setRating] = useState('');
    const [age, setAge] = useState('');
    const [gigs, setGigs] = useState('');
    const [earned, setEaerned] = useState('');
    const [price, setPrice] = useState('');
    const [hidePrice, setHidePrie] = useState('');
    const [offers, setOffers] = useState('');
    const [auction, setAuction] = useState('');
    const [auctionInc, setAuctionInc] = useState('');
    const [verificaton, setVerification] = useState('');
    const [verified, setVerified] = useState('');
    const [country, setCountry] = useState('');
    const [vpn, setVpn] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Layout>
            <div>
                <a className="btn btn-secondary"><b>Add A Freelance Account</b></a>
            </div>
            <br />
            <form>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="col-auto mb-2">
                            <div className="input-group">
                                <div className="col-auto me-2 mb-2">
                                    <select className="form-select" aria-label="Default select example" required>
                                        <option value="">Category</option>
                                        <option value="1">Transcription</option>
                                        <option value="2">Article writing</option>
                                        <option value="3">Essay writing</option>
                                        <option value="4">Captioning</option>
                                        <option value="5">Web Development</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <select className="form-select" aria-label="Default select example" required>
                                        <option value="">Company</option>
                                        <option value="1">Verbit</option>
                                        <option value="2">Werkit</option>
                                        <option value="3">Verbit British</option>
                                        <option value="4">TranscribeME</option>
                                        <option value="5">Rev</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 mb-2">
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">Rating</span>
                                <input type="number" className="form-control" placeholder="value" />
                                <input type="number" className="form-control" placeholder="Out of" />
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="col-sm-8 mb-2">
                                <div className="input-group">
                                    <input type="number" className="form-control" placeholder="No of Gigs done" />
                                    <input type="number" className="form-control" placeholder="Earned in USD" />
                                </div>
                            </div>
                            <div className="col-sm-6 mb-2">
                                <label htmlFor='age' className="form-label">
                                    <small>Account registration date</small></label>
                                <input type="date" className="form-control" id="age" />
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-6 mb-2">
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">Price in USD </span>
                                <input type="number" className="form-control" placeholder="Eg. 100" />
                            </div>
                        </div>
                        <div className="col-auto mb-2">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="hidePrice" />
                                <label className="form-check-label" htmlFor="hidePrice">
                                    Hide price
                                </label>
                            </div>
                        </div>
                        </div>
                        <div className="col-auto mb-2">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="offers" />
                                <label className="form-check-label" htmlFor="offers">
                                    Accept Offers
                           </label>
                            </div>
                        </div>
                        <div className="col-auto mb-2">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="auction" />
                                <label className="form-check-label" htmlFor="auction">
                                    Sell through an Auction
                           </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="verification" />
                                    <label className="form-check-label" htmlFor="verification">
                                        Verification needed
                           </label>
                                </div>
                            </div>
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="verified" />
                                    <label className="form-check-label" htmlFor="verified">
                                        Verified
                           </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label className="form-check-label" htmlFor="country">
                                <small>Country account was registered in</small>
                            </label>
                            <div className="col-sm-6 mb-2">
                                <select className="form-select" aria-label="Default select example" id="country" required>
                                    <option value="">Country</option>
                                    <option value="1">Kenya</option>
                                    <option value="2">United States</option>
                                    <option value="3">United Kingdom</option>
                                    <option value="4">Uganda</option>
                                    <option value="5">South Africa</option>
                                </select>
                            </div>
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="vpn" />
                                    <label className="form-check-label" htmlFor="vpn">
                                        VPN needed
                           </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="formFileMultiple" className="form-label">
                                <small>Select multiple images then upload</small></label>
                            <input className="form-control" type="file" id="formFileMultiple"
                                placeholder="one" multiple />
                        </div>
                        <div className="col-auto mb-3">
                            <textarea className="form-control" placeholder="Description" id="" rows="3"></textarea>
                        </div>
                        <input className="btn btn-success" type="submit" value="Add Freelance" />
                    </div>
                </div>
            </form >
            <style jsx>{`
            `}</style>
        </Layout >
    )
}
