import Link from "next/link";
import {useSession, signIn, signOut} from 'next-auth/client';

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default function Navbar() {
    const [session, loading] = useSession()

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark" style={{}}>
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand" id="navbar-brand">FlipAccounts</a>
                </Link>
                {session ?
                    <a href="" className="navbar-brand" id="inbox-mobile">
                        <i className="bi bi-envelope-fill"/> <sup className="sups">(0)</sup>
                    </a>
                    : null
                }
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-grid-fill" /> Browse
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Freelance</a></li>
                                <li><a className="dropdown-item" href="#">Social Media</a></li>
                                <li><a className="dropdown-item" href="#">Gaming</a></li>
                                <li><a className="dropdown-item" href="#">Verification Services</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="bi bi-search"/> Search</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-three-dots" /> More
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="moreDropdown">
                                <li><a className="dropdown-item" href="#">How to buy</a></li>
                                <li><a className="dropdown-item" href="#">How to sell</a></li>
                                <li><a className="dropdown-item" href="#">FAQs</a></li>
                                <li><a className="dropdown-item" href="#">Contact Support</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {session ? (<>
                                <li className="nav-item" id="inbox-pc">
                                    <a href="/" className="nav-link">
                                        <i className="bi bi-envelope-fill" /> <sup className="sups">(0)</sup>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/" className="nav-link">
                                        <i className="bi bi-shuffle" /> Escrow <sup
                                        className="sups">(0)</sup>
                                    </a>
                                </li>
                            </>
                        ) : (<></>)}
                        <li className="nav-item">
                            <a href="" className="nav-link" id="sell-nw">
                                <i className="bi bi-bag-plus-fill"/> Sell</a>
                        </li>
                        {session ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-fill"/> {session.user.username}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                    <li><a className="dropdown-item" href="#">
                                        <i className="bi bi-person-circle"/> Profile</a>
                                    </li>
                                    <li><a className="dropdown-item" href="#">
                                        <i className=" bi bi-wallet2"/> Wallet
                                    </a></li>
                                    <li><a className="dropdown-item" href="#">
                                        <i className="bi bi bi-list"/> My Listings</a></li>
                                    <li>
                                        <Link href="#">
                                            <a onClick={() => signOut()} className="dropdown-item" href="#">
                                                <i className="bi bi-box-arrow-in-right"/> Log out</a>
                                        </Link>
                                    </li>
                                </ul>
                            </li> : (
                                <>
                                    <li className="nav-item">
                                        <Link href="/signup">
                                            <a className="nav-link">
                                                <i className="bi bi-check2-square"/> Sign up</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/login">
                                            <a className="nav-link">
                                                <i className="bi bi-person-fill"/> Login
                                            </a>
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
                color: #cccccc;
              }

              #navbar-brand {
                color: #e2a94e;
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
                font-weight: 500;
              }

              .navbar-toggler:focus,
              .navbar-toggler:active,
              .navbar-toggler-icon:focus {
                outline: none;
                box-shadow: none;
              }
              
              .navbar-toggler {
                border: none;
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
