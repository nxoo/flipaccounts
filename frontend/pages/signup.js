import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {signIn, useSession} from 'next-auth/client'
import Layout from "../components/layout";
import {signUp} from "../lib/flip";


export default function Signup() {
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const [errorBold, setErrorBold] = useState('')
    const [errorType, setErrorType] = useState('')
    const [showError, setShowError] = useState('')

    const router = useRouter()
    const [session, loading] = useSession()

    useEffect(async () => {
        if (error) {
            if (error === "google") {
                setError("Sign up with Google failed. Try again later")
                setErrorType("warning")
                setShowError(true)
            }
        }
    })

    const handleSignup = async event => {
        event.preventDefault()
        const data = {email, password1, password2}
        if (password1 !== password2) {
            setShowError(true)
            setErrorType("warning")
            setError("Passwords do not match")
            setErrorBold('')
        } else if (password1.length < 8 || password2.length < 8) {
            setShowError(true)
            setErrorType("warning")
            setError("Password can't be less than 8 characters")
            setErrorBold('')
            window.scrollTo(0, 0)
        } else {
            const res = await signUp(data)
            if (res) {
                console.log(res)
                if (res.status === 201) {
                    setErrorType("success")
                    setShowError(true)
                    setError('Sign up successful.Confirm email by clicking on the link sent to')
                    setErrorBold(res.data.user.email)
                    setEmail('')
                    setPassword1('')
                    setPassword2('')
                    window.scrollTo(0, 0)
                } else if (res.status === 400) {
                    setShowError(true)
                    setErrorType("warning")
                    setError(Object.values(res.data)[0])
                    setErrorBold('')
                    window.scrollTo(0, 0)
                } else {
                    setShowError(true)
                    setErrorType("warning")
                    setError("Sign up failed. Try again later")
                    setErrorBold('')
                    window.scrollTo(0, 0)
                }
            } else {
                setShowError(true)
                setErrorType("warning")
                setError("Server is offline. Try again later")
                setErrorBold('')
                window.scrollTo(0, 0)
            }
        }
    }

    // When rendering client side don't display anything until loading is complete
    //if (typeof window !== 'undefined' && loading) return null

    // If no session exists, display access denied message
    //if (!session) { return  <Layout><AccessDenied/></Layout> }

    const alert = (
        <div className={`alert alert-${errorType} alert-dismissible fade show`} role="alert">
            <div className="col-auto mx-auto">{error} <strong>{errorBold}</strong></div>
        </div>
    );

    return (
        <Layout>
            <Head>
                <title>Sign up</title>
            </Head>
            <div className="row">
                <div className="col-sm-5 mx-auto">
                    <a href="#" onClick={() => signIn('google', {callbackUrl: '/'})}>
                        <div className="google-btn">
                            <div className="google-wrapper">
                                <Image
                                    src="/images/google.svg" // Route of the image file
                                    alt="Sign In with Google"
                                    className="google-icon"
                                    layout="fixed"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <p className='google-text'><b>Sign up with Google</b></p>
                        </div>
                    </a>
                    <div className="separator">OR</div>
                    <h5>Sign up with Email</h5>
                    {showError ? alert : null}
                    {/*<Alert message={error} messageBold={errorBold} errorType={errorType}
                               setShowError={setShowError}/>
                        : null} */}
                    <form onSubmit={handleSignup} method="post">
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
                                    name="password1"
                                    className="form-control"
                                    id="password1"
                                    placeholder="Password"
                                    value={password1}
                                    onChange={e => setPassword1(e.target.value)}
                                    autoComplete="true"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="password"
                                    name="password2"
                                    className="form-control"
                                    id="password2"
                                    placeholder="Confirm password"
                                    value={password2}
                                    onChange={e => setPassword2(e.target.value)}
                                    autoComplete="true"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Sign up</button>
                    </form>
                    <p>Already have an account? <Link href="/login"><a>Login</a></Link></p>
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


