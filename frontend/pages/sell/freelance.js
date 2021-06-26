import {useState, useEffect} from 'react';
import {useSession} from "next-auth/client";
import Layout from "../../components/layout";


export default function Freelance() {
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [rating, setRating] = useState('');
    const [outOf, setOutOf] = useState('')
    const [gigs, setGigs] = useState('');
    const [earned, setEarned] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [vpn, setVpn] = useState('');
    const [verificaton, setVerification] = useState('');
    const [verified, setVerified] = useState('');
    const [images, setImages] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [includeFees, setIncludeFees] = useState('');
    const [hidePrice, setHidePrice] = useState('');
    const [offers, setOffers] = useState('');
    const [auction, setAuction] = useState('');
    const [disabled, setDisabled] = useState('');

    const [disableForms, setDisableForms] = useState(true);
    const [session, loading] = useSession();

    const df = !session;


    const transcription = ['Verbit', 'TransribeMe', 'Rev', 'Verbit British', 'Werkit']
    const essayWriting = ['EssayShark', 'EssayPro']
    const academicWriting = ['iWriters', 'NerdyTurtlez', 'WritersLabs']
    let options;

    if (category === '1') {
        options = transcription.map(x => <option value={x} />)
    } else if (category === '2') {
        options = academicWriting.map(x => <option value={x} />)
    } else if (category === '3') {
        options = essayWriting.map(x => <option value={x} />)
    } else {
        const companiesOptions = [...transcription, ...academicWriting, ...essayWriting];
        if (company.length > 1) {
            options = companiesOptions.map(x => <option value={x} />)
        } else {
            options = null
        }
    }

    return (
        <Layout>
            <div className='alert alert-warning alert-dismissible fade show' role="alert">
                You need to Login
                <button type="button" className="btn-close" data-bs-dismiss="alert"
                        aria-label="Close"/>
            </div>
            <form>
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
                                <input
                                    className="form-control"
                                    list="datalist"
                                    placeholder="company"
                                    required
                                    value={company}
                                    onChange={e => setCompany(e.target.value)}
                                    disabled={df}
                                />
                                <datalist id="datalist">
                                    {options}
                                </datalist>
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
                            <label htmlFor='age' className="form-label">
                                <small>Date account was approved</small></label>
                            <input
                                type="date"
                                className="form-control"
                                id="age"
                                placeholder="mm/dd/yyyy"
                                value={age}
                                onChange={e => setAge(e.target.value)}
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
                                    <option value="1">Kenya</option>
                                    <option value="2">United States</option>
                                    <option value="3">United Kingdom</option>
                                    <option value="4">Uganda</option>
                                    <option value="5">South Africa</option>
                                </select>
                            </div>
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="vpn"
                                        value={vpn}
                                        onChange={e => setVpn(e.target.value)}
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
                                        value={verificaton}
                                        onChange={e => setVerification(e.target.value)}
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
                                        onChange={e => setVerified(e.target.value)}
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
                                placeholder="one"
                                multiple
                                value={images}
                                onChange={e => setImages(e.target.value)}
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
                                        onChange={e => setIncludeFees(e.target.value)}
                                        disabled={df}
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
                                        onChange={e => setOffers(e.target.value)}
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
                                        onChange={e => setHidePrice(e.target.value)}
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
                                    onChange={e => setAuction(e.target.value)}
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
