import React, {useState, useMemo} from 'react'
import Head from "next/head";
import {useSession} from "next-auth/client";
import Select from "react-select";
import countryList from 'react-select-country-list';
import ImageUploading from "react-images-uploading";
import Layout from "../../components/layout";
import {addFreelance, getFreelanceCompanies} from "../../lib/flip";


const categories = [
    {value: '', label: 'Category'},
    {value: 1, label: 'Transcription'},
    {value: 2, label: 'Academic Writing'},
    {value: 3, label: 'Essay Writing'},
    {value: 'c', label: "Can't find category"}
]

const transcription = [
    {value: '', label: "Company"},
    {value: 1, label: "Verbit"},
    {value: 2, label: "Verbit British"},
    {value: 3, label: "Rev"},
    {value: 4, label: "TranscribeMe"},
    {value: 'c', label: "Can't find company"}
]

const aWriting = [
    {value: '', label: "Company"},
    {value: 1, label: 'iWriters'},
    {value: 2, label: 'NerdyTurtlez'},
    {value: 3, label: 'WritersLabs'},
    {value: 'c', label: "Can't find company"}
]

const eWriting = [
    {value: '', label: "Company"},
    {value: 1, label: 'Essay Shark'},
    {value: 2, label: 'Essay Pro'},
    {value: 'c', label: "Can't find company"}
]

let empty = [
    {value: '', label: "Company"},
    {value: 'c', label: "Can't find company"}
]

