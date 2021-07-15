import React, { useState, useMemo } from "react";
import Head from "next/head";
import axios from "axios";
import { useSession } from "next-auth/client";
import Select from "react-select";
import countryList from "react-select-country-list";
import Layout from "../../components/layout";
import { addFreelance, addCompany, addCategory } from "../../lib/flip";

export async function getServerSideProps() {
    try {
        const { data: apiCategories } = await axios.get(
            process.env.NEXT_PUBLIC_HOST + "/api/fcategory/"
        );
        const { data: apiCompanies } = await axios.get(
            process.env.NEXT_PUBLIC_HOST + "/api/fcompany/"
        );

        return {
            props: {
                apiCategories,
                apiCompanies,
            },
        };
    } catch (error) {
        return {
            props: {},
        };
    }
}

export default function Freelance({ apiCategories, apiCompanies }) {
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [rating, setRating] = useState("");
    const [outOf, setOutOf] = useState("");
    const [gigs, setGigs] = useState("");
    const [earned, setEarned] = useState("");
    const [approved, setApproved] = useState("2021-07");
    const [country, setCountry] = useState("");
    const [vpn, setVpn] = useState(false);
    const [verification, setVerification] = useState(false);
    const [verified, setVerified] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(false);
    const [includeFees, setIncludeFees] = useState(false);
    const [offers, setOffers] = useState(true);
    const [stock, setStock] = useState(1);
    const [newCategory, setNewCategory] = useState("");
    const [newCompany, setNewCompany] = useState("");
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [showNewCompany, setShowNewCompany] = useState(false);
    const [categories, setCategories] = useState([
        { id: "", name: "Category" },
        ...apiCategories,
        { id: "c", name: "Can't find category" },
    ]);
    const [companies, setCompanies] = useState([{ id: "", name: "Company" }]);
    const [error, setError] = useState("");
    const [session] = useSession();
    const countries = useMemo(() => countryList().getData(), []);
    const df = !session;

    const handleFreelance = async (event) => {
        event.preventDefault();
        const accessToken = session.accessToken;
        if (!newCompany && !newCategory) {
            const data = {
                category,
                company,
                rating,
                max_rating: outOf,
                gigs,
                earned,
                approved,
                country: country.value,
                vpn,
                verification,
                verified,
                description,
                price,
                offers,
                stock,
            };
            const res = await addFreelance(accessToken, data);
            console.log(res);
        } else if (newCompany && !newCategory) {
            const data = { name: newCompany, category: category };
            const data2 = {
                category,
                rating,
                max_rating: outOf,
                gigs,
                earned,
                approved,
                country: country.value,
                vpn,
                verification,
                verified,
                description,
                price,
                offers,
                stock,
            };
            const res = await addCompany(accessToken, data, data2);
            console.log(res);
        } else if (newCategory && newCompany) {
            const data = { name: newCategory };
            const data2 = { name: newCompany };
            const data3 = {
                rating,
                max_rating: outOf,
                gigs,
                earned,
                approved,
                country: country.value,
                vpn,
                verification,
                verified,
                description,
                price,
                offers,
                stock,
            };
            const res = await addCategory(accessToken, data, data2, data3);
            console.log(res);
        }
    };

    const handlePrice = (event) => {
        const data = event.target.value;
        setPrice(data);
        if (!data) {
            setIncludeFees(false);
            setOffers(true);
        }
    };

    const handleCategory = (event) => {
        const data = event.target.value;
        if (data === "c") {
            setCategory(data);
            setNewCategory("");
            setShowNewCategory(true);
            setCompany("");
            setNewCompany("");
            setShowNewCompany(false);
        } else {
            setCategory(data);
            setNewCategory("");
            setShowNewCategory(false);
            setCompany("");
            setNewCompany("");
            setShowNewCompany(false);
        }

        let categoryCompanies = apiCompanies.filter(
            (x) => x.category === Number(data)
        );
        setCompanies([
            { id: "", name: "Company" },
            ...categoryCompanies,
            { id: "c", name: "Can't find company" },
        ]);
    };

    const handleCompany = (event) => {
        const data = event.target.value;
        if (data === "c") {
            setCompany(data);
            setNewCompany("");
            setShowNewCompany(true);
        } else {
            setCompany(data);
            setNewCompany("");
            setShowNewCompany(false);
        }
    };

    const handleIncludeFees = (event) => {
        const data = event.target.checked;
        let initialPrice = price;
        if (includeFees === false && data === true) {
            initialPrice *= 1.05;
            setPrice(initialPrice);
            setIncludeFees(data);
        } else if (includeFees === true && data === false) {
            initialPrice *= 100 / 105;
            setPrice(initialPrice);
            setIncludeFees(data);
        } else {
            setPrice(initialPrice);
            setIncludeFees(data);
        }
    };

    const changeHandler = (value) => {
        setCountry(value);
    };

    const alert = (
        <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
        >
            <div className="col-sm-6 mx-auto">You need to Login</div>
        </div>
    );

    if (!apiCategories || !apiCompanies) return <div></div>;
    return (
        <Layout>
            <Head>
                <title>Add Freelance</title>
            </Head>
            {session ? null : alert}
            <form method="post" onSubmit={handleFreelance}>
                <div className="row">
                    <div className="col-sm-6 mx-auto">
                        <div className="row">
                            <div className="col-auto mb-2">
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={category}
                                    onChange={handleCategory}
                                    disabled={df}
                                    required
                                >
                                    {categories.map((x, y) => (
                                        <option key={y} value={x.id}>
                                            {x.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div
                                className="col-auto mb-2"
                                style={{
                                    display: showNewCategory
                                        ? "inherit"
                                        : "none",
                                }}
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type Category name here"
                                    value={newCategory}
                                    onChange={(e) =>
                                        setNewCategory(e.target.value)
                                    }
                                    required={showNewCategory}
                                />
                            </div>
                            <div className="col-auto mb-2">
                                <select
                                    placeholder="Company"
                                    className="form-select"
                                    value={company}
                                    onChange={handleCompany}
                                    disabled={!category || df}
                                    required
                                >
                                    {companies.map((x, y) => (
                                        <option key={y} value={x.id}>
                                            {x.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div
                                className="col-auto mb-2"
                                style={{
                                    display: showNewCompany
                                        ? "inherit"
                                        : "none",
                                }}
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type Company name here"
                                    value={newCompany}
                                    onChange={(e) =>
                                        setNewCompany(e.target.value)
                                    }
                                    required={showNewCompany}
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
                                            onChange={(e) =>
                                                setRating(e.target.value)
                                            }
                                            disabled={df}
                                        />
                                        <input
                                            type="number"
                                            step="any"
                                            className="form-control"
                                            placeholder="Out of"
                                            required
                                            value={outOf}
                                            onChange={(e) =>
                                                setOutOf(e.target.value)
                                            }
                                            disabled={df}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <label htmlFor="gigs" className="form-label">
                                    <small>
                                        No. of gigs done and total earnings
                                        (USD)
                                    </small>
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
                                            onChange={(e) =>
                                                setGigs(e.target.value)
                                            }
                                            disabled={df}
                                        />
                                        <input
                                            type="number"
                                            step="any"
                                            className="form-control"
                                            placeholder="Earned"
                                            value={earned}
                                            onChange={(e) =>
                                                setEarned(e.target.value)
                                            }
                                            disabled={df}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <div className="col-auto mb-2">
                                    <label
                                        htmlFor="approved"
                                        className="form-label"
                                    >
                                        <small>
                                            Month account was approved
                                        </small>
                                    </label>
                                    <input
                                        type="month"
                                        className="form-control"
                                        id="age"
                                        placeholder="mm/yyyy"
                                        value={approved}
                                        onChange={(e) =>
                                            setApproved(e.target.value)
                                        }
                                        disabled={df}
                                    />
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="col-auto mb-2">
                                    <label
                                        className="form-label"
                                        htmlFor="country"
                                    >
                                        <small>
                                            Country account was registered in
                                        </small>
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
                                    onChange={(e) => setVpn(e.target.checked)}
                                    disabled={df || !country}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="vpn"
                                >
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
                                        onChange={(e) =>
                                            setVerification(e.target.checked)
                                        }
                                        disabled={df}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="verification"
                                    >
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
                                        onChange={(e) =>
                                            setVerified(e.target.checked)
                                        }
                                        disabled={df || !verification}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="verified"
                                    >
                                        Verified
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-auto mb-2">
                            <textarea
                                className="form-control"
                                placeholder="Description"
                                id="description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                disabled={df}
                            />
                        </div>

                        <div className="col-sm-6 mb-2">
                            <div className="input-group">
                                <span
                                    className="input-group-text"
                                    id="basic-addon1"
                                >
                                    Price (USD)
                                </span>
                                <input
                                    id="price"
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
                                    <label
                                        className="form-check-label"
                                        htmlFor="include-fees"
                                    >
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
                                        onChange={(e) =>
                                            setOffers(e.target.checked)
                                        }
                                        disabled={df || !price}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="offers"
                                    >
                                        Accept Offers
                                    </label>
                                </div>
                            </div>
                        </div>
                        <label htmlFor="stockOptions">
                            <small>How many accounts are you selling?</small>
                        </label>
                        <div className="col-2 mb-3">
                            <input
                                type="number"
                                className="form-control"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
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
    );
}
