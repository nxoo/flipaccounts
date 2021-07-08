import React, {useState, useMemo} from 'react'
import Head from "next/head";
import {useSession} from "next-auth/client";
import Select from "react-select";
import countryList from 'react-select-country-list';
import ImageUploading from "react-images-uploading";
import Layout from "../../components/layout";
import {addFreelance} from "../../lib/flip";


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
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(false);
    const [includeFees, setIncludeFees] = useState(false);
    const [hidePrice, setHidePrice] = useState(false);
    const [offers, setOffers] = useState(false);
    const [auction, setAuction] = useState(false);
    const [stock, setStock] = useState(1)
    const [newCategory, setNewCategory] = useState(false)
    const [newCompany, setNewCompany] = useState('')
    const [images, setImages] = React.useState([]);
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
        const formData = new FormData();
        await formData.append('File', image)
        const accessToken = session.accessToken
        const data = {
            category, 'company': 1, rating, 'max_rating': outOf, gigs, earned, approved, 'country': country.value,
            vpn, verification, verified, 'image': images[0], 'image2': images[1], 'image3': images[2], description,
            price, offers, stock,
        }
        const res = await addFreelance(accessToken, data)
        console.log(data)
        console.log(res)
    }

    const onChange = async (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        await setImages(imageList);
    };

    const handleImageUpload = async event => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('File', image)
    }

    const handlePrice = async event => {
        const data = event.target.value
        await setPrice(data)
        if (!data) {
            await setIncludeFees(false)
        }
    }

    const handleCategory = async event => {
        const data = event.target.value
        await setCategory(data)
        await setNewCategory(false)
        await setCompany('')
        await setNewCompany(false)
        if (data === 'c') {
            setCategory(data)
            setNewCategory(true)
        }
    }

    const handleCompany = async event => {
        const data = event.target.value
        await setCompany(data)
        await setNewCompany(false)
        if (data === 'c') {
            await setCompany(data)
            await setNewCompany(true)
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
                <button type="button" className="btn-close" data-bs-dismiss="alert"
                        aria-label="Close"/>
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
                            <div className="col-auto mb-2" style={{display: newCategory ? 'inherit' : 'none'}}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type Category name here"
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
                            <div className="col-auto mb-2" style={{display: newCompany ? 'inherit' : 'none'}}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type Company name here"
                                    onChange={e => setNewCompany(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <label htmlFor="gigs" className="form-label">
                                    <small>Account rating Eg 4.2/6.0</small>
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
                                    <small>No. of Gigs done and total earnings in USD</small>
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

                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <div className="col-auto">
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
                                <div className="col-auto">
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
                                <small>Upload a maximum of 3 images</small>
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
                                <span className="input-group-text" id="basic-addon1">Price in USD </span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Eg. 100"
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
                                    value={offers}
                                    onChange={e => setOffers(e.target.checked)}
                                    disabled={df}
                                />
                                <label className="form-check-label" htmlFor="offers">
                                    Accept Offers
                                </label>
                            </div>
                        </div>
                        </div>
                        <label htmlFor="stockOptions"><small>How many accounts are you selling?</small></label>
                        <div className="col-4 mb-3">
                            <select
                                name="stock"
                                id="stockOptions"
                                className="form-select"
                                value={stock}
                                onChange={e => setStock(e.target.value)}
                                disabled={df}
                                required
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => (
                                    <option key={x} value={x}>{x}</option>
                                ))}
                            </select>
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
