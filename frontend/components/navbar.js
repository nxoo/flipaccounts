import Link from "next/link";
import {useSession, signOut} from 'next-auth/client';

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function Navbar() {
    const [session, loading] = useSession()

    const handleLogout = async (event) => {
        event.preventDefault()
        const res = await signOut({callbackUrl: '/'})
        console.log(res)
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand" id="navbar-brand">FlipAccounts</a>
                </Link>
                {session && !loading ?
                    <Link href="/u/inbox">
                        <a className="navbar-brand" id="inbox-mobile">
                            <i className="bi bi-envelope-fill"/> <sup className="sups">(0)</sup>
                        </a>
                    </Link>
                    : null
                }
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <small><i className="bi bi-grid-fill"/></small> Browse
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link href="/freelance">
                                        <a className="dropdown-item">Freelance</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/social-media">
                                        <a className="dropdown-item">Social Media</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/gaming">
                                        <a className="dropdown-item">Gaming</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/verification">
                                        <a className="dropdown-item">Verification Services</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link href="/search">
                                <a className="nav-link"><small><i className="bi bi-search"/></small> Search</a>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">More</a>
                            <ul className="dropdown-menu" aria-labelledby="moreDropdown">
                                <li><Link href="/how-to-buy"><a className="dropdown-item">How to buy</a></Link></li>
                                <li><Link href="/how-to-sell"><a className="dropdown-item">
                                    How to sell</a></Link></li>
                                <li><Link href="/faqs"><a className="dropdown-item">FAQs</a></Link></li>
                                <li><Link href="/contact-support"><a className="dropdown-item">
                                    Contact Support</a></Link></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {session && !loading ? (<>
                                <li className="nav-item" id="inbox-pc">
                                    <Link href="/u/inbox">
                                        <a className="nav-link">
                                            <i className="bi bi-envelope-fill"/> <sup className="sups">(0)</sup>
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/u/escrow">
                                        <a className="nav-link">Escrow</a>
                                    </Link>
                                </li>
                            </>
                        ) : null}
                        <li className="nav-item">
                            <Link href="/sell">
                                <a className="nav-link"><i className="bi bi-bag-x-fill"/> Sell</a>
                            </Link>
                        </li>
                        {session && !loading ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-fill" /> {session.user.username}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                    <li>
                                        <Link href="/u/wallet">
                                            <a className="dropdown-item">
                                                <i className=" bi bi-wallet2"/> 0.00$
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/u/listings">
                                            <a className="dropdown-item">
                                                <i className="bi bi-list-ul"/> My listings</a>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href={`/u/${session.user.username}`}>
                                            <a className="dropdown-item">
                                                <i className="bi bi-gear"/> Settings</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a onClick={handleLogout} className="dropdown-item" href="#">
                                                <i className="bi bi-box-arrow-in-left"/> Log out</a>
                                        </Link>
                                    </li>
                                </ul>
                            </li> : (
                                <>
                                    <li className="nav-item">
                                        <Link href="/signup">
                                            <a className="nav-link"><i className="bi bi-check2-square"/> Sign up</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/login">
                                            <a className="nav-link"><i className="bi bi-person-fill"/> Login</a>
                                        </Link>
                                    </li>
                                </>
                            )}
                    </ul>
                </div>
            </div>
            <style jsx>{`
              .nav-item .nav-link {
                font-weight: bold;
                color: #bbb;
              }

              .nav-item .nav-link:hover {
                color: #eee;
              }

              #navbar-brand {
                color: #d8a045;
                font-weight: bold;
              }

              nav {
                background-color: #273647;
              }

              .sups {
                color: #e2a94e;
                font-weight: bold;
              }

              #inbox-mobile {
                color: #cccccc;
              }

              .dropdown ul li a {
              }

              .navbar-toggler:focus,
              .navbar-toggler:active,
              .navbar-toggler-icon:focus {
                outline: none;
                box-shadow: none;
              }

              @media (min-width: 992px) {
                #inbox-mobile {
                  display: none;
                }
              }

              @media (max-width: 990px) {
                #inbox-pc {
                  display: none;
                }
              }
            `}</style>
        </nav>
    )
}
