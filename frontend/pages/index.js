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
            <div className="homepage">
                <h2>A market to buy and sell</h2>
                <h5 id="slider"><Link href="/"><a>{names[count]}</a></Link>{count < 3 ? " accounts": ""}</h5>
                <p>Transact securely using our escrow service</p>
                <div className="search col-sm-8">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search"
                               placeholder="e.g. Instagram, TransribeMe" aria-label="Search"/>
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
                <br/>
                <p>Read to sell? <Link href="/sell"><a id="read-to-sell">Sell Now</a></Link></p>
                <p><b>Promoted</b> <span><i className="bi-arrow-up-right-square-fill"></i></span></p>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body" style={{marginLeft: "20%"}}>
                        <h5 className="card-title"><a href="/">TranscribeMe</a></h5>
                        <div style={{marginLeft: "5%"}}>
                            <p className="card-subtitle mb-1 text-muted">Age: 6 weeks</p>
                            <p className="card-subtitle mb-1 text-muted">Gigs: 4</p>
                            <p className="card-subtitle mb-1 text-muted">Earned: $100</p>
                        </div>
                        <h6 className="card-subtitle mb-2" style={{color: "darkgreen"}}>Price: $500</h6>
                    </div>
                </div>
                <br/>
            </div>
            <style jsx>{`
              h2 {
                font-weight: bold;
              }

              #slider > a {
                text-decoration: none;
              }

              div > p > a {
                text-decoration: none !important;
              }

              .homepage {
                min-height: calc(100vh - 106px);
              }

              :global(body) {
                background-color: #F6F5EF;
              }
            `}</style>
        </Layout>
    )
}
