import Head from 'next/head'
import Link from "next/link";
import {useCallback, useState} from "react";
import {useEffect} from "react";
import Layout from "../components/layout";

const names = ['Freelance', 'Social media', 'Gaming', 'Verification services']

export default function Home() {
    const [count, setCount] = useState(0);

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

    return (
        <Layout>
            <Head>
                <title>FlipAccounts</title>
            </Head>
            <div>
                <div id="homepage-title">A marketplace to buy and sell <br/>
                    <span id="slider"><Link href="/"><a>{names[count]}</a></Link>{count < 3 ? " accounts" : ""}</span>
                </div>
                <br/>
                <div className="search col-sm-8">
                    <form className="d-grid gap-2 d-md-flex">
                        <div className="col-auto">
                            <select className="form-select" aria-label="Default select example" required>
                                <option value="">Category</option>
                                <option value="1">Freelance</option>
                                <option value="2">Social Media</option>
                                <option value="3">Gaming</option>
                                <option value="4">Verification</option>
                            </select>
                        </div>
                        <input className="form-control me-2" type="search"
                               placeholder="e.g. Instagram, Verbit" aria-label="Search" required/>
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
                <p id="ready-to-sell">Ready to sell? <Link href="/sell"><a id="">Sell Now</a></Link></p>
                <div className="advert">
                    <span><b>Promoted</b> <span><i className="bi-arrow-up-right-square-fill"></i></span></span>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="p-4 bg-light">
                                <h4>Verbit British</h4>
                                <span className="text-muted"><small>Rating: 8.9</small></span><br/>
                                <p className="text-muted"><small>Age/Gigs/Earned - New/4/$150</small></p>
                                <a href="#" className="btn btn-success">$150</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
              #homepage-title {
                font-weight: bold;
              }

              #slider > a {
                text-decoration: none;
              }

              div > p > a {
              }

              #ready-to-sell {
                margin-top: 10px;
                margin-bottom: 20px;
              }

              #ready-to-sell a {
                text-decoration: none !important;
              }

              .row .col-sm-4 {
                margin-top: 5px;
              }

              @media (max-width: 990px) {
                #homepage-title {
                  font-size: larger;
                }

                #slider {
                  font-size: medium;
                }
              }

              @media (min-width: 992px) {
                #homepage-title {
                  font-size: x-large;
                }

                #slider {
                  font-size: large;
                }

                .advert {
                  margin-top: 40px;
                }
              }
            `}</style>
        </Layout>
    )
}
