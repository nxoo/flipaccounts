import Image from "next/image";
import Link from "next/link";
import Layout from "../components/layout";


const url = process.env.NEXTAUTH_URL;
export default function Home() {
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
                            <option value="4">Extra Services</option>
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
                        <Link href='/freelance/2'><a style={{textDecoration: "none", color: "inherit"}}>
                            <div className="p-4 bg-light">
                                <span className="h5">Verbit</span><br/>
                                <span className="text-muted">
                                        <small>
                                            Rating: 4.2/6.0<br/>
                                            Age/Gigs/Earned - 1 month/7/$25<br/>
                                            <strong>$65</strong>, 4 offers
                                        </small>
                                    </span>
                            </div>
                        </a></Link>
                    </div>
                    <div className="col-sm-4">
                        <Link href='/social-media/1'><a style={{textDecoration: "none", color: "inherit"}}>
                            <div className="p-4 bg-light">
                                <div className="row">
                                    <div className="col-auto">
                                        <Image
                                            src="/images/profile.jpg"
                                            background-color='red'
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
                                                    Followers: 15k<br/>
                                                    Category: Memes<br/>
                                                    <strong>$50</strong>, 3 offers
                                                </small>
                                            </span>
                                    </div>
                                </div>
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

                .advert {
                  margin-top: 40px;
                }
              }
            `}</style>
        </Layout>
    )
}