export default function Freelance() {
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [rating, setRating] = useState('');
    const [outOf, setOutOf] = useState('')
    const [gigs, setGigs] = useState('');
    const [earned, setEarned] = useState('');
    const [approved, setApproved] = useState('2021-07');
    const [country, setCountry] = useState('');
    const [vpn, setVpn] = useState(false);
    const [verification, setVerification] = useState(false);
    const [verified, setVerified] = useState(false);
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(false);
    const [includeFees, setIncludeFees] = useState(false);
    const [offers, setOffers] = useState(true);
    const [stock, setStock] = useState(1)
    const [newCategory, setNewCategory] = useState('')
    const [newCompany, setNewCompany] = useState('')
    const [showNewCategory, setShowNewCategory] = useState(false)
    const [showNewCompany, setShowNewCompany] = useState(false)
    const [companies, setCompanies] = useState('')
    const maxNumber = 3;
    const [session,] = useSession();
    const countries = useMemo(() => countryList().getData(), [])
    const df = !session;
    let options;

    if (category === '1') {
        options = transcription.map((x, y) => (
            <option key={y} value={x.value}>{x.label}</option>
        ))
    } else if (category === '2') {
        options = aWriting.map((x, y) => (
            <option key={y} value={x.value}>{x.label}</option>
        ))
    } else if (category === '3') {
        options = eWriting.map((x, y) => (
            <option key={y} value={x.value}>{x.label}</option>
        ))
    } else if (category === '4') {
        options = transcription.map((x, y) => (
            <option key={y} value={x.value}>{x.label}</option>
        ))
    } else if (category === '') {
        options = (<option value="">Company</option>)
    } else {
        options = empty.map((x, y) => <option key={y} value={x.value}>{x.label}</option>)
    }

    const handleFreelance = async event => {
        event.preventDefault()
        let img = new FormData();
        img.append("image", image)
        const accessToken = session.accessToken
        const data = {
            category, 'company': 1, rating, 'max_rating': outOf, gigs, earned, approved, 'country': country.value,
            vpn, verification, verified, 'image': images[0], description, price, offers, stock,
        }
        if (!newCompany && !newCategory) {
            const res = await addFreelance(accessToken, data)
            console.log(res)
        } else if (newCompany) {
            return
        }
        console.log(data)
    }

    const onChange = async (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        await setImages(imageList);
    };

    const handleImageUpload = async event => {
        event.preventDefault()
        await setImage(event.target.files[0])
        console.log(event.target.files[0])
    }

    const handlePrice = async event => {
        const data = event.target.value
        await setPrice(data)
        if (!data) {
            await setIncludeFees(false)
            await setOffers(true)
        }
    }

    const handleCategory = async event => {
        const data = event.target.value
        if (data === 'c') {
            await setCategory(data)
            await setNewCategory('')
            await setShowNewCategory(true)
            await setCompany('')
            await setNewCompany('')
            await setShowNewCompany(false)
        } else {
            await setCategory(data)
            await setNewCategory('')
            await setShowNewCategory(false)
            await setCompany('')
            await setNewCompany('')
            await setShowNewCompany(false)
        }
    }

    const handleCompany = async event => {
        const data = event.target.value
        if (data === 'c') {
            await setCompany(data)
            await setNewCompany('')
            await setShowNewCompany(true)
        } else {
            await setCompany(data)
            await setNewCompany('')
            await setShowNewCompany(false)
        }
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

    const changeHandler = value => {
        setCountry(value)
    }

    const alert = (
        <div className='alert alert-warning alert-dismissible fade show' role="alert">
            <div className="col-sm-6 mx-auto">
                You need to Login
            </div>
        </div>
    )

    return (
        <Layout>
            <Head>
                <title>Add Freelance</title>
            </Head>
            {session ? null : alert}
            <form method="post" onSubmit={handleFreelance}>
                <div className="row">
                    <div className="col-sm-7 mx-auto">

                        <div className="row">
                            <div className="col-auto mb-2">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={handleCategory}
                                    disabled={df}
                                    required>
                                    {categories.map((x, y) => (
                                        <option key={y} value={x.value}>{x.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-auto mb-2" style={{display: showNewCategory ? 'inherit' : 'none'}}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type Category name here"
                                    value={newCategory}
                                    onChange={e => setNewCategory(e.target.value)}
                                />
                            </div>
                            <div className="col-auto mb-2">
                                <select
                                    placeholder="Company"
                                    className="form-select"
                                    value={company}
                                    onChange={handleCompany}
                                    disabled={!category || df}
                                    required>
                                    {options}
                                </select>
                            </div>
                            <div className="col-auto mb-2" style={{display: showNewCompany ? 'inherit' : 'none'}}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type Company name here"
                                    value={newCompany}
                                    onChange={e => setNewCompany(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label htmlFor="gigs" className="form-label">
                                    <small>Account rating</small>
                                </label>
                                <div className="col-auto mb-2">
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
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="gigs" className="form-label">
                                    <small>No. of gigs done and total earnings (USD)</small>
                                </label>
                                <div className="col-auto">
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
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="col-auto mb-2">
                                    <label htmlFor='approved' className="form-label">
                                        <small>Month account was approved</small></label>
                                    <input
                                        type="month"
                                        className="form-control"
                                        id="age"
                                        placeholder="mm/yyyy"
                                        value={approved}
                                        onChange={e => setApproved(e.target.value)}
                                        disabled={df}
                                    />
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="col-auto mb-2">
                                    <label className="form-label" htmlFor="country">
                                        <small>Country account was registered in</small>
                                    </label>
                                    <Select
                                        options={countries}
                                        value={country}
                                        onChange={changeHandler}
                                        isSearchable={true}
                                        isClearable={true}
                                        isDisabled={df}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-auto mb-2">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="vpn"
                                    value={vpn}
                                    onChange={e => setVpn(e.target.checked)}
                                    disabled={df || !country}
                                />
                                <label className="form-check-label" htmlFor="vpn">
                                    VPN needed
                                </label>
                            </div>
                        </div>

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
                                        disabled={df || !verification}
                                    />
                                    <label className="form-check-label" htmlFor="verified">
                                        Verified
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="formFileMultiple" className="form-label">
                                <small>You can only upload 3 images</small>
                            </label>
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({imageList, onImageUpload, onImageRemove, isDragging, dragProps, errors}) => (
                                    <div className="upload__image-wrapper">
                                        <div className="mb-2">
                                            <button
                                                type="button"
                                                value=""
                                                style={isDragging ? {color: "red"} : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                                disabled={df}
                                            >Upload Image
                                            </button>
                                        </div>
                                        <div className="row">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item col-auto">
                                                    <img src={image["data_url"]} alt="" width="100"/>
                                                    <div className="image-item__btn-wrapper">
                                                        <small>
                                                            <button
                                                                className="btn btn-link"
                                                                type="button"
                                                                onClick={() => onImageRemove(index)}>remove
                                                            </button>
                                                        </small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                        </div>

                        <div className="col-auto mb-2">
                            <textarea
                                className="form-control"
                                placeholder="Description"
                                id="description"
                                rows="3"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                disabled={df}
                            />
                        </div>

                        <div className="col-sm-6 mb-2">
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">Price (USD)</span>
                                <input
                                    id='price'
                                    type="number"
                                    className="form-control"
                                    placeholder="Optional"
                                    value={price}
                                    onChange={handlePrice}
                                    disabled={df}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="include-fees"
                                        checked={includeFees}
                                        onChange={handleIncludeFees}
                                        disabled={df || !price}
                                    />
                                    <label className="form-check-label" htmlFor="include-fees">
                                        Include 5% fee
                                    </label>
                                </div>
                            </div>

                            <div className="col-auto mb-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="offers"
                                        checked={offers}
                                        onChange={e => setOffers(e.target.checked)}
                                        disabled={df || !price}
                                    />
                                    <label className="form-check-label" htmlFor="offers">
                                        Accept Offers
                                    </label>
                                </div>
                            </div>
                        </div>
                        <label htmlFor="stockOptions"><small>How many accounts are you selling?</small></label>
                        <div className="col-2 mb-3">
                            <input
                                type="number"
                                className="form-control"
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                disabled={df}
                            />
                        </div>
                        <input
                            className="btn btn-success"
                            type="submit"
                            value="Submit"
                            disabled={df}
                        />
                    </div>
                </div>
            </form>
        </Layout>
    )
}
