import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {signIn, useSession} from 'next-auth/client';
import swal from '@sweetalert/with-react';
import Layout from "../components/layout";
import Error from "next/error";

function Alert2() {
    return (
        swal(
            <div>
                <h1>Login success!</h1>
            </div>
        )
    )
}

function Alert({message, errorType, setShowError}) {
    return (
        <div className={`alert alert-${errorType} alert-dismissible fade show`} role="alert">
            {message}
            <button onClick={() => setShowError(false)} type="button" className="btn-close" data-bs-dismiss="alert"
                    aria-label="Close"/>
        </div>
    )
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [errorType, setErrorType] = useState('warning')
    const [showError, setShowError] = useState('')
    const [session, loading] = useSession()
    const router = useRouter()
    const {error} = router.query

    useEffect(async () => {
        if (error) {
            if (error === "google") {
                setErrorMessage("Sign in with Google failed. Try again later")
                setErrorType("warning")
                setShowError(true)
            } else {
                setErrorMessage(error)
                setErrorType("warning")
                setShowError(true)
            }
        }
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        const res = await signIn('credentials',
            {email, password, callbackUrl: `${process.env.NEXTAUTH_URL}/login`, redirect: false})
        if (res) {
            console.log(res)
            if (res.error === "400") {
                setErrorMessage("Incorrect email or password")
                setErrorType("warning")
                setShowError(true)
            } else if (res.status === 200 && res.error !== '504') {
                await router.push('/')
                setErrorMessage("Login successful")
                setErrorType("success")
                setShowError(true)
                setEmail('')
                setPassword('')
            } else if (res.error === "504") {
                setErrorMessage("Server is offline, Try again later")
                setErrorType("warning")
                setShowError(true)
            } else {
                setErrorMessage("Login Failed, Try again later")
                setErrorType("warning")
                setShowError(true)
            }
        } else {
            setErrorMessage("Something went wrong, Try again later")
            setErrorType("warning")
            setShowError(true)
        }
    }

    const loginGoogle = async (event) => {
        event.preventDefault()
        const res = await signIn('google', {callbackUrl: '/?message=success'})
        console.log(res)
        if (res) {
            if (res.error === 'google failed') {
                setErrorMessage("Something went wrong, Try again later")
                setErrorType("warning")
                setShowError(true)
            }
        }
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <a href="#" onClick={() => signIn('google', {callbackUrl: '/'})}>
                        <div className="google-btn">
                            <div className="google-wrapper">
                                <Image
                                    src="/images/google.svg"
                                    alt="Sign In with Google"
                                    className="google-icon"
                                    layout="fixed"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <p className="google-text"><b>Log in with Google</b></p>
                        </div>
                    </a>
                    <div className="separator">OR</div>
                    {showError && errorMessage !== "" ? //<Alert2 />
                        <Alert message={errorMessage} errorType={errorType} setShowError={setShowError}/>
                        : null}
                    <h5>Log in with Email</h5>
                    <form onSubmit={handleLogin} method="post">
                        <div>
                            <div className="mb-2">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    autoComplete="true"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mb-4">Login</button>
                    </form>
                    <p>Don't have an account? <Link href="/signup"><a>Sign up</a></Link><br/>
                        <Link href="/forgot"><a>Forgot Password?</a></Link></p>
                </div>
            </div>
            <style jsx>{`
              .separator {
                display: flex;
                align-items: center;
                text-align: center;
                margin-top: 30px;
                margin-bottom: 30px;
              }

              .separator::before,
              .separator::after {
                content: '';
                flex: 1;
                border-bottom: 1px solid #000;
              }

              .separator:not(:empty)::before {
                margin-right: .25em;
              }

              .separator:not(:empty)::after {
                margin-left: .25em;
              }

              .google-btn {
                width: 220px;
                height: 42px;
                background-color: #4285f4;
                border-radius: 2px;
              }

              .google-wrapper {
                position: absolute;
                margin-top: 1px;
                margin-left: 1px;
                width: 60px;
                height: 40px;
                border-radius: 2px;
                background-color: #fff;
                padding-left: 15px;
                padding-top: 5px
              }

              .google-icon {
                position: absolute;
              }

              .google-text {
                float: right;
                margin: 11px 11px 0 0;
                color: #ffffff;
                font-size: 14px;
                letter-spacing: 0.2px;
              }

              .google-btn:hover {
                box-shadow: 0 0 6px #4285f4;
              }

              .google-btn:active {
                background: #1669F2;
              }
            `}</style>
        </Layout>
    )
}

