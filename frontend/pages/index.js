import Image from "next/image";
import Link from "next/link";
import {useCallback, useState} from "react";
import {useEffect} from "react";
import Layout from "../components/layout";


export default function Home() {
    const [count, setCount] = useState(0);
    const names = ['freelance', 'social media', 'gaming', 'verification services']

    /*
    const slider = useCallback(() => {
        setCount(count => count + 1)
    }, [])

    useEffect(() => {
        const intervalID = setInterval(slider, 3000);
        return () => clearInterval(intervalID);
    }, [slider])

    if (count === 4) {
        setCount(0)
    }
     */

    return (
        <Layout>
            <p>
                <span id="index-title">Buy & Sell Freelance Accounts ...</span><br/>
                <span id="index-title2">Transact safely using our escrow service</span>
            </p>

            <div className="search col-sm-7">
                <form className="d-grid gap-2 d-md-flex mb-3">
                    <div className="col-auto">
                        <select className="form-select" aria-label="Default select example" required>
                            <option value="">Category</option>
                            <option value="1">Freelance</option>
                            <option value="2">Social Media</option>
                            <option value="3">Gaming</option>
                            <option value="4">Verification</option>
                        </select>
                    </div>

                    <input className="form-control me-1" type="search"
                           placeholder="e.g. Instagram, Verbit" aria-label="Search" required/>

                    <button className="btn btn-success" type="submit">Search</button>

                </form>
            </div>

            <p id="ready-to-sell">Ready to sell? <Link href="/sell"><a id="">Sell Now</a></Link></p>

            <div className="advert">
                <small><i className="bi-arrow-up-right-square-fill"/> Promoted</small>
                <div className="row">
                    <div className="col-sm-4">
                        <Link href={`/l/${1}`}><a style={{textDecoration: "none", color: "inherit"}}>
                            <div className="p-4 bg-light">
                                <div className="row">
                                    <div className="col-auto">
                                        <Image
                                            src="/images/profile.jpg"
                                            alt="profile picture"
                                            width={70}
                                            height={70}
                                            className="rounded-circle float-start"
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <h5><small><i className="bi bi-instagram"/></small> Instagram</h5>
                                        <span className="text-muted">
                                                <small>
                                                    Followers: 100k<br/>
                                                    Category: Memes<br/>
                                                    <strong>$350</strong>, 4 offers
                                                </small>
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </a></Link>
                    </div>
                    <div className="col-sm-4">
                        <Link href={`/l/${2}`}><a style={{textDecoration: "none", color: "inherit"}}>
                            <div className="p-4 bg-light">
                                <span className="h5">Verbit British</span>
                                <span className="text-muted"><small> - Transcription</small></span> <br/>
                                <span className="text-muted">
                                        <small>
                                            Rating: 3.9/6.0<br/>
                                            Age/Gigs/Earned - 3 months/6/$400<br/>
                                            <strong>$120</strong>, 13 bids
                                        </small>
                                    </span>
                            </div>
                        </a></Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
              #homepage-title {
                font-weight: bold;
                margin-bottom: 20px;
              }

              #slider > a {
                text-decoration: none;
              }

              #ready-to-sell a {
                text-decoration: none;
              }

              .row .col-sm-4 {
                margin-top: 5px;
                margin-bottom: 5px;
              }

              @media (max-width: 990px) {
                #index-title {
                  font-size: large;
                  font-weight: bold;
                }

                #index-title2 {
                  font-size: 15px;
                }
              }

              @media (min-width: 992px) {
                #index-title {
                  font-size: 32px;
                  font-weight: bold;
                }

                #index-title2 {
                  font-weight: ;
                }

                .advert {
                  margin-top: 60px;
                }
              }
            `}</style>
        </Layout>
    )
}
