import Head from 'next/head';
import Link from "next/link";
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {signIn, useSession} from 'next-auth/client';
import swal from '@sweetalert/with-react';
import Layout from "../components/layout";
import googleButton from '../styles/google.module.css';
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
        /*
        if (error) {
            if (error === "CredentialsSignin") {
                setErrorMessage("Incorrect Email or Password")
                setShowError(true)
            } else {
                setErrorMessage(error)
                setShowError(true)
            }
        }
        if (session) {
            await router.push({
                pathname: '/',
            })
        }
         */
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        const res = await signIn('credentials',
            {email, password, callbackUrl: `${process.env.NEXTAUTH_URL}/login`, redirect: false})
        if (res) {
            console.log(res)
            if (res.status === 401) {
                setErrorMessage("Incorrect email or password")
                setErrorType("warning")
                setShowError(true)
            } else if (res.status === 200) {
                setErrorMessage("Login successful")
                setErrorType("success")
                setShowError(true)
                setEmail('')
                setPassword('')
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
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className="row">
                <div className="col-sm-6">
                    <a href="#" onClick={() => signIn('google')}>
                        <div className={googleButton.btn}>
                            <div className={googleButton.wrapper}>
                                <img
                                    src="/images/google.svg"
                                    alt="Sign In with Google"
                                    className={googleButton.icon}
                                />
                            </div>
                            <p className={googleButton.text}><b>Log in with Google</b></p>
                        </div>
                    </a>
                    <div className="separator">OR</div>
                    {showError && errorMessage !== "" ? //<Alert2 />
                        <Alert message={errorMessage} errorType={errorType} setShowError={setShowError}/>
                        : null}
                    <h4>Log in with Email</h4>
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <br/>
                    <p>Don't have an account? <Link href="/signup"><a>Sign up.</a></Link></p>
                    <p><Link href="/forgot"><a>Forgot Password?</a></Link></p>
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

