export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{}}>
            <div className="container">
                <a className="navbar-brand" href="/" id="navbar-brand">FlipAccounts</a>
                <a href="/" className="navbar-brand" id="inbox-mobile">
                    <i className="bi bi-envelope-fill"></i> <sup className="sups">3</sup>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-layout-wtf"></i> Browse
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Freelance</a></li>
                                <li><a className="dropdown-item" href="#">Social Media</a></li>
                                <li><a className="dropdown-item" href="#">Gaming</a></li>
                                <li><a className="dropdown-item" href="#">Verification Services</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="bi bi-search"></i> Search</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item" id="inbox-pc">
                            <a href="/" className="nav-link">
                                <i className="bi bi-envelope-fill"></i> <sup className="sups">3</sup>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link">
                                Escrow <sup className="sups">1</sup>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="sellDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Sell
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="sellDropdown">
                                <li><a className="dropdown-item" href="#">Add new listing</a></li>
                                <li><a className="dropdown-item" href="#">My listings</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                More
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="moreDropdown">
                                <li><a className="dropdown-item" href="#">How to buy</a></li>
                                <li><a className="dropdown-item" href="#">How to sell</a></li>
                                <li><a className="dropdown-item" href="#">FAQs</a></li>
                                <li><a className="dropdown-item" href="#">Contact Support</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Brian4
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><a className="dropdown-item" href="#">Wallet</a></li>
                                <li><a className="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </li>
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