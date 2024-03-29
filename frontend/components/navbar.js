import Link from "next/link";
import {useSession, signOut} from 'next-auth/client';


export default function Navbar() {
    const [session, loading] = useSession()

    const handleLogout = async (event) => {
        event.preventDefault()
        await signOut({callbackUrl: '/'})
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand" id="navbar-brand">FlipAccounts</a>
                </Link>
                {session && !loading ?
                    <Link href="/inbox">
                        <a className="navbar-brand" id="inbox-mobile">
                            <i className="bi bi-envelope-fill"/>{' '}
                            <small><sup className="badge bg-secondary">0</sup></small>
                            {/*<i className="bi bi-envelope-fill"/> <sup>(<span className="sups">0</span>)</sup>*/}
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
                        {/*}<li className="nav-item dropdown">
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
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link href="/search">
                                <a className="nav-link"><small><i className="bi bi-search"/></small> Search</a>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-three-dots-vertical" /> More
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="moreDropdown">
                                <li><Link href="/how-to-buy"><a className="dropdown-item">How to buy</a></Link></li>
                                <li><Link href="/how-to-sell"><a className="dropdown-item">
                                    How to sell</a></Link></li>
                                <li><Link href="/faqs"><a className="dropdown-item">FAQs</a></Link></li>
                                <li><Link href="/contact-support"><a className="dropdown-item">
                                    Contact Support</a></Link></li>
                            </ul>
                        </li>*/}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {session && !loading ? (
                            <>
                                <li className="nav-item" id="inbox-pc">
                                    <Link href="/inbox">
                                        <a className="nav-link">
                                            {/*<i className="bi bi-envelope-fill"/>{' '}*/}
                                            <i className="bi bi-envelope-fill" />{' '}
                                            <small><sup className="badge bg-secondary">0</sup></small>
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/escrow">
                                        <a className="nav-link"><i className="bi bi-lock-fill" /> Escrow</a>
                                    </Link>
                                </li>
                            </>
                        ) : null}
                        <li className="nav-item">
                            <Link href="/sell/freelance">
                                <a className="nav-link"><i className="bi bi-bag-plus-fill"/> Sell</a>
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
                                        <Link href="/settings">
                                            <a className="dropdown-item"><i className="bi bi-gear"/> Settings</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/wallet">
                                            <a className="dropdown-item"><i className=" bi bi-wallet2"/> Wallet</a>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href="/my-listings">
                                            <a className="dropdown-item"><i className="bi bi-list"/> My listings</a>
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

              .navbar-toggler:focus,
              .navbar-toggler:active,
              .navbar-toggler-icon:focus {
                outline: none;
                box-shadow: none;
              }
              
              .badge {
                font-size: x-small;
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
