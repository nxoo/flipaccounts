import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import {signIn, useSession} from 'next-auth/client'
import Layout from "../components/layout";
import {signUp} from "../lib/flip";
import googleButton from "../styles/google.module.css";


function Alert({message, messageBold, errorType, setShowError}) {
    return (
        <div className={`alert alert-${errorType} alert-dismissible fade show`} role="alert">
            {message}<strong>{messageBold}</strong>
            <button onClick={() => setShowError(false)} type="button" className="btn-close" data-bs-dismiss="alert"
                    aria-label="Close"/>
        </div>
    )
}


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
            } else {
                setError(error)
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
            setError("Password can't be less 8 characters")
            setErrorBold('')
        } else {
            const res = await signUp(data)
            if (res) {
                console.log(res)
                if (res.status === 201) {
                    setShowError(true)
                    setErrorType("success")
                    setError(`Sign up successful. Confirm your email address by clicking on the link sent to `)
                    setErrorBold(res.data.user.email)
                    setEmail('')
                    setPassword1('')
                    setPassword2('')
                } else if (res.status === 400) {
                    setShowError(true)
                    setErrorType("warning")
                    setError(Object.values(res.data)[0])
                    setErrorBold('')
                } else {
                    setShowError(true)
                    setErrorType("warning")
                    setError("Sign up failed. Try again later")
                    setErrorBold('')
                }
            } else {
                setShowError(true)
                setErrorType("warning")
                setError("Something went wrong. Try again later")
                setErrorBold('')
            }
        }
    }

    // When rendering client side don't display anything until loading is complete
    //if (typeof window !== 'undefined' && loading) return null

    // If no session exists, display access denied message
    //if (!session) { return  <Layout><AccessDenied/></Layout> }

    return (
        <Layout>
            <Head>
                <title>Sign up</title>
            </Head>
            <div className="row">
                <div className="col-sm-6">
                    <a href="#" onClick={() => signIn('google', {callbackUrl: '/'})}>
                        <div className={googleButton.btn}>
                            <div className={googleButton.wrapper}>
                                <Image
                                    src="/images/google.svg" // Route of the image file
                                    alt="Sign In with Google"
                                    className={googleButton.icon}
                                    layout="fill"
                                />
                            </div>
                            <p className={googleButton.text}><b>Sign up with Google</b></p>
                        </div>
                    </a>
                    <div className="separator">OR</div>
                    <h4>Sign up with Email</h4>
                    {showError ?
                        <Alert message={error} messageBold={errorBold} errorType={errorType}
                               setShowError={setShowError}/>
                        : null}
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
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </form>
                    <br/>
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
            `}</style>
        </Layout>
    )
}


