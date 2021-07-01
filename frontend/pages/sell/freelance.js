import {useState} from 'react';
import {useSession} from "next-auth/client";
import Layout from "../../components/layout";
import {addFreelance} from "../../lib/flip";


export default function Freelance() {
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [rating, setRating] = useState('');
    const [outOf, setOutOf] = useState('')
    const [gigs, setGigs] = useState('');
    const [earned, setEarned] = useState('');
    const [approved, setApproved] = useState('');
    const [country, setCountry] = useState('');
    const [vpn, setVpn] = useState(false);
    const [verification, setVerification] = useState(false);
    const [verified, setVerified] = useState(false);
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(false);
    const [includeFees, setIncludeFees] = useState(false);
    const [hidePrice, setHidePrice] = useState(false);
    const [offers, setOffers] = useState(false);
    const [auction, setAuction] = useState(false);
    const [session,] = useSession();

    const df = !session;


    const transcription = ['Verbit', 'TransribeMe', 'Rev', 'Verbit British', 'Werkit', "Can't find company"]
    const essayWriting = ['EssayShark', 'EssayPro', "Can't find company"]
    const academicWriting = ['iWriters', 'NerdyTurtlez', 'WritersLabs', "Can't find company"]
    let options;

    if (category === '1') {
        options = transcription.map(x => <option key={x} value={x}>{x}</option>)
    } else if (category === '2') {
        options = academicWriting.map(x => <option key={x} value={x}>{x}</option>)
    } else if (category === '3') {
        options = essayWriting.map(x => <option key={x} value={x}>{x}</option>)
    } else {
        options = <option value="">Company</option>
    };

    const handleFreelance = async event => {
        event.preventDefault()
        const formData = new FormData();
        await formData.append('File', image)
        const accessToken = session.accessToken
        const data = {
            category, 'company':1, rating, 'max_rating': outOf, gigs, earned, approved, country, vpn, verification, verified,
            'image': formData, description, price, 'hide_price': hidePrice, offers, auction
        }
        const res = await addFreelance(accessToken, data)
        console.log(session.accessToken)
        console.log(data)
        console.log(res)
    }

    const handleImageUpload = async event => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('File', image)
    }


    const handleIncludeFees = async event => {
        const data = event.target.checked
        let initialPrice = price
        if (includeFees === false && data === true) {
            initialPrice *= 1.05
            await setPrice(initialPrice)
            await setIncludeFees(data)
        } else if (includeFees === true && data === false) {
            initialPrice *= 100 / 105
            await setPrice(initialPrice)
            await setIncludeFees(data)
        } else {
            await setPrice(initialPrice)
            await setIncludeFees(data)
        }
    }

    const alert = (
        <div className='alert alert-warning alert-dismissible fade show' role="alert">
            You need to Login
            <button type="button" className="btn-close" data-bs-dismiss="alert"
                    aria-label="Close"/>
        </div>
    )

    return (
        <Layout>
            {session ? null : alert}
            <form method="post" onSubmit={handleFreelance}>
                <div className="row">
                    <div className="col-sm-6">

                        <div className="input-group">
                            <div className="col-auto me-2 mb-2">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    required
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    disabled={df}
                                >
                                    <option value="">Category</option>
                                    <option value="1">Transcription</option>
                                    <option value="2">Academic writing</option>
                                    <option value="3">Essay writing</option>
                                    <option value="4">Captioning</option>
                                    <option value="5">Translation</option>
                                    <option value="6">Remote Tasks</option>
                                    <option value="7">Programming</option>
                                    <option value="8">Designing</option>
                                    <option value="9">Can't find category?</option>
                                </select>
                            </div>
                            <div className="col-auto mb-2">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    required
                                    value={category}
                                    onChange={e => setCompany(e.target.value)}
                                    disabled={df || !category}
                                >
                                    {options}
                                </select>
                            </div>
                        </div>

                        <label htmlFor="gigs" className="form-label">
                            <small>Account rating Eg 4.2/6.0</small>
                        </label>
                        <div className="col-6 mb-2">
                            <div className="input-group">
                                <input
                                    type="number"
                                    step="any"
                                    className="form-control"
                                    placeholder="Rating"
                                    required
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                    disabled={df}
                                />
                                <input
                                    type="number"
                                    step="any"
                                    className="form-control"
                                    placeholder="Out of"
                                    required
                                    value={outOf}
                                    onChange={e => setOutOf(e.target.value)}
                                    disabled={df}
                                />
                            </div>
                        </div>

                        <label htmlFor="gigs" className="form-label">
                            <small>No. of Gigs done and total earnings in USD</small>
                        </label>
                        <div className="col-7">
                            <div className="input-group mb-2">
                                <input
                                    type="number"
                                    step="any"
                                    className="form-control"
                                    placeholder="Gigs"
                                    id="gigs"
                                    value={gigs}
                                    onChange={e => setGigs(e.target.value)}
                                    disabled={df}
                                />
                                <input
                                    type="number"
                                    step="any"
                                    className="form-control"
                                    placeholder="Earned"
                                    value={earned}
                                    onChange={e => setEarned(e.target.value)}
                                    disabled={df}
                                />
                            </div>
                        </div>

                        <div className="col-sm-6 mb-2">
                            <label htmlFor='approved' className="form-label">
                                <small>Date account was approved</small></label>
                            <input
                                type="date"
                                className="form-control"
                                id="age"
                                placeholder="mm/dd/yyyy"
                                value={approved}
                                onChange={e => setApproved(e.target.value)}
                                disabled={df}
                            />
                        </div>

                        <div className="row">
                            <label className="form-check-label" htmlFor="country">
                                <small>Country account was registered in</small>
                            </label>
                            <div className="col-auto mb-2">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    id="country"
                                    required
                                    value={country}
                                    onChange={e => setCountry(e.target.value)}
                                    disabled={df}
                                >
                                    <option value="">Country</option>
                                    <option value="KE">Kenya</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="UG">Uganda</option>
                                    <option value="SA">South Africa</option>
                                </select>
                            </div>
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="vpn"
                                        value={vpn}
                                        onChange={e => setVpn(e.target.checked)}
                                        disabled={df}
                                    />
                                    <label className="form-check-label" htmlFor="vpn">
                                        VPN needed
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">

                        <div className="row">
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="verification"
                                        value={verification}
                                        onChange={e => setVerification(e.target.checked)}
                                        disabled={df}
                                    />
                                    <label className="form-check-label" htmlFor="verification">
                                        Verification needed
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="verified"
                                        value={verified}
                                        onChange={e => setVerified(e.target.checked)}
                                        disabled={df}
                                    />
                                    <label className="form-check-label" htmlFor="verified">
                                        Verified
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">
                                <small>Select an image, then click upload</small>
                            </label>
                            <input
                                className="form-control form-control-sm"
                                type="file"
                                id="formFileMultiple"
                                name="image"
                                placeholder="Upload Image"
                                onChange={e => setImage(e.target.files[0])}
                                disabled={df}
                            />
                        </div>

                        <div className="col-auto mb-3">
                            <textarea
                                className="form-control"
                                placeholder="Description"
                                id=""
                                rows="2"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                disabled={df}
                            />
                        </div>

                        <div className="row">
                            <div className="col-sm-6 mb-2">
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1">Price in USD </span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Eg. 100"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        disabled={df}
                                    />
                                </div>
                            </div>
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="include-fees"
                                        value={includeFees}
                                        onChange={handleIncludeFees}
                                        disabled={!price}
                                    />
                                    <label className="form-check-label" htmlFor="include-fees">
                                        Include 5% fee
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="offers"
                                        value={offers}
                                        onChange={e => setOffers(e.target.checked)}
                                        disabled={df}
                                    />
                                    <label className="form-check-label" htmlFor="offers">
                                        Accept Offers
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="hidePrice"
                                        value={hidePrice}
                                        onChange={e => setHidePrice(e.target.checked)}
                                        disabled={df}
                                    />
                                    <label className="form-check-label" htmlFor="hidePrice">
                                        Hide price
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-auto mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="auction"
                                    value={auction}
                                    onChange={e => {setAuction(e.target.checked); console.log(e.target.checked)}}
                                    disabled={df}
                                />
                                <label className="form-check-label" htmlFor="auction">
                                    Sell through an Auction
                                </label>
                            </div>
                        </div>

                        <input
                            className="btn btn-success"
                            type="submit"
                            value="Add Freelance"
                            disabled={df}
                        />
                    </div>
                </div>
            </form>
            <style jsx>{`
            `}</style>
        </Layout>
    )
}
